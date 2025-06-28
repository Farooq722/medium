import { GoPlus } from "react-icons/go";
import { Navbar } from "./nav/Navbar";
import { Link } from "react-router-dom";
import { Card } from "./blog/Card";
import { useEffect } from "react";
import axios from "axios";
import { useBlogStore } from "@/zustand/blog";
import { PuffLoader } from "react-spinners";

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

export const Home = () => {
  const { blogs, setBlogs } = useBlogStore();
  useEffect(() => {
    const fetchData = async () => {
      const bulkData = await axios.get(`${baseURL}/blog/bulk`, {
        withCredentials: true,
      });
      if (bulkData.data.success) {
        setBlogs(bulkData.data.allBlogs);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center gap-3 bg-slate-50 p-2">
        <h3>
          ✨ Get unlimited access to the best of Medium for less than $1/week.
        </h3>
        <h3 className="text-base font-semibold underline">
          <Link to={"#"}>Become a member</Link>
        </h3>
      </div>
      <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex justify-start items-center gap-6 border-2 border-gray-200 mt-8 text-black py-2 px-4 rounded-lg shadow-lg">
          <GoPlus
            size={25}
            className="cursor-pointer hover:text-gray-600 font-semibold"
          />
          <h3 className="cursor-pointer hover:text-gray-600 font-semibold">
            For you
          </h3>
          <h3 className="cursor-pointer hover:text-gray-600 font-semibold">
            Following
          </h3>
          <h3 className="cursor-pointer hover:text-gray-600 font-semibold">
            Featured
          </h3>
        </div>
        {blogs.length !== 0 ? (
          blogs.map((item) => (
            <div key={item.id} className="px-10">
              <Card blog={item} />
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center mt-20 gap-3">
            <p className="text-base text-gray-500">
              BE is deployed on render so taking time
            </p>
            <PuffLoader />
            <p className="text-base text-gray-600">Please wait</p>
          </div>
        )}
      </div>
    </>
  );
};
