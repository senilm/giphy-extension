"use client";
import Link from "next/link";
import { register } from "../action";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const data = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if(!data.ok){
        const errorData = await data.json();
        setErrMsg(errorData.message);
        return;
      }
      const res = await data.json()
      Cookies.set('userId',res.id)
      setFormData(initialState)
      router.push("/auth/login");
    } catch (error) {
      console.log(error.message);
      setErrMsg('An error occurred during Registration. Please try again.');
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Create new account
        </h2>
        <p className="mt-2 text-center  text-red-400 text-base">
        {errMsg.length > 0 ? errMsg : " "}
        </p>
      </div>
      <div className="rounded-md bg-white px-8 py-8 shadow dark:bg-gray-800">
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              autoComplete="name"
              id="name"
              name="name"
              value={formData.name}
              placeholder="your name"
              required
              type="text"
              onChange={(e) =>
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                      }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="you@example.com"
              required
              type="email"
              onChange={(e) =>
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                      }
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="current-password"
              id="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={(e) =>
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                      }
              required
              type="password"
            />
          </div>

          <div>
          <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              {loading ? 'Please wait...':'Register'}
              </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="text-sm mt-3 text-center">
              Already have an account? <Link href={"/auth/login"} className=" text-blue-400">Back to Login</Link>
           </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Register;
