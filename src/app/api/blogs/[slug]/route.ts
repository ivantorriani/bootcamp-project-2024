import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../database/db';
import blogSchema from '../../../database/blogSchema';

export async function GET(
	req: NextRequest,
	context: any // Temporarily use 'any'
  ): Promise<NextResponse> {
	const { slug } = context.params;
	await connectDB();
	const blog = await blogSchema.findOne({ slug }).orFail();
	return NextResponse.json(blog);
  }
  