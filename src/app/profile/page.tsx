"use client";
import axios from "axios";
import Link from "next/link";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage(){
    
    const router = useRouter();
    const [data,setData] = useState("nothing");
    const onLogout = async() => {
        try {
            await axios.get("/api/users/logout");
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);

            toast.error(error.message);
        }
    }

    const getUserDetails = async ()=> {
        try{
        await toast.promise(
            axios.get('/api/users/me'),
            {
                loading: "Fetching Information...",
                success: (response) => {
                    console.log(response.data)
                    setData(response.data.data._id)
                    return <b>Fetched Successful!</b>
                },
                error: (err) => {
                console.error(err);
                return err?.response?.data?.error || "Failed to fetch user info";
                }
            }
        );
        } catch(error: any){
            console.log(error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-3 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button 
            onClick={onLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"> 
                logout
            </button>
            <button 
            onClick={getUserDetails}
            className="bg-green-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"> 
                Get User Details
            </button>
        <Toaster position="bottom-center" />    
        </div>
    )
}