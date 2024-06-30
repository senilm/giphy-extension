"use client";
import Image from "next/image";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/consts";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const logOut = async () => {
    await signOut(auth);
    Cookies.remove("isAuth");
    Cookies.remove("likedGifs");
    Cookies.remove("userId");
    router.replace("/");
  };
  const isActive = (href) => pathname.includes(href);
  return (
    <nav className="py-5 px-8 flex justify-between items-center">
      <Link href={"/home"} className=" text-lg font-bold flex items-center gap-4">
        <img src="/gif.png" alt="" className="w-14 h-14"></img>
      </Link>
      <div className="gap-5 flex items-center transition-all">
        {navLinks.map((link)=>{
            return <Link href={link.value} key={link.label} className={isActive(link.value) ? ' bg-gray-200 p-2 rounded-lg' : 'p-2'}>{link.label}</Link>
        })}
        <Button type={"button"} onClick={logOut} variant="outline">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
