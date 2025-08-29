"use server"
// app/api/auth/[...nextauth]/route.js (or route.ts)
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

import User from '@/app/models/User';
import connectDB from '@/db/connectDb';
import Payment from '@/app/models/Payment';
import mongoose from 'mongoose';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    
    if(account.provider === "github"){
      // we can check for email or we can check for the username
      // if(profile.email_verified && profile.email.endsWith("@example.com")) 
      await connectDB()
      const currentUser= await User.findOne({email: email})
      
      if(!currentUser){
        const newUser = await  User.create({
          name: user.name,
          email: user.email,
          
          username: user.email.split("@")[0],
        })
        
       
        user.name=newUser.username
      }
      
      
      return true
  }
},
  async session({session,user,token}){
  const dbUser = await User.findOne({email:session.user.email})
  
  session.user.name=dbUser.username
  return session
}
}
})

export { handler as GET, handler as POST };
