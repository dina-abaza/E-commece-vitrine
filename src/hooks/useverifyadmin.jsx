import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UseVerifyAdmin(){
const navigate =useNavigate()

useEffect(()=>{
    async function verify(){
        try{
            await axios.get('https://e-commece-vitrine-api.vercel.app/api/verify-login-admin',{
                withCredentials:true,
            })
        }
        catch(error){
        console.error("Admin verification failed:", error);
        navigate("/admin/login"); 

        }
    }
    verify()
},[navigate])
}