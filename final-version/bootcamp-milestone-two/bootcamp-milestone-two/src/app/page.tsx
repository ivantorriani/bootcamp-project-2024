import Head from 'next/head';
import BlogPreview from './components/blogPreview';
import blogs from './blogData';
import Image from 'next/image';
import styles from './homepage.module.css'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Ivan Torriani's website</title>
      </Head>

      <main>
        <div className="container">
          <Image src="/me.jpg" alt="Picture of me" width={500} height={500} className = 'profile' />
          <div className="about-text">
            <p className= {styles.typingeffect}><strong>Hello! My name is Ivan Torriani. </strong></p>
            <p>
             <em> Welcome to my website!</em> I'm from San Diego, California, and I'm currently a freshman at Cal Poly. I'm super passionate about the field of AI/ML and am super excited about all it's applications in not only engineering, but literature and polotics. Apart from school, I love to run, read, and work on anything collaboratively. In the future, I want to either pursue a career in Computer Science or go to law school.  
            </p>
            <p> <strong> Want to get in touch? </strong> <em> Visit the contact page! </em></p>
          
            
            
          </div>
        </div>

      </main>

    </div>
  );
}
