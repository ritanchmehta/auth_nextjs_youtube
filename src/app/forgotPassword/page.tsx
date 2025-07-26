"use client"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");

    const onForgotPass = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", email)
            console.log("Password reset succesful", response.data);
            toast.success("Password reset successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Password Reset Failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    React.useEffect(()=>{
            if(email.length>0){
                setButtonDisabled(false);
            }
            else{
                setButtonDisabled(true);
            }
        }, [email])

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">{ loading ? "Processing" : "Verification Page"}</h1>
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
            >{buttonDisabled ? "Write valid email": "Submit"}</button>
            <Link href="/login">Back to Login</Link>
        </div>
    )
}