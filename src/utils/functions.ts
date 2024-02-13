import axiosInstance from "@/config/axios.config";
import { categories } from "@/data";
import { faker } from "@faker-js/faker";
import Cookies from "universal-cookie";

export const onGenerateTodos = async () => {
  // ** Cookies
  const cookie = new Cookies();
  const user = cookie.get("userLogged");

  console.log(user._id);

  for (let i = 0; i < 10; i++) {
    try {
      const response = await axiosInstance.post("/todos", {
        // user: `65c1d9e7f62b801c624c80f4`,
        title: faker.word.words(5),
        description: faker.lorem.paragraph(2),
        category: categories[1].name,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  }
};
