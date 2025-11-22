import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
    try {
        // Test database connection with a simple query
        const accounts = await prisma.account.findMany();
        return NextResponse.json({ 
            success: true, 
            message: "Database connection successful", 
            accountCount: accounts.length 
        });
    } catch (err: any) {
        return NextResponse.json({ 
            success: false, 
            error: err.message 
        }, { status: 500 });
    }
}
