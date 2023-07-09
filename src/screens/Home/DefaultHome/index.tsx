import { AuthContext } from "context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DefaultHomeProps {
  changeToLogin: (state: number) => void;
}

export default function DefaultHome(props: DefaultHomeProps) {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);
  const { isLogin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  return (
    <div
      className="flex justify-center items-center mt-0 transition-all duration-1000 ease-linear"
      style={{
        opacity,
      }}
    >
      <div className="flex flex-col m-20">
        <p className="text-blue-500 font-semibold text-lg">
          KẾT NỐI DỄ DÀNG HƠN
        </p>
        <h1 className="text-[40px] mt-5 font-bold leading-relaxed">
          LÀM VIỆC <br />
          TRỰC TUYẾN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a986f4] to-[#d93181]">
            CÙNG NHÓM CỦA BẠN
          </span>
        </h1>
        <p className=" w-[500px]">
          Cung cấp nền tảng cuộc họp trực tuyến, dễ dàng hơn cho chuyển đổi số
          doanh nghiệp. Xây dựng trên nền tảng tin cậy đã được xác minh.
        </p>
        <button
          className="bg-blue-500 text-white w-52 p-2 mt-5 rounded-3xl"
          onClick={() => {
            if (isLogin) {
              navigate("/landing");
              return;
            }
            props.changeToLogin(1);
          }}
        >
          Bắt đầu miễn phí
        </button>
      </div>
    </div>
  );
}
