import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment";

export const POST = async (req) => {
    await connectDB()
    let body=await req.formData()
    body=Object.fromEntries(body)
   
    
    //check if razorpay order id is present in server
    let p= await Payment.findOne({oid:body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false, message: "Order ID Not Found"})
    }
    let user=await User.findOne({username:p.to_user})
    let secret=await user.Razorsecret
    let xx = validatePaymentVerification({
        "order_id": body.razorpay_order_id,
       "payment_id": body.razorpay_payment_id}
        ,body.razorpay_signature
    , secret)

    if (xx) {
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },{done:true},{ new: true })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success:false,message:"Payment Verification Failed"})
    }
}
