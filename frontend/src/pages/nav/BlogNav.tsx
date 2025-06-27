import { Link, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/zustand/user";
import { RiMoreLine } from "react-icons/ri";

export const BlogNav = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const clickHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="p-3.5 flex justify-around items-center">
        <div className="flex justify-center items-center gap-3">
          <h2 className="text-3xl font-bold ml-5">
            <Link to={"/"}>Medium</Link>
          </h2>
          <h3 className="mt-2 text-gray-500">Draft in {user?.name}</h3>
        </div>
        <div className="flex justify-center items-center gap-5 text-lg ">
          <h3 className="cursor-pointer">
            <IoNotificationsOutline size={25} />
          </h3>
          <h3 className="cursor-pointer">
            <RiMoreLine size={25} />
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
                <h2 className="text-base font-semibold">{user?.name}</h2>
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
      </div>
    </>
  );
};
