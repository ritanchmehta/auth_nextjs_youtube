"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async() => {
        try{
            setLoading(true);
            await toast.promise(
                axios.post("/api/users/signup", user),
                {
                    loading: "Signing up...",
                    success: (response) => {
                    console.log("SignUp success", response.data);
                    router.push("/login");
                    return <b>SignUp successful! Welcome.</b>;
                    },
                    error: (err) => {
                    console.error("Login failed:", err);
                    return <b>SignUp failed</b>;
                    }
                }
            );
        } catch(error: any){
            console.log("Signup failed", error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user]);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">{loading ? "Processing": "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black bg-white"
                id="username"
                type="text"
                value={user.username}
                onChange={(e)=> setUser({...user, username: e.target.value})}
                placeholder="username"
             />
            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black bg-white"
                id="email"
                type="text"
                value={user.email}
                onChange={(e)=> setUser({...user, email: e.target.value})}
                placeholder="email"
             />
            <label htmlFor="password">password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black bg-white"
                id="password"
                type="password"
                value={user.password}
                onChange={(e)=> setUser({...user, password: e.target.value})}
                placeholder="password"
             />
             <button 
             onClick={onSignup}
             disabled={buttonDisabled || loading}
             className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600">{ loading ? "Signing Up": buttonDisabled ? "Fill all fields": "SignUp"}</button>
             <Link href='/login'>Visit login</Link>
             <Toaster position="bottom-center" />
        </div>
    )
}