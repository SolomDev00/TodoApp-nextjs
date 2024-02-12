"use client";
import axiosInstance from "@/config/axios.config";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../provider/token";
import { ICategory, IFormInputs, ITodo, ITodoAdd } from "@/interface";
import Button from "../../components/schemas/Button";
import {
  BiBookContent,
  BiCategory,
  BiClipboard,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import Modal from "../../components/schemas/Modal";
import InputErrorMessage from "../../components/InputErrorMessage";
import { categories, formInputList } from "@/data";
import Input from "../../components/schemas/Input";
import Select from "../../components/schemas/Select";
import { todoValidation } from "@/validation";
import toast from "react-hot-toast";
import { ITodoNameSchema } from "@/types";

export default function Home() {
  const defaultTodoObj: ITodo = {
    _id: "",
    title: "",
    description: "",
    category: "Volley",
  };

  const defaultTodoAddObj: ITodoAdd = {
    id: "",
    title: "",
    description: "",
    category: "Volley",
  };

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todoToEditIdx, setTodoToEditIdx] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [todo, setTodo] = useState<ITodo>(defaultTodoObj);
  const [todoAdd, setTodoAdd] = useState<ITodoAdd>(defaultTodoAddObj);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[1]
  );
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>(defaultTodoObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const { token } = useSelector(tokenSelector);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axiosInstance.get("/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTodos();
  }, [token]);

  console.log(todos);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openEditModal = useCallback(
    (_id: string) => {
      const todoToEdit = todos.find((todo) => todo._id === _id);
      if (todoToEdit) {
        setTodoToEdit(todoToEdit);
        setSelectedCategory(categories[2]);
        setIsOpenEdit(true);
      }
    },
    [todos]
  );

  const closeEditModal = () => setIsOpenEdit(false);

  const openConfirmModal = useCallback(
    (_id: string) => {
      const todoToDelete = todos.find((todo) => todo._id === _id);
      if (todoToDelete) {
        setTodoToEdit(todoToDelete);
        setIsOpenConfirmModal(true);
      }
    },
    [todos]
  );
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTodoToEdit((prevTodoToEdit) => ({
      ...prevTodoToEdit,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const onEditCancel = () => {
    setTodo(defaultTodoObj);
    closeEditModal();
  };

  const onCancel = () => {
    setTodo(defaultTodoObj);
    closeModal();
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTodoAdd((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const sumbitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description } = todoAdd;
    const errors = todoValidation({
      title,
      description,
      category: selectedCategory.name,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value !== "") ||
      Object.values(errors).every((value) => value !== "");

    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }

    if (!selectedCategory.name) {
      console.error("Invalid category", selectedCategory);
      return;
    }

    axiosInstance
      .post(
        "/todos",
        { ...todoAdd, category: selectedCategory.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTodoAdd(defaultTodoAddObj);
        closeModal();
        toast.success("Todo is added to List!", {
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sumbitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, category } = todoToEdit;

    const errors = todoValidation({
      title,
      description,
      category,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    axiosInstance
      .put(
        `/todos/${todoToEdit._id}`,
        { title, description, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedProducts = [...todos];
        updatedProducts[todoToEditIdx] = response.data;
        setTodos(updatedProducts);

        setTodoToEdit(defaultTodoObj);
        closeEditModal();
        toast.success("Product has been Edit!", {
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeTodoHandler = () => {
    const { _id } = todoToEdit;
    axiosInstance
      .delete(`/todos/${todoToEdit._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((todoItem) => todoItem._id !== _id)
        );

        closeConfirmModal();
        toast.success("Todo has been deleted!", {
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const displayTodos = todos.map(
    ({ _id, title, description, category, createdAt }: ITodo) => {
      if (createdAt) {
        const formattedDate = new Date(createdAt).toISOString().slice(0, 10);
        return (
          <div
            key={_id}
            className="bg-indigo-700 w-full p-4 rounded-md flex flex-row justify-between mb-3"
          >
            <div>
              <h3 className="layer gap-3">
                <BiBookContent size={"22px"} />
                {title}
              </h3>
              <h3 className="layer gap-3">
                <BiCategory size={"22px"} />
                {category}
              </h3>
              <p className="layer gap-3">
                <BiClipboard size={"22px"} />
                {description}
              </p>
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="flex flex-row space-x-3">
                <BiEdit
                  size={"22px"}
                  className="text-white cursor-pointer"
                  onClick={() => openEditModal(_id!)}
                />
                <BiTrash
                  size={"22px"}
                  className="text-red-600 cursor-pointer"
                  onClick={() => openConfirmModal(_id!)}
                />
              </div>
              <p className="layer gap-3 text-sm">{formattedDate}</p>
            </div>
          </div>
        );
      }
    }
  );

  const renderFormInputList = formInputList.map(
    ({ id, name, label, type }: IFormInputs) => (
      <div className="flex flex-col" key={id}>
        <label
          htmlFor={id}
          className="mb-[1px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type={type}
          id={id}
          name={name}
          value={todoAdd[name]}
          onChange={onChangeHandler}
        />
        <InputErrorMessage msg={errors[name]} />
      </div>
    )
  );

  const renderTodoToEditWithErrorMsg = (
    id: string,
    label: string,
    name: ITodoNameSchema
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[1px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={todoToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <InputErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center py-1 px-24">
        <div className="w-full flex flex-row justify-between items-center pb-10">
          <h3 className="text-lg font-semibold">Your Todos:</h3>
          <Button onClick={() => openModal()}>Add Todo</Button>
        </div>
        {displayTodos}
      </main>

      {/* ADD Todo MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add a new Todo!">
        <form className="space-y-3" onSubmit={sumbitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={() => setSelectedCategory}
          />
          <div className="flex items-center space-x-3 pt-3">
            <Button
              isLoading={isLoading}
              className="bg-indigo-700 hover:bg-indigo-800"
            >
              Submit
            </Button>
            <Button
              variant="cancel"
              className="bg-gray-600 hover:bg-gray-700"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* -------- EDIT PRODUCT MODAL -------- */}
      <Modal
        isOpen={isOpenEdit}
        closeModal={closeEditModal}
        title="Edit this Product!"
      >
        <form className="space-y-3" onSubmit={sumbitEditHandler}>
          {renderTodoToEditWithErrorMsg("title", "Todo Title", "title")}
          {renderTodoToEditWithErrorMsg(
            "description",
            "Todo Description",
            "description"
          )}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-600 hover:bg-gray-700"
              onClick={() => onEditCancel()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE Todo CONFIRM MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Todo from your Store?"
        description="Deleting this todo will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button variant="danger" onClick={removeTodoHandler}>
            Yes, remove
          </Button>
          <Button variant="cancel" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
