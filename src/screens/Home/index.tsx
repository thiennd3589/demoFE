import { Link } from "react-router-dom";
import { BiVideoRecording } from "react-icons/bi";
import DefaultHome from "./DefaultHome";
import HomeImage from "./HomeImage";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Home() {
  const [state, setState] = useState<number>(0);

  const changeState = (state: number) => {
    setState(state);
  };

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <header
          className="flex gap-5 p-5 items-center cursor-pointer"
          onClick={() => {
            changeState(0);
          }}
        >
          <div className="p-3 bg-blue-500 rounded-full flex justify-center items-center">
            <BiVideoRecording size={30} className={"text-white"} />
          </div>
          <span className="text-2xl font-bold">FindMeet</span>
        </header>
        {state === 0 && <DefaultHome changeToLogin={changeState} />}
        {state === 1 && <LoginForm changeToRegister={changeState} />}
        {state === 2 && <RegisterForm changeToLogin={changeState} />}
      </div>
      <HomeImage />
    </div>
  );
}
