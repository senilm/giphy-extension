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
        {/* {pathname !== "/favorites" ? (
          <Link href={"/favorites"}>
            <Button type={"button"} label={"Favorites"}></Button>
          </Link>
        ) : (
          <Link href={"/"}>
            <Button type={"button"} label={"Home"}></Button>
          </Link>
        )} */}
          <Link href={"/favorites"}>
            Favorites
          </Link>
          <Link href={"/home"}>
            Home
          </Link>
          <Link href={"/explore"}>
            Explore
          </Link>
          <Link href={"/profile"}>
            Profile
          </Link>
        {/* <Button type={"button"} label={'Logout'} action={logOut}></Button> */}
        {/* <LogoutBtn logOut={logOut} /> */}
        <Button type={"button"} onClick={logOut} variant="outline">Logout</Button>
      </div>
    </nav>
  );
};

export default Navbar;
