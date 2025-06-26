import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";
const baseURL = import.meta.env.VITE_BACKEND_API_URL;

interface FormData {
  email: string;
  password: string;
}

export const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoader(true);
    try {
      const res = await axios.post(`${baseURL}/user/signin`, data, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        reset();
        navigate("/");
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
      <Button
        className="flex items-center bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-200 m-2"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoIosArrowBack className="text-lg" />
        Back
      </Button>
      <div className="min-h-screen flex flex-col justify-center items-center md:flex-row">
        <div className="bg-white w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl text-black font-semibold">
              Signin to your account
            </h1>
            <h3 className="text-gray-500 mt-2 text-sm md:text-lg">
              Don't have an account?{" "}
              <Link to={"/signup"} className="underline font-semibold">
                Signup
              </Link>
            </h3>
          </div>

          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="w-full bg-black mt-2 text-white hover:bg-gray-800"
              >
                {loader ? <SyncLoader size={6} color="#fff" /> : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
