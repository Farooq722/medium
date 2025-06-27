import { GoPlus } from "react-icons/go";
import { Navbar } from "./nav/Navbar";
import { Link } from "react-router-dom";
import { Card } from "./blog/Card";
import { useEffect } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_API_URL;


export const Home = () => {

  useEffect(() => {
    const fetchData = async () =>{
      const bulkData = await axios.get(`${baseURL}/blog/bulk`, {
        withCredentials: true
      });
      console.log(bulkData.data.allBlogs);
    }
    fetchData()
  }, [])

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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};
