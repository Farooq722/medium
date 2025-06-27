import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Buton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className="flex items-center w-auto gap-2 bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-200 m-2"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoIosArrowBack className="text-lg" />
        Back
      </Button>
    </>
  );
};
