import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { BlogPost } from '../../models/blog';
import img1 from '../../assets/example2.png'

interface Props { 
  text: string | null;
}

const Paragraph: React.FC<Props> = ({text}) => {
  return (
    <p className="text-xl text-gray-800 font-serif leading-relaxed max-w-prose mx-auto text-indent"style={{ marginBottom: '30px' }}>
      {text}
    </p>
  )
}



const BlogPostDetails = () => {

  const {id} = useParams<{id: string}>();
  const [blog, setblog] = useState<BlogPost | null>(null); 

  useEffect(()=> {
    id && fetch(`http://127.0.0.1:8080/api/blogpost/blogposts/${id}`)
    .then(response => response.json())
    .then(data => {setblog(data)})
    .catch((error)=> console.error(`Error fetching blogpost with id ${id}`, error))
  }, [id])

    const paragraphs = blog?.content.split('\n');

    const timeStampStr = blog?.pub_date;
    const timestamp = new Date(timeStampStr ?? '');

    const formattedTimestamp = timestamp.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className='max-w-[1400px] mx-auto p-20 h-full'>
          <div className='flex flex-col gap-6  justify-center items-center'>
            <p className='text-center text-lg text-slate-500 font-medium'>Published {formattedTimestamp}</p>
            <p className='text-center text-3xl font-bold'>{blog?.title}</p>
            <p>Tags</p>
          </div>
          <div className ='flex p-20 items-center justify-center'>
            <img src={img1} alt="Sample Image" className="w-[700px] h-[400px]" />
          </div>
          <div className='px-40 py-5'>
            {paragraphs?.map((paragraph, index) => {
              console.log(index)
              return <Paragraph key={index} text={paragraph}/>
              })}
          </div>
    </div>
  )
}

export default BlogPostDetails