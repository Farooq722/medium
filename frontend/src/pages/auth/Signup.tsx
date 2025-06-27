import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { SyncLoader } from "react-spinners";
import { useUserStore } from "@/zustand/user";
import { Buton } from "./Buton";

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

interface FormData {
  name: String;
  email: string;
  password: string;
}

export const Signup = () => {
  const { loader, setLoader } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoader(true);
    try {
      const res = await axios.post(`${baseURL}/user/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        reset();
        navigate("/login");
      } else if (!res.data.success) {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Buton />

      <div className="bg-white w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-5xl text-black font-semibold">
            Create an account
          </h1>
          <h3 className="text-gray-500 mt-2 text-sm md:text-lg">
            Already have an account?{" "}
            <Link to={"/login"} className="underline font-semibold">
              Login
            </Link>
          </h3>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="Username" className="text-base font-medium">
                Username
              </Label>
              <Input
                type="text"
                placeholder="Enter Your Username"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="Email" className="text-base font-medium">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="Password" className="text-base font-medium">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-black mt-2 text-white hover:bg-gray-800 cursor-pointer"
            >
              {loader ? <SyncLoader size={6} color="#fff" /> : "Signup"}
            </Button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-gray-200 flex flex-col justify-center items-center p-6 text-center">
        <p className="text-xl md:text-3xl font-semibold mb-6">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns."
        </p>
        <div>
          <p className="font-medium text-lg">Jules Winnfield</p>
          <p className="font-light text-gray-600">CEO, Acme Inc</p>
        </div>
      </div>
    </div>
  );
};
