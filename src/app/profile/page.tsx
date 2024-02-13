"use client";

import { useState } from "react";
import Button from "../../../components/schemas/Button";
import Input from "../../../components/schemas/Input";
import { PROFILE_FORM } from "../../data";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../../../components/InputErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import { profileSchema } from "../../validation";
import axiosInstance from "../../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interface";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "../../../provider/store";
import { setProfileURL } from "../../../provider/profileURL";

interface IFormInput {
  profileURL: string;
}

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // ** Cookies
  const cookie = new Cookies();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(profileSchema),
  });

  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    setIsLoading(true);
    try {
      const { status, data: resData } = await axiosInstance.post(
        "/linkedin/scrape",
        data
      );
      console.log(resData);
      dispatch(setProfileURL(resData));
      cookie.set("userLoggedProfile", resData);
      if (status === 200 || 201) {
        toast.success("Active is done, you will navigate after 3 seconds!", {
          position: "bottom-center",
          duration: 4000,
        });
        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>;
      const message =
        errorObj.response?.data.error.details?.message ||
        errorObj.response?.data.message;
      toast.error(`Active failed: ${message}`);
      toast.error(`${message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ** Renders
  const renderProfileForm = PROFILE_FORM.map(
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
      <h2 className="text-[#3E1F7A] text-2xl pb-6">
        Hello Eslam Wael, You don&#39;t <strong>active your account!</strong>
      </h2>
      <form
        className="w-[800px] space-y-3 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderProfileForm}
        <Button fullWidth isLoading={isLoading}>
          Submit
        </Button>
        <div className="flex flex-col space-y-2">
          <Link href={"https://linkedin.com/signup"} className="text-[#442288]">
            Don&#39;t owner linkedin account?
            <span className="underline ml-1">Create a new account!</span>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
