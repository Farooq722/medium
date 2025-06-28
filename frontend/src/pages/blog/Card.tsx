import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/zustand/user";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { RiMoreLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface CardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author?: {
      name: string;
    };
  };
}

export const Card = ({ blog }: CardProps) => {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-10 py-2">
        <div className="flex justify-start items-center gap-3 ml-4">
          <h3>
            {" "}
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </h3>
          <h3 className="text-base font-medium">{blog.author?.name}</h3>
          <h3 className="text-base font-light text-gray-500">
            {blog.createdAt}
          </h3>
          <h3 className="text-base font-light text-gray-500">✨Member Only</h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between p-2">
          {/* Right column */}
          <div className="md:w-2/3 w-full p-4 rounded-lg">
            <div>
              <div
                className="space-y-2 cursor-pointer"
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/open-blog", {
                      state: { id: blog.id },
                    });
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <h1 className="text-xl sm:text-2xl font-bold leading text-gray-900 max-h-16 overflow-hidden cursor-pointer">
                  {blog.title}
                </h1>

                <h2 className="text-sm sm:text-base line-clamp-3 font-medium text-slate-800 leading-relaxed text-justify overflow-hidden cursor-pointer">
                  {blog.content}
                </h2>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex items-center gap-3">
                <h3 className="text-sm bg-gray-200 px-2 py-1 text-black rounded-lg">
                  Side Hustle
                </h3>
                <p className="text-sm font-light text-slate-900">3 min read</p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">
                  <CiBookmarkPlus size={22} />
                </p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">
                  <IoIosRemoveCircleOutline size={22} />
                </p>
                <p className="text-gray-700 hover:text-gray-900 cursor-pointer">
                  <RiMoreLine size={22} />
                </p>
              </div>
            </div>
          </div>

          {/* Left column */}
          <div className="md:w-1/3 w-full flex justify-center items-center p-2 rounded-lg">
            <img
              src="/error.png"
              alt="Preview"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};
