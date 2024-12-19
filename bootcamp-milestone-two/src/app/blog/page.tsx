import Head from 'next/head';
import BlogPreview from '../components/blogPreview';
import connectDB from '../database/db';
import blogSchema from '../database/blogSchema';
import Link from 'next/link';
import _Blog from '../database/blogSchema';

const blogs = await getBlogs();

export default function Blog() {
  return (
    <div>
      <Head>
        <title className='title'> Blog Page </title>
      </Head>

      <h1 className='title'>Blog</h1>

      {blogs &&
        blogs.map((blog) => (
          <Link href={`/blog/${blog.slug}`} key={blog.slug}>
            <BlogPreview 
              title={blog.title}
              description={blog.description}
              date={blog.date}
            />
          </Link>
        ))}
    </div>
  );
}

async function getBlogs() {
  await connectDB();

  try {
    const blogs = await _Blog.find().sort({ date: -1 }).orFail();
    return blogs;
  } catch (err) {
    return null;
  }
}
