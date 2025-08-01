"use client"; //Marks this file as a client component (runs in the browser), required in Next.js App Router for interactive components.
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await toast.promise(
        // 1. The promise to resolve
        axios.post("/api/users/login", user),
        // 2. An object with messages for each state
        {
          loading: "Logging in...",
          success: (response) => {
            // This function runs when the promise is successful
            console.log("login successful", response.data);
            router.push("/profile");
            return <b>Login successful! Welcome.</b>;
          },
          error: (err) => {
            // This function runs when the promise fails
            console.error("Login failed:", err);
            return <b>Login failed. Please check your credentials.</b>;
          },
        }
      );
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600"
      >
        { loading ? "Logging In..." : buttonDisabled ? "Fill all fields" : "login Here"}
      </button>
      <Link href="/signup">Visit signup page</Link>
      <Link href="/forgotpassword">Forgot Password?</Link>
      <Toaster position="bottom-center" />
    </div>
  );
}
