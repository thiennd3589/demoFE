import { useEffect, useState } from "react";
import home from "assets/home.jpg";

export default function HomeImage() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);
  return (
    <div className=" bg-gradient-to-br from-blue-500 to-purple-500 h-screen flex-1 flex items-center justify-end">
      <img
        src={home}
        alt="home"
        className="h-2/3 rounded-tl-xl rounded-bl-xl overflow-hidden transition-all duration-1000 ease-linear"
        style={{
          opacity,
        }}
      />
    </div>
  );
}
