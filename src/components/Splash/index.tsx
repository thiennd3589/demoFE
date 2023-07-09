import logo from "assets/logo.svg";
export default function Splash() {
  return (
    <div className="w-screen h-screen flex justify-center items-center animate-ping">
      <img src={logo} alt="logo" className="" />
    </div>
  );
}
