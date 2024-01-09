'use client'
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { signOut } from "firebase/auth"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase";
import { usePathname } from "next/navigation";

const Navbar = ({setSearchTerm}) => {
    const router = useRouter()
    const pathname = usePathname()
    const logOut =async () =>{    
        await signOut(auth)
        Cookies.remove('isAuth')
        router.replace('/auth/login')        
    }
    
  return (
    <nav className="py-5 px-8 flex justify-between items-center">
      <Link href={'/'}>
      <Image
        src={`https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg`}
        width={150}
        height={100}
        alt="GIPHY"
        className=""
        />
        </Link>

      {pathname !== '/favorites' && (
        <div className=" flex gap-5">
        <input type="text" className=" border pr-8 pl-3 rounded-lg bg-gray-100" onChange={(e)=>setSearchTerm(e.target.value)}  placeholder="Article name or keywords"/>
        <Button type={'submit'} label={'Search'}></Button>
      </div>
      )}

      <div className="gap-5 flex ">
        {pathname !== '/favorites' ? 
        <Link href={'/favorites'}>
            <Button type={"button"} label={'Favorites'}></Button>
        </Link>
        :
        <Link href={'/'}>
            <Button type={"button"} label={'Home'}></Button>
        </Link>}

        {/* <Button type={"button"} label={'Logout'} action={logOut}></Button> */}
        <LogoutBtn logOut={logOut}/>
      </div>
    </nav>
  );
};

export default Navbar;
