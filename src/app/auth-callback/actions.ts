"use server"

import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"

export const getAuthStatus=async ()=>{
    const user=await currentUser()
    if(!user?.id || !user.primaryEmailAddress){
        throw new Error("Invalid user data")
    }
    const existingUser=await db.user.findFirst({
        where:{
            id:user.id
        }
    })
    if(!existingUser){
        await db.user.create({
            data:{
                id:user.id,
                email:user.primaryEmailAddress.emailAddress
            }
        })        
    }
    return {success:true}
}