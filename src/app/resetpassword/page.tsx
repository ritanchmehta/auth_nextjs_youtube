"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function resetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");

    const verifyUserEmail = async () =>{
        try {
            const resMess = await axios.post('/api/users/verifyemail', {token})
            console.log(resMess);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    }, [token])

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">{loading ? "Processing": "Reset Password"}</h1>
            <hr />
            <label htmlFor="newPassword">New Password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600 text-black bg-white"
                id="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="New Password"
            />
            <button
            // onClick={}
            ></button>
        </div>
    )
}