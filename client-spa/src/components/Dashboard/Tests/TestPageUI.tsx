import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { LuTimer } from 'react-icons/lu';
import { AiFillWarning } from 'react-icons/ai';
import { TbLetterA, TbLetterB, TbLetterC, TbLetterD } from 'react-icons/tb';
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

  const {testId, sectionId, sectionName} = useParams<{testId: string, sectionId: string, sectionName: string}>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);


  useEffect(()=> {
    fetch(`http://127.0.0.1:8080/api/test/testsections/${sectionId}/questions/`)
    .then(res => res.json())
    .then(data => {
      console.log("Fetching the questions: ", data)
      setQuestions(data)
    })
    .catch((error)=> console.error(`Error fetching testsection questions with id ${sectionId}`, error))
  }, [])



  const handleAnswerClick = (choice: string) => {
    setSelectedAnswer(choice);
  };

  const handleNextQuestion = () => {
    // Move to the next question if not on the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-200 pb-5">
      <div className="flex h-full max-w-[1600px] mx-auto flex-col p-2 gap-5">
        {/* Header */}
        <div className="flex flex-row bg-blue-100 border-slate-200 shadow-lg gap-4 rounded-lg w-full items-center justify-center p-4">
          <AiFillWarning size={25} />
          <p className="text-center font-medium text-xl">Important Updates</p>
        </div>
        
        {/* Timer and Navigation */}
        <div className="flex mt-5 items-center justify-between">
          <BsFillArrowLeftCircleFill size={35} className="cursor-pointer" onClick={handlePreviousQuestion} />
          <div className="items-center flex flex-row gap-2 border rounded-lg py-2 px-5 bg-slate-300">
            <LuTimer size={35} />
            <p className="font-medium text-lg">2:12</p>
          </div>
          <BsFillArrowRightCircleFill size={35} className="cursor-pointer" onClick={handleNextQuestion} />
        </div>
        
        {/* Question */}
        {currentQuestionIndex < questions.length && (
          <div className="w-full h-[60%] mt-5 flex flex-row gap-3">
            <div className="w-[50%] rounded-tl-2xl bg-slate-100 p-10">
              <p className="font-bold text-3xl text-purple-500">{sectionName}</p>
              <hr className="border-2" />
              <p className="mt-5 font-normal text-xl">{questions[currentQuestionIndex].context}</p>
            </div>
            <div className="w-[50%] rounded-tr-2xl bg-slate-100 p-10 gap-5">
              <div className="flex flex-row items-center font-normal text-lg gap-5">
                <p className="px-4 py-2 items-center bg-purple-500 text-white">{currentQuestionIndex + 1}</p>
                <p className=''>{questions[currentQuestionIndex].query}</p>
              </div>
              <hr className="border-2" />
              <div className="mt-10 flex flex-col gap-5">
                {Object.entries(questions[currentQuestionIndex].options).map(([choice, answerText]) => (
                  <div
                    key={choice}
                    className={`flex flex-row gap-5 hover:bg-purple-300 ${selectedAnswer === choice ? 'border-purple-500' : 'border-slate-200'} items-center cursor-pointer border-4 rounded-md`}
                    onClick={() => handleAnswerClick(choice)}
                  >
                    <span className={`ml-2 my-2 px-3 py-3 ${selectedAnswer === choice ? 'bg-green-300' : 'bg-slate-300'} items-center rounded-lg`}>

                    {choice === 'A' && <TbLetterA size={25} />}
                    {choice === 'B' && <TbLetterB size={25} />}
                    {choice === 'C' && <TbLetterC size={25} />}
                    {choice === 'D' && <TbLetterD size={25} />}

                    </span>
                    <p className="font-medium text-xl">{answerText}</p>
                  </div>
                ))}
                <p
                  className="ml-5 font-medium text-xl cursor-pointer"
                  onClick={() => setSelectedAnswer(null)}
                >
                  Clear
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex-grow bg-slate-100 rounded-br-2xl rounded-b-2xl p-5">
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold">Draft Section</p>
            <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-green-300 hover:text-purple-500 text-white">Save the question</button>
            <button className="text-lg font-bold">Calculator</button>
          </div>
          <div className="h-full rounded-lg border-4 p-3"></div>
        </div>
      </div>
    </div>
  );
};

export default TestPageUI;

