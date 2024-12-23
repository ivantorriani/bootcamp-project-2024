import Head from 'next/head';
import BlogPreview from '../components/blogPreview';
import connectDB from '../database/db';
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
              date={new Date(blog.date).toLocaleDateString()}
              image = {blog.image}
            />
          </Link>
        ))}
    </div>
  );
}

async function getBlogs() {
  await connectDB();
  const blogs = await _Blog.find().sort({ date: -1 }).orFail();
  return blogs;

}
