'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Comment from '../../components/Comment';


interface IComment {
  user: string;
  comment: string;
  time: string;
}

interface Blog {
  title: string;
  description: string;
  image: string;
  date: string;
  comments?: IComment[];
}

async function getBlog(slug: string) {
  const res = await fetch(`/api/blogs/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [user, setUser] = useState('');
  const [commentText, setCommentText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);


  useEffect(() => {
    async function fetchData() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);

      if (!resolvedParams.slug) {
        notFound();
        return;
      }

      const fetchedBlog = await getBlog(resolvedParams.slug);
      if (!fetchedBlog) {
        notFound();
        return;
      }

      setBlog(fetchedBlog);
      setComments(fetchedBlog.comments || []);
    }
    fetchData();
  }, [params]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentText) return;

    setIsSubmitting(true);

    const newComment = {
      user,
      comment: commentText,
      time: new Date().toISOString(),
    };

    if (slug) {
      await fetch(`/api/blogs/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });

      setComments((prev) => [...prev, newComment]);
      setUser('');
      setCommentText('');
    }
    setIsSubmitting(false);
  };

  if (!blog) return null;

  return (
    <div>
      {/* Blog Content */}
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      {blog.image && (
        <Image 
          src={blog.image} 
          alt={blog.title} 
          width={500} 
          height={300} 
        />
      )}
      <p>{new Date(blog.date).toLocaleDateString()}</p>

      {/* Comments Section */}
      <div>
        <h2>Comments</h2>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            comment={{ user: comment.user, comment: comment.comment, time: new Date(comment.time) }}
          />
        ))}

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Your name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Your comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Add Comment'}
          </button>
        </form>
      </div>
    </div>
  );
}
