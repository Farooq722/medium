import { Link, useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/zustand/user";

export const Navbar = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const clickHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="p-3.5 flex justify-between items-center">
        <div className="">
          <h2 className="text-3xl font-bold ml-5">
            <Link to={"/"}>Medium</Link>
          </h2>
        </div>
        {user ? (
          <div className="flex justify-center items-center gap-6 text-lg ">
            <h3 className="flex justify-center items-center gap-1 cursor-pointer">
              <Link
                to={"/blog"}
                className="flex justify-center items-center gap-1.5 cursor-pointer hover:text-slate-600"
              >
                <GoPencil />
                Write
              </Link>
            </h3>
            <h3 className="cursor-pointer">
              <IoNotificationsOutline size={25} />
            </h3>
            <div>
              <Popover>
                <PopoverTrigger>
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="cursor-pointer"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className="text-base font-semibold">{user.name}</h2>
                  <button
                    className="bg-gray-900 text-white mt-2 py-0.5 px-2 rounded-md font-light cursor-pointer"
                    onClick={clickHandler}
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              className="bg-slate-800 text-white cursor-pointer text-base hover:bg-slate-950 hover:text-white"
              onClick={() => {
                navigate("login");
              }}
            >
              Signin
            </Button>
            <Button
              className="bg-slate-800 text-white cursor-pointer text-base hover:bg-slate-950 hover:text-white"
              onClick={() => {
                navigate("signup");
              }}
            >
              Signup
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
