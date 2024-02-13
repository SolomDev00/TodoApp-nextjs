import { v4 as uuid } from "uuid";
import {
  ICategory,
  IFormInputs,
  ILoginInput,
  IProfileInput,
  IRegisterInput,
} from "../interface/index";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "name",
    placeholder: "Your Name",
    type: "text",
    forl: "name",
    placel: "Your Name",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    placeholder: "Your Email",
    type: "email",
    forl: "email",
    placel: "Your Email",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Your Password",
    type: "password",
    forl: "password",
    placel: "Your Password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "email",
    placeholder: "Your Email ...",
    type: "email",
    forl: "email",
    placel: "Your Email ...",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Password ..",
    type: "password",
    forl: "password",
    placel: "Your Password ...",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const formInputList: IFormInputs[] = [
  {
    id: "title",
    type: "text",
    name: "title",
    label: "Todo Title",
  },
  {
    id: "description",
    type: "text",
    name: "description",
    label: "Todo Description",
  },
];

export const PROFILE_FORM: IProfileInput[] = [
  {
    name: "profileURL",
    placeholder: "Your Profile URL ...",
    type: "text",
    forl: "profile",
    placel: "Your Profile URL ...",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const categories: ICategory[] = [
  {
    id: uuid(),
    name: "School",
  },
  {
    id: uuid(),
    name: "Study",
  },
  {
    id: uuid(),
    name: "Volley",
  },
  {
    id: uuid(),
    name: "Developing",
  },
];
