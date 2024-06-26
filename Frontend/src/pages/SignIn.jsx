import React, { useState } from 'react'
import { Button, Label, TextInput } from "flowbite-react";
import {Link,useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { successStart } from '../redux/features/auth/authSlice';




const SignIn = () => {
    const[error,setError]=useState(false);
    const[formData,setFormData]=useState({
      username:"",
      password:""
    });
    const navigate=useNavigate();
    const dispatch=useDispatch();
    console.log(formData);

    const handleChange=(e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleFormSubmit=async(e)=>{
      e.preventDefault();
      if(formData.username===""||formData.email===""||formData.password===""){
        return setError("Xanaları doldur!!")
      }

      try {
        const res = await fetch("http://localhost:3004/api/v1/auth/signIn", {
        method: "POST",
        credentials: "include", // added this part
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      
      const data=await res.json();
      console.log(data);
      if(data.success===false){
        setError(data.message);
        return;
      }
      if(data.isWorker===true&&!data.isAdmin){
        setError("Zəhmət olmasa administratorla əlaqə saxlayın !")
        return;
      }
      if(res.ok){
        dispatch(successStart(data))
        navigate("/")
      }
      setError("")
        
      } catch (error) {
        setError(error.message)
      }
    }

  return (
    <div className='min-h-screen image'>
        <div className='bgFon min-h-screen flex justify-center items-center'>
            <div className='text-white w-[350px]'>
                <h1 className='text-center text-5xl font-semibold'>Daxil ol</h1>
                <form  className='flex flex-col gap-3 mt-5' onSubmit={handleFormSubmit}>
                    <div>
                    <Label htmlFor="username" value="İstifadəçi adı"  className='text-white text-md'/>
                    <TextInput id="username" type="text" placeholder="İstifadəçi adı" required onChange={handleChange}/>
                    </div>
                    <div>
                    <Label htmlFor="password" value="Şifrə" className='text-white text-md'/>
                    <TextInput id="password" type="password"   onChange={handleChange}/>
                    </div>
                    <Button type='submit'>Daxil ol</Button>
                </form>
                <p className='mt-2 text-sm'>Hesab yoxdursa? <Link to={"/sign-up"} className='text-sky-300' >Qeydiyyatdan keç</Link></p>
                {
                  error&&(<p className='mt-2 text-sm text-red-700'>{error}</p>)
                }
            </div>
        </div>
    </div>
  )
}

export default SignIn