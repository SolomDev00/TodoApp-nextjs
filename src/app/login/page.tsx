"use client";

import { useState } from "react";
import Button from "../../../components/schemas/Button";
import Input from "../../../components/schemas/Input";
import { LOGIN_FORM } from "../../data";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../../../components/InputErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../../validation";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interface";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useAppDispatch } from "../../redux/store";
// import { setToken } from "../../redux/token/token";

interface IFormInput {
  name: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // ** Cookies
  const cookie = new Cookies();
  // const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    setIsLoading(true);
    try {
      const { status, data: resData } = await axiosInstance.post(
        "/auth/login",
        data
      );
      console.log(resData);
      if (status === 200) {
        toast.success("Login is done, you will navigate after 2 seconds!", {
          position: "bottom-center",
          duration: 4000,
        });
        // dispatch(setToken(resData));
        // cookie.set("userLogged", resData);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const message = errorObj.response?.data.error.message;
      toast.error(`${message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ** Renders
  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, forl, placel, validation }, idx) => (
      <div key={idx}>
        <div className="space-y-2 pb-1">
          <label htmlFor={forl} className="text-[#3E1F7A] text-xl">
            {placel}
          </label>
          <Input
            id={forl}
            type={type}
            placeholder={placeholder}
            {...register(name, validation)}
          />
        </div>
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );

  return (
    <section className="w-[800px] mt-16 mx-auto">
      <h2 className="text-[#3E1F7A] text-2xl pb-6">Login To TodoApp</h2>
      <form
        className="w-[800px] space-y-3 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderLoginForm}
        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
        <div className="flex flex-col space-y-2">
          <Link href={"/register"} className="text-[#442288]">
            Don&#39;t owner account?
            <span className="underline">Register here!</span>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
