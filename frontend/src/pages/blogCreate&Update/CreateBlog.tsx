import { useForm } from "react-hook-form";
import { useUserStore } from "@/zustand/user";
import { BlogNav } from "../nav/BlogNav";
import { CiCirclePlus } from "react-icons/ci";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import { toast } from "sonner";
const baseURL = import.meta.env.VITE_BACKEND_API_URL;

interface FormData {
  title: string;
  content: string;
}

export const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { loader, setLoader } = useUserStore();

  const onSubmit = async (data: FormData) => {
    setLoader(true);
    try {
      const res = await axios.post(`${baseURL}/blog/create-blog`, data, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <BlogNav />
      <div className="border-b-1 border-gray-300" />
      <div className="min-h-screen  flex justify-center items-start gap-6 mt-8 text-white">
        <div className="w-full max-w-5xl p-6 rounded-lg shadow-sm flex justify-start items-start gap-4">
          <CiCirclePlus size={60} className="text-black" />
          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextareaAutosize
              minRows={1.5}
              maxRows={3}
              placeholder="Title goes here"
              className="w-full text-base p-3 rounded-md text-black border border-gray-200 shadow-lg resize-none focus:outline-none"
              {...register("title", {
                required: "Title is Must",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-md">{errors.title.message}</p>
            )}
            <TextareaAutosize
              minRows={5}
              placeholder="Write your blog content..."
              className="w-full text-base p-3 rounded-md text-black border border-gray-200 shadow-lg resize-none focus:outline-none"
              {...register("content", {
                required: "Content is Must",
              })}
            />
            {errors.content && (
              <p className="text-red-500 text-md">{errors.content.message}</p>
            )}
            <div>
              <h3 className="flex justify-center items-center gap-1 cursor-pointer">
                <Button
                  type="submit"
                  className="w-1/5 bg-green-400 text-black font-semibold cursor-pointer hover:bg-green-500 hover:text-black"
                >
                  {loader ? <SyncLoader size={6} color="#fff" /> : "Publish"}
                </Button>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
