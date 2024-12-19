
import { NextRequest, NextResponse } from 'next/server'
import connectDB from "../../../database/db"
import portfolioSchema from "../../../database/portfolioSchema"

type IParams = {
		params: {
			slug: string
		}
}

// After this change I would need to add the thing back into the database. 

export async function GET(req: NextRequest, { params }: IParams) {
    await connectDB()
		const { slug } = params 
	   try {
	        const blog = await portfolioSchema.findOne({ slug }).orFail()
	        return NextResponse.json(blog)
	    } catch (err) {
	        return NextResponse.json('Blog not found.', { status: 404 })
	    }
}
