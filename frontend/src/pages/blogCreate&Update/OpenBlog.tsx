import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../nav/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const baseURL = import.meta.env.VITE_BACKEND_API_URL;

interface Data {
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  id: string;
  author: {
    name: string;
  };
}

export const OpenBlog = () => {
  const location = useLocation();
  const [data, setData] = useState<Data>();
  const { id } = location.state!;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${baseURL}/blog/${id}`, {
        withCredentials: true,
      });

      const Data = res.data.blogById;

      const formattedDate = new Date(Data.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );

      setData({
        ...Data,
        createdAt: formattedDate,
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="border-b-2 border-gray-500" />
      <div className="min-h-screen flex justify-center items-start mt-4">
        <div className=" w-full max-w-3xl flex justify-start items-center text-white">
          <div className="">
            <button className="bg-gray-100 p-1 rounded-lg">
              <h3 className="font-semibold text-gray-400 px-1">
                ✨ Member-Only Story
              </h3>
            </button>
            <div className="mt-8 text-black font-bold">
              <h1 className="text-5xl capitalize leading-tight">
                {data?.title}
              </h1>
            </div>

            <div className="space-y-4 mt-5 text-gray-500 flex justify-start items-center gap-4">
              <h3 className="inline-flex">
                {" "}
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </h3>
              <p>{data?.author?.name}</p>
              <p>3 min read</p>
              <p className="mb-3.5">{data?.createdAt}</p>
            </div>
            <div className="mt-8">
              <h1 className="text-gray-800 font-serif text-2xl  leading-relaxed">
                {data?.content}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
