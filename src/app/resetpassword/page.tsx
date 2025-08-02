"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function resetPasswordPage() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [userBoolean, setUserBoolean] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPassReset = async () =>{
        try {
            setLoading(true);
            await toast.promise(
                axios.post('/api/users/resetpassword', {token, password}),
                {
                    loading: "Reseting Password",
                    success: (response) => {
                    console.log("Reset success", response.data);
                    setUserBoolean(response.data.success);
                    return <b>Password Reset successfully! Please visit Login Page</b>;
                    },
                    error: (err) => {
                    console.error("Login failed:", err);
                    return <b>SignUp failed</b>;
                    }
                }
            );
        } catch (error:any) {
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    //verify everything on button click instead of a useEffect hook

    useEffect(()=> {
            if(password.length > 0){
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true)
            }
        }, [password]);
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">Reset Password</h1>
            <hr />
            {!userBoolean && (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
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
            onClick={onPassReset}
            disabled={buttonDisabled || loading}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600">
                { loading ? "" : buttonDisabled ? "No SignUp": "Reset Password"}
            </button>
            </div>)}
            {userBoolean && (
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h2 className="text-center text-white text-2xl">Please Visit login page now</h2>
                    <Link href='/login'>Visit login</Link>
                </div>
            )}
            <Toaster position="bottom-center" />
        </div>
    )
}