import React, { useEffect, useState } from 'react'
import pic1 from '../assets/exam.jpg'
import pic2 from '../assets/topic_based_questions.png'
import pic4 from '../assets/Mathematics-bro.png'

interface Test{
    id:number;
    name: string;
}

const APT = () => {

    const [tests, setTests] = useState<Test[]>([]);

    useEffect(()=> {
        fetch('http://127.0.0.1:8080/api/test/tests')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data: ", data)
            setTests(data)
        })
        .catch((error)=> console.error("Error fetching tests: ", error))
    }, [])

  return (
    <div className='h-full w-full'>
        <div className='max-w-[1450px] mx-auto'>
        <p className='p-5 text-4xl font-bold text-center text-[#00df9a]'>Authentic Practice Tests</p>
            <div className='my-24 grid lg:grid-cols-3 gap-10'>
                {tests && tests.map((test, index) => (
                <div key={index} className=' bg-white border-dashed border-cyan-100 rounded-2xl items-center shadow-lg hover:scale-105 duration-300'>
                    <p className='text-center p-4 text-xl font-bold'>Test {test.id}</p>
                    <hr />
                    <img className='w-full' src={pic1} alt="" />
                    <p className='text-center mx-24 p-3 font-medium rounded-xl bg-green-500'>Get Started</p>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default APT