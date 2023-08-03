import { DailyEventObjectAppMessage } from "@daily-co/daily-js";
import { useAppMessage } from "@daily-co/daily-react";
import { Input } from "antd";
import classNames from "classnames";
import { SocketContext } from "context/SocketProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "redux/store";
import { BASE_URL, REQUEST_METHOD, query } from "utils/httpClients";

enum MESSAGE_TYPE {
  FILE = "FILE",
  MESSAGE = "MESSAGE",
}

const MessageItem = (props: any) => {
  return (
    <div
      className={classNames("flex flex-col mb-3", {
        "items-end": props.data.isLocal,
        "w-fit": !props.data.isLocal,
      })}
    >
      {
        <span className="text-xs text-gray-500">
          {props.data.isLocal
            ? "Bạn"
            : `${props.data.userInfo?.lastName} ${props.data.userInfo?.firstName}`}
        </span>
      }
      <span
        className={classNames("py-2 px-5 mt-1 rounded-3xl bg-gray-100", {
          "!bg-blue-500 text-white": props.data.isLocal,
          underline: props.data.isFile,
        })}
      >
        {props.data.isFile ? (
          <a href={props.data.msg} download target="_blank">
            {props.data.msg}
          </a>
        ) : (
          props.data.msg
        )}
      </span>
    </div>
  );
};

const MessageInput = (props: {
  sendAppMessage: (
    type: MESSAGE_TYPE,
    data?: string,
    formData?: FormData
  ) => void;
}) => {
  const [type, setType] = useState<"text" | "file">("text");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<FileList | null>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "text") setMessage(event.target.value);
    else {
      setType("text");
      setMessage(event.target.files ? event.target.files[0].name : "");
      setFile(event.target.files);
    }
  };

  const onSendMessage = () => {
    if (!!!file) {
      if (message.trim()) {
        props.sendAppMessage(MESSAGE_TYPE.MESSAGE, message);
        setMessage("");
      }
      return;
    } else {
      if (file) {
        const formData = new FormData();
        formData.append("file", file[0]);
        setMessage("");
        props.sendAppMessage(MESSAGE_TYPE.FILE, undefined, formData);
      }
    }
  };

  return (
    <div>
      <Input
        prefix={
          <IoMdAttach
            onClick={() => {
              setType((prev) => (prev === "text" ? "file" : "text"));
            }}
          />
        }
        type={type}
        placeholder="Gửi tin nhắn"
        suffix={<AiOutlineSend />}
        onChange={onChange}
        onPressEnter={onSendMessage}
        value={message}
      />
    </div>
  );
};

export const Messages = () => {
  const { meetId } = useParams();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [messages, setMessages] = useState<any[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket &&
      userInfo &&
      socket.on("file", (data) => {
        const { url, user, user_id } = data;
        setMessages((prev) => [
          ...prev,
          {
            data: {
              msg: `${BASE_URL}/static/${url}`,
              isLocal: user_id == userInfo!.id,
              userInfo: user,
              isFile: true,
            },
          },
        ]);
      });
  }, [userInfo, socket]);

  const { mutate: sendMessage } = useMutation(
    "send-message",
    ({
      content,
      user_id,
      meet_id,
    }: {
      content: string;
      user_id: number;
      meet_id: number;
    }) =>
      query({
        url: "/message",
        method: REQUEST_METHOD.POST,
        data: { content, user_id, meet_id },
        tokenRequired: true,
      })
  );

  const { mutate: sendFile } = useMutation(
    "send-file",
    ({ formData }: { formData: FormData }) =>
      query({
        url: "/file",
        method: REQUEST_METHOD.POST,
        data: formData,
        tokenRequired: true,
        contentType: "multipart/form-data",
      })
  );

  const sendAppMessage = useAppMessage({
    onAppMessage: useCallback((ev: DailyEventObjectAppMessage) => {
      setMessages((m) => [...m, ev]);
    }, []),
  });

  const onSend = (type: MESSAGE_TYPE, data?: string, formData?: FormData) => {
    if (type === MESSAGE_TYPE.MESSAGE && data) {
      sendMessage({
        content: data,
        user_id: userInfo!.id,
        meet_id: parseInt(meetId!),
      });
      sendAppMessage({ msg: data, userInfo }, "*");
      setMessages((prev) => [
        ...prev,
        { data: { msg: data, isLocal: true, userInfo } },
      ]);
    } else if (formData) {
      formData.append("user_id", userInfo!.id.toString());
      formData.append("meet_id", meetId!);
      sendFile({ formData });
    }
  };

  return (
    <div className="flex flex-col max-h-screen mt-10">
      <div className="flex items-center justify-between">
        <span className="text-2xl relative font-bold">Tin nhắn</span>
        <span className="text-gray-500 hover:text-gray-600 cursor-pointer">
          Tất cả
        </span>
      </div>
      <div
        className="flex flex-col overflow-auto mt-5"
        style={{ height: "50vh" }}
      >
        {messages.map((msg, index) => (
          <MessageItem {...msg} key={index} />
        ))}
      </div>
      <MessageInput sendAppMessage={onSend} />
    </div>
  );
};
