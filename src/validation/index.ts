import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .required("Username is required!")
      .min(5, "Username should be at least 5 characters!"),
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^[^@]+@[^@]+\.[^@ .]{2,}$/, "Email address is not Valid!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 5 characters!"),
  })
  .required();

export const loginSchema = yup
  .object({
    name: yup
      .string()
      .required("Email is required!")
      .matches(/^[^@]+@[^@]+\.[^@ .]{2,}$/, "Email address is not Valid!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 5 characters!"),
  })
  .required();

export const todoSchema = yup
  .object({
    title: yup.string().required("Title is required!"),
    description: yup.string().required("Description is required!"),
  })
  .required();
