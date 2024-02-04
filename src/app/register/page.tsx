"use client";

import InputErrorMessage from "../../../components/InputErrorMessage";
import Button from "../../../components/schemas/Button";
import Input from "../../../components/schemas/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interface";
import { useRouter } from "next/navigation";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  // Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/signup", data);
      console.log(data);
      if (status === 200) {
        toast.success("Register is done, you will navigate after 2 seconds!", {
          position: "bottom-center",
          duration: 4000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>;
      const message = errorObj.response?.data.error.message;
      toast.error(`${message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Renders
  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto pt-11">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register with new account!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
