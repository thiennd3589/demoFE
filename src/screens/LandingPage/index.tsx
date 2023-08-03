import {
  Button,
  Calendar,
  Carousel,
  Dropdown,
  Input,
  MenuProps,
  Modal,
} from "antd";
import { AuthContext } from "context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BiVideoRecording } from "react-icons/bi";
import { FaKeyboard } from "react-icons/fa";
import image1 from "assets/image1.jpg";
import image2 from "assets/image2.jpg";
import image3 from "assets/image3.jpg";
import { useMutation } from "react-query";
import { REQUEST_METHOD, query } from "utils/httpClients";
import { MeetModel } from "interface/Meet";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const CAROUSEL_ITEM: { title: string; subtitle: string; image: string }[] = [
  {
    title: "Khám phá các tính năng của FindMeet",
    subtitle:
      "Gọi video nhóm, thao tác với bảng trắng, nhắn tin và chia sẻ tập tin",
    image: image1,
  },
  {
    title: "Nhận đường liên kết có thể chia sẻ",
    subtitle:
      "Nhấp vào cuộc họp mới để nhận đường liên kết mà bạn có thể gửi cho những người mình muốn họp dùng",
    image: image2,
  },
  {
    title: "Lên kế hoạch trước",
    subtitle:
      "Nhấp vào cuộc họp mới để lên lịch cuộc họp và gửi lời mời cho người tham gia",
    image: image3,
  },
];

const CarouselItem = (props: {
  title: string;
  subtitle: string;
  image: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-96 rounded-full h-96 overflow-hidden">
        <img src={props.image} alt={props.title} className="h-full" />
      </div>

      <h2 className="text-2xl mt-5">{props.title}</h2>
      <span className="w-96 text-center">{props.subtitle}</span>
    </div>
  );
};

export default function LandingPage() {
  const [openSuccess, setOpenSucess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const navigate = useNavigate();
  const { setLogin } = useContext(AuthContext);
  const { data: createdMeet, mutate } = useMutation(
    ["create-meet"],
    async (startTime?: Date) =>
      query<any, MeetModel>({
        url: "/meet",
        tokenRequired: true,
        method: REQUEST_METHOD.POST,
        data: { startTime },
      })
  );

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            localStorage.clear();
            setLogin && setLogin(false);
          }}
        >
          Đăng xuất
        </div>
      ),
    },
  ];

  const createMeetItem: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            mutate(undefined);
          }}
        >
          Tạo cuộc họp mới tức thì
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            // localStorage.clear();
            setOpenModal(true);
          }}
        >
          Lên lịch cuộc họp
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (createdMeet) {
      setOpenModal(false);
      setOpenSucess(true);
      const { id, startTime } = createdMeet.data;
      if (new Date(startTime) < new Date()) navigate(`/meet/${id}`);
    }
  }, [createdMeet]);

  const onSelectDate = (date: dayjs.Dayjs) => {
    setStartTime(date);
  };

  const onScheduled = () => {
    mutate(startTime.toDate());
  };

  return (
    <>
      <div>
        <header className="flex p-5 justify-between items-center">
          <div className="flex gap-5 items-center cursor-pointer">
            <div className="p-3 bg-blue-500 rounded-full flex justify-center items-center">
              <BiVideoRecording size={30} className={"text-white"} />
            </div>
            <span className="text-2xl font-bold">FindMeet</span>
          </div>
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className="p-3 bg-gray-300 rounded-full cursor-pointer">
              <AiOutlineUser size={25} />
            </div>
          </Dropdown>
        </header>
        <div className="flex py-28 px-44 items-center">
          <div className="flex flex-col flex-1 gap-10">
            <h1 className="text-4xl ">
              Cuộc họp video chất lượng. <br /> Giờ đây miễn phí cho tất cả{" "}
              <br /> mọi người.
            </h1>
            <p className="w-96">
              Chúng tôi đã thiết kế lại FindMeet — dịch vụ tổ chức cuộc họp kinh
              doanh với độ bảo mật cao — để cung cấp miễn phí cho mọi người.
            </p>
            <div className="flex gap-3">
              <Dropdown menu={{ items: createMeetItem }}>
                <button className="flex items-center gap-2 py-3 px-5 bg-blue-500 text-white rounded-xl">
                  <AiOutlineVideoCameraAdd size={20} />
                  <span>Cuộc họp mới</span>
                </button>
              </Dropdown>
              <Input
                className="w-72"
                prefix={<FaKeyboard size={20} className={"mr-5"} />}
                placeholder="Nhập mã hoặc đường link"
              />
            </div>
          </div>
          <div className="flex-1 w-1/2">
            <Carousel autoplay>
              {CAROUSEL_ITEM.map((item) => (
                <CarouselItem {...item} key={item.title} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <Modal
        title="Chọn ngày bắt đầu"
        footer={null}
        open={openModal}
        width={"80vw"}
        onCancel={() => {
          setOpenModal(false);
        }}
      >
        <div className="flex flex-col">
          <Calendar onSelect={onSelectDate} />
          <Button type="dashed" className="self-end" onClick={onScheduled}>
            Lên lịch
          </Button>
        </div>
      </Modal>
      {createdMeet && (
        <Modal
          title="Thành công"
          footer={null}
          open={openSuccess}
          onCancel={() => {
            setOpenSucess(false);
          }}
        >
          <div className="flex flex-col">
            <h1 className="text-xl mb-5">
              Cuộc họp của bạn sẽ bắt đầu vào ngày{" "}
              {dayjs(createdMeet!.data.startTime).format("DD/MM/YYYY")}
            </h1>
            <p>
              Truy cập đường dẫn: http://localhost/meet/{createdMeet?.data.id}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
