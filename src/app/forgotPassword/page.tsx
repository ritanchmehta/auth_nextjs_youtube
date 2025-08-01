"use client"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import Link from "next/link";
import toast, {Toast, Toaster} from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onForgotPass = async() => {
        try {
            setLoading(true);
            await toast.promise(
            axios.post("/api/users/forgotpassword", {email}),
            {
              loading: "Sending reset password mail",
              success: (response) => {
                console.log("Password reset mail sent succesfully", response.data);
                router.push("/login");
                return <b>Mail sent succesfully!</b>
              },
              error: (err) => {
                console.error("Password Reset Failed", err);
                return <b>Mail not sent. Please check your credentials.</b>;
              },
            }
          );
        } catch (error: any) {
            console.log("Password Reset Failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(()=>{
            if(email.length>0){
                setButtonDisabled(false);
            }
            else{
                setButtonDisabled(true);
            }
        }, [email])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">Forgot password Page</h1>
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
            disabled={buttonDisabled || loading}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600"
            >{loading? "Sending password reset email...": buttonDisabled ? "Write valid email": "Submit"}</button>
            <Link href="/login">Back to Login</Link>
            <Toaster position="bottom-center" />
        </div>
    )
}