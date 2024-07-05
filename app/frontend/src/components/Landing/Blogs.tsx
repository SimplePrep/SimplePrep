import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Banket from "../assets/guy-lesson.jpg";

interface BlogPost {
  id: number;
  title: string;
  reading_time: number;
  pub_date: string;
  description: string;
  tags: string[];
}

// Helper function to format pub_date
const formatPubDate = (pubDate: string) => {
  const timeStampStr = pubDate;
  const timestamp = new Date(timeStampStr ?? '');

  return timestamp.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const Blogs = () => {
  const [data, setData] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/blogpost/blogposts')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data', data);
        setData(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
      },
    },
  };

  const ref1 = useRef(null);
  const controls1 = useAnimation();
  const inView1 = useInView(ref1, { once: true });

  useEffect(() => {
    if (inView1) {
      controls1.start('visible');
    }
  }, [controls1, inView1]);

  return (
    <div className="h-[90vp] relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <motion.div
        className="max-w-[1240px] mx-auto w-full items-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls1}
        ref={ref1}
      >
        <h1 className='p-10 text-center font-bold text-4xl text-[#00df9a]'></h1>
        {data.length > 0 ? (
          <div className='flex flex-col gap-5'>
            {data.map((blog) => (
              <motion.div
                key={blog.id}
                className='my-2 grid md:grid-cols-2 items-center shadow-lg bg-white rounded-md'
                variants={itemVariants}
              >
                <div className='mx-5 flex flex-col gap-2'>
                  <Link to={`/blogs/${blog.id}`}>
                    <h1 className='font-bold text-2xl text-gray-900'>{blog.title}</h1>
                    <p className='text-gray-700'>{blog.description}</p>
                  </Link>
                  <div className='flex flex-row gap-2 items-center text-gray-600'>
                    <p>{formatPubDate(blog.pub_date)}</p>
                    <p className='text-3xl font-bold leading-none'>·</p>
                    <p>{blog.reading_time} min read</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <h2 className='text-3xl font-bold text-gray-800'>Blogs Coming Soon, Stay Tuned!</h2>
            <p className='text-xl text-gray-600'>We are working on some exciting content. Check back later!</p>
          </div>
        )}
      </motion.div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}

export default Blogs;
