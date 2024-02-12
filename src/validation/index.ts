import { ICategory } from "@/interface";
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
      .min(6, "Password should be at least 6 characters!"),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^[^@]+@[^@]+\.[^@ .]{2,}$/, "Email address is not Valid!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 6 characters!"),
  })
  .required();

export const todoSchema = yup
  .object({
    title: yup.string().required("Title is required!"),
    description: yup.string().required("Description is required!"),
  })
  .required();

export const todoValidation = (todo: {
  title: string;
  description: string;
  category: string;
}) => {
  const errorsObj: {
    title: string;
    description: string;
  } = {
    title: "",
    description: "",
  };

  /* -------- Validation [ Title, Description, Category ] -------- */
  if (!todo.title.trim() || todo.title.length < 4 || todo.title.length > 50) {
    errorsObj.title = "Todo title must be between 4 and 50 characters!";
  }

  if (
    !todo.description.trim() ||
    todo.description.length < 10 ||
    todo.description.length > 900
  ) {
    errorsObj.description =
      "Todo description must be between 10 and 900 characters!";
  }

  return errorsObj;
};
