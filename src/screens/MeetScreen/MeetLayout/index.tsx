import classNames from "classnames";
import { BiLayout } from "react-icons/bi";
import { LuLayoutGrid } from "react-icons/lu";
import { RiLayoutBottomFill } from "react-icons/ri";
import { FaDrawPolygon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLayout } from "redux/layoutSlice/slice";
import { RootState } from "redux/store";
import { setVisible } from "redux/board/slice";

export default function MeetLayout() {
  const { fullscreen, grid, nothing } = useSelector(
    (state: RootState) => state.layout
  );
  const visible = useSelector((state: RootState) => state.board.visible);
  const dispatch = useDispatch();

  const changeLayout = (layout: "nothing" | "grid" | "fullscreen") => {
    dispatch(setLayout(layout));
  };

  const openBoard = () => {
    dispatch(setVisible(!visible));
  };

  return (
    <div className="flex items-center gap-5">
      <div className="flex bg-white h-10 rounded-full items-center">
        <div
          className={classNames(
            "px-2 h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ease-linear",
            {
              "bg-blue-500 text-white": nothing,
            }
          )}
          onClick={() => changeLayout("nothing")}
        >
          <BiLayout size={15} />
        </div>
        <div
          className={classNames(
            "px-2 h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ease-linear",
            {
              "bg-blue-500 text-white": fullscreen,
            }
          )}
          onClick={() => changeLayout("fullscreen")}
        >
          <RiLayoutBottomFill size={15} />
        </div>
        <div
          className={classNames(
            "px-2 h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ease-linear",
            {
              "bg-blue-500 text-white": grid,
            }
          )}
          onClick={() => changeLayout("grid")}
        >
          <LuLayoutGrid size={15} />
        </div>
      </div>
      <FaDrawPolygon
        size={30}
        className={"cursor-pointer"}
        onClick={openBoard}
      />
    </div>
  );
}
