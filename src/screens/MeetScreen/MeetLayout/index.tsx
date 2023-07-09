import classNames from "classnames";
import { useState } from "react";
import { BiLayout } from "react-icons/bi";
import { LuLayoutGrid } from "react-icons/lu";
import { RiLayoutBottomFill } from "react-icons/ri";

export default function MeetLayout() {
  const [layout, setLayout] = useState(0);
  return (
    <div className="flex bg-white h-10 rounded-full items-center">
      <div
        className={classNames(
          "px-2  h-10 w-10 flex items-center justify-center rounded-full",
          {
            "bg-blue-500 text-white": layout === 0,
          }
        )}
        onClick={() => setLayout(0)}
      >
        <RiLayoutBottomFill size={15} />
      </div>
      <div
        className={classNames(
          "px-2  h-10 w-10 flex items-center justify-center rounded-full",
          {
            "bg-blue-500 text-white": layout === 1,
          }
        )}
        onClick={() => setLayout(1)}
      >
        <LuLayoutGrid size={15} />
      </div>
      <div
        className={classNames(
          "px-2  h-10 w-10 flex items-center justify-center rounded-full",
          {
            "bg-blue-500 text-white": layout === 2,
          }
        )}
        onClick={() => setLayout(2)}
      >
        <BiLayout size={15} />
      </div>
    </div>
  );
}
