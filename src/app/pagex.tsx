"use client";
import { useState, useEffect, useCallback } from "react";
import { ITodo } from "@/interface";
import axiosInstance from "@/config/axios.config";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../provider/token";
import Modal from "../../components/schemas/Modal";

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);



  const { token } = useSelector(tokenSelector);

    const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openEditModal = useCallback(() => setIsOpenEdit(true), []);
  const closeEditModal = () => setIsOpenEdit(false);

  const openConfirmModal = useCallback(() => setIsOpenConfirmModal(true), []);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axiosInstance.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo: ITodo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id: string, updatedTodo: ITodo) => {
    try {
      const response = await axiosInstance.put<ITodo>(
        `/todos/${id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(
        todos.map((todo: ITodo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo: ITodo) => (
          <li key={todo?._id}>
            <h2>{todo?.title}</h2>
            <p>{todo?.description}</p>
            <button onClick={() => todo?._id && deleteTodo(todo._id)}>
              Delete
            </button>
            <button
              onClick={() =>
                todo?._id &&
                updateTodo(todo._id, {
                  ...todo,
                  title: "Updated title",
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
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
          {renderProductToEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductToEditWithErrorMsg(
            "description",
            "Product Description",
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
  );
};

export default TodoList;
