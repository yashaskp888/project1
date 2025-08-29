"use client"
import React, { use } from 'react'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'
import { initiate } from '@/app/actons/useractions'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments } from '@/app/actons/useractions'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Payments = ({ username }) => {
    const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({ "name": "", "message": "", "amount": "" })
    const [currentUser, setcurrentUser] = useState([])
    const [Payment, setPayment] = useState([])
    const SearchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        if (SearchParams.get("paymentdone") == "true") {
            toast('Payment Done Successfully', {
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
        }
        router.push(`/${username}`)


    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setpaymentform((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbPayments = await fetchpayments(username)
        setPayment(dbPayments)
    }
    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "GET ME A CHAI", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        const rzp1 = new window.Razorpay(options);

        rzp1.open();

    }
    const payButton = (amount) => {
        setpaymentform((prev) => ({
            ...prev,
            amount: Number.parseInt(prev.amount) + amount
        }))
    }
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>



            <div className="text-white w-full fit py-0 relative ">
                <img className="sm:w-full w-5/4 align-center object-cover h-[330px]  " src={currentUser.coverPic}></img>
                <img src={currentUser.profilePic} className="w-[100px] h-[100px] absolute rounded-full -bottom-10  right-[37%] md:right-[47%] border-2 border-fuchsia-100" />
            </div>
            <div className="flex flex-col  items-center gap-2 ">
                <div className="py-12  text-white font-bold text-lg">
                    @{username}</div>
                <div className="text-slate-300">
                    Creating Animated Art For NTT's </div>
                <div className="text-slate-300">
                    Top {Payment.length} Payments , {currentUser.name} has Raised a Total Funding of ₹{Payment.reduce((a,b)=>a+b.amount,0)}</div></div>
            <div className="pb-20 md:flex-row flex-col sm:justify-center sm:items-center">
                <div className="flex px-0 justify-center gap-2 md:flex-row flex-col">
                    <div className="bg-slate-900 w-[600px] h-[300px] md:p-6 rounded-xl  flex flex-col gap-7 "><h2 className="font-semibold text-2xl font-sans text-center underline">
                        Top Supporters</h2><ul className=" flex flex-col gap-4 sm:text-center">
                            {Payment.length == 0 && <li>No Payments Yet</li>}
                            {Payment.map((p, i) => {
                                return <li key={i} className="flex gap-2">
                                    <img src="profile.png" className="w-8 h-8"></img>{p.name} <span className="font-semibold">
                                        ₹{p.amount}</span> with a message"{p.message}"
                                </li>
                            })}
                        </ul>
                        {/* we use here input to make payment */}
                    </div>
                    <div className="bg-slate-900 w-[600px] h-[300px] rounded-xl md:flex-row flex-col">
                        <h2 className="underline md:text-center font-bold text-xl pt-1">
                            Make Donation
                        </h2>
                        <div className="flex flex-col md:items-center gap-4 mt-8">

                            <input
                                onChange={handleChange}
                                value={paymentform.name}
                                name="name"
                                type="text"
                                placeholder="Enter Name"
                                className="p-2 rounded text-white w-3/4 h-5"
                            />
                            <input
                                type="text"
                                name="message"
                                onChange={handleChange}
                                value={paymentform.message}
                                placeholder="Enter message"
                                className="p-2 rounded text-white w-3/4 h-5"
                            />
                            <input
                                type="number"
                                onChange={handleChange}
                                value={paymentform.amount}
                                name="amount"
                                placeholder="Enter amount"
                                className="p-2 rounded text-white w-3/4 h-5"
                            />
                            <button type="button" onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="text-white w-3/4 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-slate-600" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}>Pay</button>
                            <div className="flex gap-3">
                                <button className="bg-slate-600 w-30 rounded-2xl" onClick={() => payButton(Number.parseInt(10))}>+₹10</button>
                                <button className="bg-slate-600 w-30 rounded-2xl" onClick={() => payButton(20)}>+₹20</button>
                                <button className="bg-slate-600 w-30 rounded-2xl" onClick={() => payButton(30)}>+₹30</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default Payments
