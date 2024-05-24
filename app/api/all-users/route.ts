import User from '@/models/user'
import { connectToDatabase } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    await connectToDatabase()
    const users = await User.find({})
    return NextResponse.json({ users })
}

