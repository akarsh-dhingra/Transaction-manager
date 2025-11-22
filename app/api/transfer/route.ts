import { NextRequest,NextResponse } from "next/server";
import {prisma}  from "../../../lib/prisma"

export async function POST(req:NextRequest){
    try{
        const {fromId,toId,amount}=await req.json();
        const from = Number(fromId);
        const to = Number(toId);
        const amt = Number(amount);

        // Test DB responsiveness before transaction
        const test = await prisma.account.findMany({ take: 1 });
        console.log("DB test query result:", test);
        console.log("Starting transaction...");

        const result =await prisma.$transaction(async(tx:any)=>{
            const sender=await tx.account.findUnique({where:{id:from}});
            if (!sender) throw new Error("Sender not found");
            if (sender.balance < amt) throw new Error("Insufficient balance");

            await tx.account.update({
                where:{id:from},
                data:{balance:{decrement:amt}}
            })
            await tx.account.update({
                where:{id:to},
                data:{balance:{increment:amt}}
            })
            return { success: true };
        })
        return NextResponse.json(result);
    } catch(err:any){
        console.error("Transfer error:", err);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}