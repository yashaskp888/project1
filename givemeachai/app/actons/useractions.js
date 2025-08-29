"use server"
import React from 'react'
import connectDB from '@/db/connectDb'
import User from '@/app/models/User'
import Razorpay from 'razorpay'
import Payment from '@/app/models/Payment'


export const initiate = async (amount, to_user, paymenttform) => {
  await connectDB()
  let user=await User.findOne({username:to_user})
  let secret=await user.Razorsecret
  var instance = new Razorpay({ key_id: user.razorID, key_secret: secret })

 
  let options = {
    amount: Number.parseInt(amount),  // amount in the smallest currency unit
    currency: "INR",
  }
  let x = await instance.orders.create(options)
  await Payment.create({
    name: paymenttform.name,
    to_user: to_user,
    oid: x.id,
    amount: Number.parseInt(amount)/100,
    message: paymenttform.message
  })
  return x
} 

  export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
  }

  export const fetchpayments = async (username) => {
    await connectDB()
    let p= await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(4).lean()
    return p
  }

  export const updateuser = async (data, oldusername) => {
    await connectDB()
    const { name, email, phone, razorID,Razorsecret, username,coverPic,profilePic } = data;
    if (username && username !== oldusername) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return { error: 'Username already exists' };
      }
    }

    await User.updateOne({ email }, { name, email, phone, razorID,Razorsecret, username,coverPic,profilePic });

    return { success: true };
  };


