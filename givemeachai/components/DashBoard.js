
"use client"
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { fetchuser,updateuser } from '@/app/actons/useractions';
import { useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const DashBoard = () => {
  const router = useRouter()
    const { data: session,update } = useSession()
    
      
    
  useEffect(() => {
    
    if (!session) {
      
      router.push('/Login') // Redirect to Dashboard if already logged in
    }
  
  }, [session,router])
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    razorID: '',
    Razorsecret:'',
    coverPic:'',
    profilePic:''
  });
  const getData = async () => {
    if (session) {
      let user = await fetchuser(session.user.name)
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        razorID: user.razorID || '',
        coverPic:user.coverPic||" ",
        profilePic:user.profilePic||" "
      });
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    update()

    const { name, email, phone, razorID,Razorsecret, coverPic, profilePic } = formData;

    if (!name || !email || !phone || !razorID || !Razorsecret|| !coverPic || !profilePic) {
      alert('Please fill out all fields.');
      return;
    }

    let a = await updateuser({...formData, username: session.user.name}, session.user.name);
    
    toast('Updated Profile', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
    
    router.push('/'+session.user.name) 
    setFormData({
      name: '',
      email: '',
      phone: '',
      razorID: '',
      Razorsecret: '',
      coverPic:"",
      profilePic:''
    });
  };

  return (
    <>
      <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
      
                  />
    <div className="pt-15 text-white flex flex-col items-center justify-center px-4 md:w-1/2 md:mx-auto min-h-screen">
      <div className="bg-gray-800 rounded-lg p-8 px-7 shadow-md sm:w-1/2 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center underline">User Dashboard</h2>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full p-2 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full p-2 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full p-2 rounded text-white"
              required
            />
            {/* input tag for razor pay*/}
            
          </div>
          <div className="razorpy">
            <label className="block text-sm mb-1">Razorpay</label>
            <input
              type="text"
              name="razorID"
              value={formData.razorID}
              onChange={handleChange}
              placeholder="Enter RazorPay ID"
              className="w-full p-2 rounded text-white"
              required
            />

          </div><div>
           <label className="block text-sm mb-1">RazorPaySecret</label>
            <input
              type="text"
              name="Razorsecret"
              value={formData.Razorsecret}
              onChange={handleChange}
              placeholder="Enter your Razorpay Secret"
              className="w-full p-2 rounded text-white"
              required
            />
          </div><div>
            <label className="block text-sm mb-1">CoverPic</label>
            <input
              type="url"
              name="coverPic"
              value={formData.coverPic}
              onChange={handleChange}
              placeholder="Enter your coverPic url"
              className="w-full p-2 rounded text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">ProfilePic</label>
            <input
              type="url"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              placeholder="Enter your profile pic url"
              className="w-full p-2 rounded text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default DashBoard;

