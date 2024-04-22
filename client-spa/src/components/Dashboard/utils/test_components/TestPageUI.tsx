import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon} from 'react-icons/bs';
import {PiFlagThin} from 'react-icons/pi';
import { useParams } from 'react-router-dom';

interface Question{
  id: number;
  name: string;
  context: string;
  query: string;
  options: {
    [key: string]: string
  }
}

const TestPageUI = () => {
  const [selectedChoice, setSelectedChoice] = React.useState<string | null>(null);
  const answerChoices = [
    {
      label: 'A',
      content: 'the participants in the experiment that demonstrated the lotion’s efficacy were recruited from a pool of people with more painful injuries than were the participants in the other experiment.'
    },
    {
      label: 'B',
      content: 'in the experiment that demonstrated the lotion’s efficacy, participants were told that the lotion contained strong painkillers, whereas the participants in the other experiment were given no information about the lotion’s ingredients.'
    },
    {
      label: 'C',
      content: 'the researchers conducting the experiment that demonstrated the lotion’s efficacy gave study participants a smaller amount of lotion than the researchers in the other experiment did.'
    },
    {
      label: 'D',
      content: 'participants in the experiment that demonstrated the lotion’s efficacy received more medical assistance in treating their injuries in addition to using the lotion.'
    }
  ];
  const handlePreviousQuestion = () => {
    console.log("Go to the previous question");
    // Implement your logic for going to the previous question
  };

  const handleNextQuestion = () => {
    console.log("Go to the next question");
    // Implement your logic for going to the next question
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  };

  const darkModeClass = isDarkMode ? 'dark' : '';

  // const {testId, sectionId, sectionName} = useParams<{testId: string, sectionId: string, sectionName: string}>();
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // const [questions, setQuestions] = useState<Question[]>([]);


  // useEffect(()=> {
  //   fetch(`http://127.0.0.1:8080/api/test/testsections/${sectionId}/questions/`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log("Fetching the questions: ", data)
  //     setQuestions(data)
  //   })
  //   .catch((error)=> console.error(`Error fetching testsection questions with id ${sectionId}`, error))
  // }, [])



  // const handleAnswerClick = (choice: string) => {
  //   setSelectedAnswer(choice);
  // };

  // const handleNextQuestion = () => {
  //   // Move to the next question if not on the last question
  //   if (currentQuestionIndex < questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //     setSelectedAnswer(null); // Reset selected answer for the next question
  //   }
  // };
  // const handlePreviousQuestion = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex(currentQuestionIndex - 1);
  //     setSelectedAnswer(null);
  //   }
  // };

  return (
    <div className={`w-full h-screen flex flex-col ${darkModeClass}`}>
      <div className='flex p-5 justify-between items-center'>
        <div className='mx-5 flex gap-10 items-center'>
          <p className='text-bold font-ubuntu text-2xl'>English and Writing Module 1</p>
          <button onClick={toggleDarkMode} className="text-lg p-3 border-2 rounded-2xl hover:bg-[#00df9a] hover:border-blue-500">
            <BsMoon />
          </button>
        </div>
        <div className='flex justify-end items-center gap-5'>
          <p className='font-semibold text-lg'>13:04</p>
          <button className='py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg'>Exit</button>
        </div>
      </div>
      <hr className="border-gray-300 border-[1px]"/>
      <div className='flex flex-grow'>
        <div className='w-[50%] border-r-2'>
          <div className="p-14">
            <p className='font-medium text-lg'>
            	Studies have shown that people’s perception of pain can be diminished and their healing processes accelerated if those individuals believe that a medical treatment will be helpful. In an experiment testing the efficacy of an experimental analgesic lotion for treating minor scrapes and burns, researchers found that the lotion did not appear to significantly affect participants’ pain levels or healing times. However, a similar experiment found that the same lotion led to significant reductions in the pain level of study participants and resulted in faster healing. The difference in the outcomes of the two experiments was likely due to the fact that _______
            </p>
          </div>
        </div>
        <div className='w-[50%]'>
          <div className='p-14'>
            <div className='flex gap-2 items-center'>
              <p className='font-bold text-lg'>Question 1 of 33</p>
              <span><PiFlagThin size={30}/></span>
            </div>
            <p className='font-medium text-lg mt-3'>Which choice most logically completes the text?</p>
            <div className='flex flex-col mt-7 gap-2'>
            {answerChoices.map((choice, index) => (
              <button
                key={index}
                className={`py-2 px-4 border-2 rounded-lg font-semibold text-lg w-full text-left 
                            ${selectedChoice === choice.label ? 'border-[#00df9a]' : 'hover:border-blue-500'}`}
                onClick={() => setSelectedChoice(choice.label)}
              >
                {`(${choice.label})`} {choice.content}
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5">
        <button 
          onClick={handlePreviousQuestion}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
        </button>
        <button 
          onClick={handleNextQuestion}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          Next <BsFillArrowRightCircleFill className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TestPageUI;

