import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/app/db";
import {cookies} from "next/headers"

export const POST = async (req, res) => {
  try {
    const reqData = await req.json()
    const {email,password} = reqData
    
    if (!email || !password) {
      return new Response("please provide all details", { status: 400 });
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await prisma.user.findUnique({
      where:{
        email:email
      }
    })
    const likedGifsData = await prisma.gifLike.findMany({
      where: {
        userId: userData.id,
      },
      select: {
        gif: {
          select: {
            gifyId: true,
          },
        },
      },
    });
    const likedGifs = likedGifsData.map((gif)=>{
      return gif.gif.gifyId
    })
    cookies().set('userId',userData.id)
    cookies().set('likedGifs',JSON.stringify(likedGifs))
    await prisma.login.create({
      data:{
        userId:userData.id
      }
    })
    const user = userCredential.user;

     
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Error while Logging in",{status:400})
  }
};
