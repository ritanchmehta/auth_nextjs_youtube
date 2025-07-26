"use client"
import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");

    const onForgotPass = async() => {

    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">Verification Page</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black bg-white"
                id="email"
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="email"
            />
            <button
            onClick={onForgotPass}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600"
            >Submit</button>
            <Link href="/login">Back to Login</Link>
        </div>
    )
}