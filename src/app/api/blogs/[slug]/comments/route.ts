import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/database/db';
import _Blog from '@/app/database/blogSchema';


await connectDB();






export async function POST(req: NextRequest, context: { params: Promise<{ slug: string }> }) {
    
    const { slug } = await context.params;  
    

  try {
    const { user, comment, time } = await req.json();

    
    if (!user || !comment || !time) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }


    const parsedTime = new Date(time);
    if (isNaN(parsedTime.getTime())) {
      return NextResponse.json({ error: 'Invalid time format' }, { status: 400 });
    }

    
    const blog = await _Blog.findOneAndUpdate(
      { slug },
      { $push: { comments: { user, comment, time: parsedTime } } },
      { new: true } 
    );

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    
    return NextResponse.json({ success: true, comment: { user, comment, time: parsedTime } }, { status: 200 });
  } catch (error) {
    console.error('Error saving comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
