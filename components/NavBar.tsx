import Cookies from "universal-cookie";
import Button from "../components/schemas/Button";
import toast from "react-hot-toast";
import Link from "next/link";

const Navbar = () => {
  // ** Cookies
  const cookie = new Cookies();
  const userData = cookie.get("userLogged");

  const Logout = () => {
    cookie.remove("userLogged");
    toast.success("Logout is done, you will navigate after 1 seconds!", {
      position: "bottom-center",
      duration: 1500,
    });
    setTimeout(() => {
      location.replace("/login");
    }, 1500);
  };

  return (
    <nav className="max-w-2xl mx-auto mt-7 mb-20 px-3 py-5">
      <ul className="flex items-center justify-between">
        <li className="text-gray-500 duration-200 font-semibold text-lg">
          <Link href={"/"}>Home</Link>
        </li>
        {!userData ? (
          <div className="flex items-center space-x-3">
            <li className="text-gray-500 duration-200 font-semibold text-lg">
              <Link href="/register">Register</Link>
            </li>
            <li className="text-gray-500 duration-200 font-semibold text-lg">
              <Link href="/login">Login</Link>
            </li>
          </div>
        ) : (
          <div className="flex flex-row items-center text-indigo-600 space-x-2">
            <h3 className="text-gray-500 text-sm font-semibold">
              <div className="flex space-x-3">
                <Link href={"/todos"}>Todos</Link>
                <Link href={"/profile"}>
                  Hello, {userData.user.username} 👋
                </Link>
              </div>
            </h3>
            <Button onClick={Logout} size={"sm"}>
              Logout
            </Button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
