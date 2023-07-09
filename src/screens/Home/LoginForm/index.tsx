import axios from "axios";
import ErrorMessage from "components/ErrorMessage";
import TextInputField from "components/TextInputField";
import { AuthContext } from "context/AuthProvider";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useMemo, useState } from "react";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "utils/httpClients";
import * as Yup from "yup";

interface LoginFormProps {
  changeToRegister: (state: number) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const { setLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);

  const validateSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
      password: Yup.string().required("Mật khẩu không được để trống"),
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const token = await axios.post(`${BASE_URL}/login`, { email, password });
      localStorage.setItem("token", token.data.data.token);
      setLogin && setLogin(true);
      navigate("/landing");
    } catch (error) {
      console.log(error);
      toast.error("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div
      className="flex justify-center items-center mt-0 transition-all duration-1000 ease-linear shrink-0 w-full"
      style={{
        opacity,
      }}
    >
      <div className="flex flex-col w-full mx-52 m-20">
        <h1 className="text-3xl font-bold">ĐĂNG NHẬP</h1>
        <p>
          Bạn chưa có tài khoản?{" "}
          <span
            className="font-bold underline text-blue-500 cursor-pointer"
            onClick={() => {
              props.changeToRegister(2);
            }}
          >
            Đăng ký
          </span>
        </p>
        <div className="mt-5">
          <Formik
            validationSchema={validateSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
          >
            {({ touched, errors }) => {
              return (
                <Form className="flex flex-col">
                  <Field
                    name="email"
                    component={TextInputField}
                    prefix={
                      <AiOutlineUser size={20} className={"text-gray-500"} />
                    }
                    placeholder="Email"
                    label={"Email của bạn"}
                  />
                  {touched.email && errors.email && (
                    <ErrorMessage name="email" />
                  )}
                  <Field
                    name="password"
                    component={TextInputField}
                    prefix={
                      <AiOutlineLock size={20} className={"text-gray-500"} />
                    }
                    placeholder="Mật khẩu"
                    label={"Mật khẩu"}
                    type="password"
                  />
                  {errors.password && errors.password && (
                    <ErrorMessage name="password" />
                  )}
                  <button className="mt-5 text-white bg-blue-500 py-3 px-8 rounded-3xl ">
                    Đăng nhập
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
