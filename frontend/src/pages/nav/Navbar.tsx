import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Navbar = () => {
  return (
    <>
      <div className="p-3.5 flex justify-between items-center">
        <div className="">
          <h2 className="text-3xl font-bold ml-5">
            <Link to={"/"}>Medium</Link>
          </h2>
        </div>
        <div className="flex justify-center items-center gap-6 text-lg ">
          <h3 className="flex justify-center items-center gap-1 cursor-pointer">
            <GoPencil />
            Write
          </h3>
          <h3 className="cursor-pointer">
            <IoNotificationsOutline size={25} />
          </h3>
          <div className="cursor-pointer">
            <Popover>
              <PopoverTrigger>
                <Avatar className="w-9 h-9">
                  <AvatarImage src="https://github.com/shadcn.png" sizes="" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <h2>B Farooq</h2>
                <button className="bg-gray-800 text-white mt-1 px-2 rounded-lg font-light">
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
