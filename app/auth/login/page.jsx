"use client";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/UserProvider";
import { useRouter } from "next/navigation";
import { setAuthenticated } from "@/lib/auth";
import Cookies from "js-cookie";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const data = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (data.status === 200) {
        setLoading(false)
        Cookies.set("isAuth", true);
        setFormData(initialState);
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }

    // console.log(await data.json())
    // setAuthenticated(true)
    // localStorage.setItem('isAuth',true)
  };

  return (
    <div className=" flex justify-center items-center w-full h-screen flex-col">
      <span className="text-xl font-bold mb-3">Login Form</span>

      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
      >
        <label className="block mb-2 text-gray-800">Email:</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <label className="block mb-2 text-gray-800">Password:</label>
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full p-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-500"
          disabled = {loading}
        >
          {loading ? 'login...':'login'}
        </button>
      </form>

      <div className=" mt-4 border p-1 rounded-md">
        <Link href={"/auth/register"}>
          <button type="submit" className="w-full p-2 rounded ">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
