"use client";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/UserProvider";
import { useRouter } from "next/navigation";
import { setAuthenticated } from "@/lib/auth";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon,  Loader2 } from "lucide-react";
import useStore from "@/store/store";

const initialState = {
  email: "",
  password: "",
};

const validateForm = (formData) => {
  const errors = {};

  const emailRegex = /^\w+@[a-zA-Z_\.]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email address";
  }

  if (formData.password.trim() === "") {
    errors.password = "Password is required";
  } 
  return errors;
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const {setUserId} = useStore();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(errorData.message.startsWith("Firebase") ? "Invalid credentials, Please try again" : "Failed to login, Please try again");
        return;
      }
  
      const userData = await response.json();
      setUserId(userData.userId)
      Cookies.set('isAuth', true);
      setFormData(initialState);
      router.push('/home');
    } catch (error) {
      console.error('Login error:', error);
      setErrMsg('An error occurred during login. Please try again.');
    } finally { 
      setLoading(false);
    }
  }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center  text-red-400 text-base">
          {errMsg.length > 0 ? errMsg : " "}
          </p>
        </div>
        <div className="rounded-md bg-white px-8 py-8 shadow dark:bg-gray-800">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="you@example.com"
                type="email"
                onChange={(e) =>
                          setFormData({ ...formData, [e.target.name]: e.target.value })
                        }
              />
              {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
              <Input
                autoComplete="current-password"
                id="password"
                name="password"
                placeholder="******"
                value={formData.password}
                onChange={(e) =>
                          setFormData({ ...formData, [e.target.name]: e.target.value })
                        }
                type={showPassword ? "text" : "password"}
              />
              <span
                  className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-4"/> : <EyeIcon className="w-5 h-4" /> }
                </span>
              </div>
              {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" name="remember-me" />
                <Label className="ml-2" htmlFor="remember-me">
                  Remember me
                </Label>
              </div>
              <div className="text-sm">
                <Link
                  className="font-medium text-blue-400"
                  href="#"
                >
                  Forgot your password?
                </Link>
              </div>
            </div> */}
            <div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              {loading ? 'Please wait...':'Login'}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <Button
                  className="w-full justify-center"
                  type="button"
                  variant="outline"
                  disabled
                >
                  <ChromeIcon className="mr-2 h-5 w-5" />
                  Sign in with Google
                </Button>
              </div>
            </div> */}
            <div className="text-sm mt-3 text-center">
            Don&apos;t have an account? <Link href={"/auth/register"} className=" text-blue-400">Create new account</Link>
              </div>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default Login;
