import axios from "axios";
import ErrorMessage from "components/ErrorMessage";
import TextInputField from "components/TextInputField";
import { Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLock, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { FiUserCheck } from "react-icons/fi";
import { FaUserTag } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "utils/httpClients";
import * as Yup from "yup";

interface RegisterFormProps {
  changeToLogin: (state: number) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const [opacity, setOpacity] = useState(0);

  const validateSchema = useMemo(() => {
    return Yup.object().shape({
      firstName: Yup.string().required("Họ không được để trống"),
      lastName: Yup.string().required("Tên không được để trống"),
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

  const onSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.post(`${BASE_URL}/register`, values);
      toast.success("Đăng ký thành công!");
      props.changeToLogin(1);
    } catch (error) {
      toast.error("Email đã tồn tại!");
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
        <h1 className="text-3xl font-bold">ĐĂNG KÝ </h1>
        <p>
          Bạn đã có tài khoản?{" "}
          <span
            className="font-bold underline text-blue-500 cursor-pointer"
            onClick={() => {
              props.changeToLogin(1);
            }}
          >
            Đăng nhập
          </span>
        </p>
        <div className="mt-5">
          <Formik
            validationSchema={validateSchema}
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
            }}
            onSubmit={onSubmit}
          >
            {({ touched, errors }) => {
              return (
                <Form className="flex flex-col">
                  <Field
                    name="lastName"
                    component={TextInputField}
                    prefix={
                      <FiUserCheck size={20} className={"text-gray-500"} />
                    }
                    placeholder="Nguyễn"
                    label={"Họ của bạn"}
                  />
                  {touched.email && errors.email && (
                    <ErrorMessage name="email" />
                  )}
                  <Field
                    name="firstName"
                    component={TextInputField}
                    prefix={<FaUserTag size={20} className={"text-gray-500"} />}
                    placeholder="Văn A"
                    label={"Tên của bạn"}
                  />
                  {touched.email && errors.email && (
                    <ErrorMessage name="email" />
                  )}
                  <Field
                    name="email"
                    component={TextInputField}
                    prefix={
                      <AiOutlineMail size={20} className={"text-gray-500"} />
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
                    Đăng ký
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
