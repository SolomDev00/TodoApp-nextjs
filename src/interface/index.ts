import { ITodoNameSchema } from "@/types";

export interface IRegisterInput {
  name: "name" | "email" | "password";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface ILoginInput {
  name: "email" | "password";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface IProfileInput {
  name: "profileURL";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface IErrorResponse {
  message?: string[];
  error: {
    message?: string;
    details?: {
      message?: string;
      errors: {}[];
    };
  };
}

export interface ITodo {
  _id?: string | undefined;
  title: string;
  description: string;
  createdAt?: string;
  category: "Volley" | "School" | "Study" | "Developing";
  user?: string;
}

export interface ITodoAdd {
  id?: string | undefined;
  title: string;
  description: string;
  createdAt?: string;
  category: "Volley" | "School" | "Study" | "Developing";
  user?: string;
}

export interface IToken {
  jwt: string;
  user: {
    username: string;
  };
}

export interface IProfileURL {
  name: string;
  imageURL: string;
}

export interface ICategory {
  id?: string | undefined;
  name: string;
}

export interface IFormInputs {
  id: string;
  type: string;
  name: ITodoNameSchema;
  label: string;
}
