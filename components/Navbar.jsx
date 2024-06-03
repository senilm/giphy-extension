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
  console.log()
  const pathname = usePathname();
  const logOut = async () => {
    await signOut(auth);
    Cookies.remove("isAuth");
    Cookies.remove("likedGifs");
    Cookies.remove("userId");
    router.replace("/");
  };

  return (
    <nav className="py-5 px-8 flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src={`https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg`}
          width={150}
          height={100}
          alt="GIPHY"
          className=""
        />
      </Link>
      <div className="gap-5 flex items-center">
        {navLinks.map((link)=>{
            return <Link href={link.value} key={link.label}>{link.label}</Link>
        })}
        <Button type={"button"} onClick={logOut} variant="outline">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
