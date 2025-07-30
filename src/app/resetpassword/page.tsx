"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
//import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function resetPasswordPage() {
    //const router = useRouter();
    const [token, setToken] = useState("");
    // const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [userBoolean, setUserBoolean] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPassReset = async () =>{
        try {
            setButtonDisabled(true);
            setLoading(true);
            const resMess = await axios.post('/api/users/resetpassword', {token, password})
            console.log(resMess);
            setUserBoolean(resMess.data.success)
        } catch (error:any) {
            // setError(true);
            console.log(error.response.data);
        } finally {
            setButtonDisabled(false);
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
            <h1 className="text-center text-white text-2xl">{loading ? "Processing": "Reset Password"}</h1>
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
            className="p-2 border border-gray-300 rounded-lg mb-4 focus: outline-none focus:border-gray-600">
                {buttonDisabled ? "No SignUp": "Reset Password"}
            </button>
            </div>)}
            {userBoolean && (
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h2 className="text-center text-white text-2xl">Password Reset Successfull! Please Visit login page now</h2>
                    <Link href='/login'>Visit login</Link>
                </div>
            )}
        </div>
    )
}