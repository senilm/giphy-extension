import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import prisma from "@/app/db";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  
  try {
    const data = await req.json()
    const { name, email, password } = data;
    if (!name || !email || !password) {
      return new Response("PLEASE PROVIDE ALL DETAILS", {status:400})
    }
    await createUserWithEmailAndPassword(auth, email, password);
    const user = await prisma.user.create({
      data: {
        username:name,
        email: email,
      },
    })
   
    return NextResponse.json(user, {status:200})
  } catch (error) {
    return new Response( error.message,{status:400});
  }
};
