import { useRef, useEffect, useContext } from "react";
import { SocketContext } from "context/SocketProvider";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { setVisible } from "redux/board/slice";
import { useParams } from "react-router-dom";

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const Board = () => {
  const { meetId } = useParams();
  const visible = useSelector((state: RootState) => state.board.visible);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorsRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas!.getContext("2d");

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");
    console.log(colors, "the colors");
    console.log(test);
    // set the current color
    const current: { [key: string]: any } = {
      color: "black",
    };

    // helper that will update the current color
    const onColorUpdate = (e: any) => {
      current.color = e.target.className.split(" ")[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      color: string
    ) => {
      context!.beginPath();
      context!.moveTo(x0, y0);
      context!.lineTo(x1, y1);
      context!.strokeStyle = color;
      context!.lineWidth = 2;
      context!.stroke();
      context!.closePath();

      const w = canvas!.width;
      const h = canvas!.height;

      socket?.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        meet_id: parseInt(meetId!),
      });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e: any) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e: any) => {
      if (!drawing) {
        return;
      }
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color
      );
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e: any) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color
      );
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback: any, delay: number) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas!.addEventListener("mousedown", onMouseDown, false);
    canvas!.addEventListener("mouseup", onMouseUp, false);
    canvas!.addEventListener("mouseout", onMouseUp, false);
    canvas!.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas!.addEventListener("touchstart", onMouseDown, false);
    canvas!.addEventListener("touchend", onMouseUp, false);
    canvas!.addEventListener("touchcancel", onMouseUp, false);
    canvas!.addEventListener("touchmove", throttle(onMouseMove, 10), false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data: any) => {
      const w = canvas!.width;
      const h = canvas!.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    // socketRef!.current = io.connect("/");
    // socketRef.current.on("drawing", onDrawingEvent);
    socket && socket.on("drawing", onDrawingEvent);
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div
      className={classNames(
        "-z-10 absolute opacity-0 bg-white p-2 shadow-xl rounded-xl",
        {
          "!z-10 !opacity-100": visible,
        }
      )}
      style={{
        width: "80vw",
        height: "80vh",
        border: "1px solid black",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <canvas ref={canvasRef} className="whiteboard" />

      <div ref={colorsRef} className="colors">
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color yellow" />
      </div>

      <div
        className="absolute right-5 top-0 cursor-pointer"
        onClick={() => {
          dispatch(setVisible(false));
        }}
      >
        close
      </div>
    </div>
  );
};

export default Board;
