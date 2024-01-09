// 'use server'

import { redirect, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
  } from "firebase/auth";
import { setAuthenticated } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import Cookies from "js-cookie";


// export const login = async (formData) =>{
// }

// export const register = async (prevState, formData) =>{
// }

