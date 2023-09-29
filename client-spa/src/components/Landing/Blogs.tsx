import React, {useState, useEffect} from 'react'
import MathPic from '../assets/math.jpg'
import { Link } from 'react-router-dom';

interface BlogPost {
    id: number;
    title: string;
    reading_time: number;
    pub_date: string;
    description:string;
    tags: string[];
}

const Blogs = () => {

    const [data, setData] = useState<BlogPost[]>([]);

    useEffect(()=> {
        fetch('http://127.0.0.1:8080/api/blogpost/blogposts')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data', data);
            setData(data)
            console.log(data)})
        .catch((error)=> console.error('Error fetching data: ', error))
    },[])

  return (
    <div className='w-full h-full'>
        <div className='max-w-[1240px] mx-auto items-center'>
            <h1 className='p-10 text-center font-bold text-4xl text-[#00df9a]'>Blogs</h1>
            <div className='flex flex-col gap-5' >
                {data && data.map((blog) => (
                <div key={blog.id} className='my-2 grid md:grid-cols-2 items-center shadow-lg bg-white rounded-md'>
                    <div className='mx-5 flex flex-col gap-2'>
                        <Link to={`/blogs/${blog.id}`}>
                            <h1 className='font-bold text-2xl'>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </Link>
                        <div className='flex flex-row gap-2 items-center'>
                                <p>{blog.pub_date}</p>
                                <p className='text-gray-800 text-3xl font-bold'>·</p>
                                <p>{blog.reading_time} min read</p>
                        </div>
                    </div>
                    <Link to={`/blogs/${blog.id}`}><img className='w-[300px] mx-5 my-3' src={MathPic} alt="" /></Link>
                </div>))}
            </div>
        </div>
    </div>
  )
}

export default Blogs;