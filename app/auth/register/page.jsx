"use client";
import Link from "next/link";
import { register } from "../action";
import { useFormState, useFormStatus } from "react-dom";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [loading, isLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault();
    isLoading(true)
    try {
      const data = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (data.status===200) {
        const res = await data.json()
        isLoading(false)
        Cookies.set('userId',res.id)
        setFormData(initialState)
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error.message);
    }
    
    
  };

  return (
    <div className=" flex justify-center items-center w-full h-screen flex-col">
      <span className="font-bold text-xl mb-2">Registration form</span>

      <form
        onSubmit={handleRegister}
        className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
      >
        <label className="block mb-2 text-gray-800">Name:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

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
          className="w-full p-2 bg-black text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Register..' : 'Register'}
        </button>
      </form>

      <div className=" mt-4 border p-1 rounded-md">
        <Link href={"/auth/login"}>
          <button type="submit" className="w-full p-2 ">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
