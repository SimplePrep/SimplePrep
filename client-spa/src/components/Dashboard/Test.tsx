import React, { useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { LuTimer } from 'react-icons/lu';
import { AiFillWarning } from 'react-icons/ai';
import { TbLetterA, TbLetterB, TbLetterC, TbLetterD } from 'react-icons/tb';



const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (choice: string) => {
    setSelectedAnswer(choice);
  };

  const handleNextQuestion = () => {
    // Move to the next question if not on the last question
    if (currentQuestionIndex < Questions.length - 1) {
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
        {currentQuestionIndex < Questions.length && (
          <div className="w-full h-[60%] mt-5 flex flex-row gap-3">
            <div className="w-[50%] rounded-tl-2xl bg-slate-100 p-10">
              <p className="font-bold text-3xl text-purple-500">{Questions[currentQuestionIndex].sectionName}</p>
              <hr className="border-2" />
              <p className="mt-5 font-medium text-xl">{Questions[currentQuestionIndex].context}</p>
            </div>
            <div className="w-[50%] rounded-tr-2xl bg-slate-100 p-10 gap-5">
              <p className="font-medium text-2xl">
                <span className="px-4 py-2 items-center bg-purple-500 text-white">{Questions[currentQuestionIndex].id}</span>
                {Questions[currentQuestionIndex].query}
              </p>
              <hr className="border-2" />
              <div className="mt-10 flex flex-col gap-5">
                {Object.entries(Questions[currentQuestionIndex].answers).map(([choice, answerText]) => (
                  <div
                    key={choice}
                    className={`flex flex-row gap-5 hover:bg-purple-300 ${selectedAnswer === choice ? 'border-purple-500' : 'border-slate-200'} items-center cursor-pointer border-4 rounded-md`}
                    onClick={() => handleAnswerClick(choice)}
                  >
                    <span className={`ml-2 my-2 px-3 py-3 ${selectedAnswer === choice ? 'bg-green-300' : 'bg-slate-300'} items-center rounded-lg`}>
                    {choice === 'choice1' && <TbLetterA size={30} />}
                    {choice === 'choice2' && <TbLetterB size={30} />}
                    {choice === 'choice3' && <TbLetterC size={30} />}
                    {choice === 'choice4' && <TbLetterD size={30} />}
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

export default Test;



const Questions = [
  {
    id: 1,
    sectionName: "Section 1: Reading and Writing",
    context: "To dye wool, Navajo (Diné) weaver Lillie Taylor uses plants and vegetables from Arizona, where she lives. For example, she achieved the deep reds and browns featured in her 2003 rug In the Path of the Four Seasons by using Arizona dock roots, drying and grinding them before mixing the powder with water to create a dye bath. To intensify the appearance of certain colors, Taylor also sometimes mixes in clay obtained from nearby soil.",
    query: "Which choice best states the main idea of the text?",
    answers: {
      choice1: "Reds and browns are not commonly featured inmost of Taylors rugs.",
      choice2: "In the Path of the Four Seasons is widely acclaimed for its many colors and innovative weaving techniques.",
      choice3: "Taylor draws on local resources in the approach she uses to dye wool.",
      choice4: "Taylor finds it difficult to locate Arizona dock root in the desert.",
    },
    answer: "C",
    explanation: "Key Explanation: Choice C is the best answer. The passage focuses on the idea that the artist Lillie Taylor uses resources such as plants and vegetables from where she lives in Arizona to make dyes for wool. "
    
  },
  {
    id: 2,
    sectionName: "Section 1: Reading and Writing",
    context: "Jan Gimsa, Robert Sleigh, and Ulrike Gimsa have hypothesized that the sail-like structure running down the back of the dinosaur Spinosaurus aegyptiacus improved the animal’s success in underwater pursuits of prey species capable of making quick, evasive movements. To evaluate their hypothesis, a second team of researchers constructed two battery-powered mechanical models of S. aegyptiacus, one with a sail and one without, and subjected the models to a series of identical tests in a water-filled tank.",
    query: "Which finding from the model tests, if true, would most strongly support Gimsa and colleagues’ hypothesis?",
    answers: {
      choice1: "The model with a sail took significantly longer to travel a specified distance while submerged than the model without a sail did.",
      choice2: "The model with a sail had significantly less battery power remaining after completing the tests than the model without a sail did.",
      choice3: "The model with a sail displaced significantly more water while submerged than the model without a sail did.",
      choice4: "The model with a sail took significantly less time to complete a sharp turn while submerged than the model without a sail did.",
    },
    answer: "D",
    explanation: "y Explanation: Choice D is the best answer. The passage states that Gimsa and colleagues’ hypothesis was that the sail-like structure on the back of Saegyptiacus enhanced the dinosaur’s ability to travel underwater to hunt down “prey species capable of making quick, evasive movements.” This choice’s finding would effectively support the hypothesis because it would indicate that the sail-like structure would enable a ",

  },
  {
    id: 3,
    sectionName: "Section 1: Reading and Writing",
    context: "To dye wool, Navajo (Diné) weaver Lillie Taylor uses plants and vegetables from Arizona, where she lives. For example, she achieved the deep reds and browns featured in her 2003 rug In the Path of the Four Seasons by using Arizona dock roots, drying and grinding them before mixing the powder with water to create a dye bath. To intensify the appearance of certain colors, Taylor also sometimes mixes in clay obtained from nearby soil.",
    query: "Which choice best states the main idea of the text?",
    answers: {
      choice1: "Reds and browns are not commonly featured inmost of Taylors rugs.",
      choice2: "In the Path of the Four Seasons is widely acclaimed for its many colors and innovative weaving techniques.",
      choice3: "Taylor draws on local resources in the approach she uses to dye wool.",
      choice4: "Taylor finds it difficult to locate Arizona dock root in the desert.",
    },
    answer: "C",
    explanation: "Key Explanation: Choice C is the best answer. The passage focuses on the idea that the artist Lillie Taylor uses resources such as plants and vegetables from where she lives in Arizona to make dyes for wool. "
    
  },
  {
    id: 4,
    sectionName: "Section 1: Reading and Writing",
    context: "Jan Gimsa, Robert Sleigh, and Ulrike Gimsa have hypothesized that the sail-like structure running down the back of the dinosaur Spinosaurus aegyptiacus improved the animal’s success in underwater pursuits of prey species capable of making quick, evasive movements. To evaluate their hypothesis, a second team of researchers constructed two battery-powered mechanical models of S. aegyptiacus, one with a sail and one without, and subjected the models to a series of identical tests in a water-filled tank.",
    query: "Which finding from the model tests, if true, would most strongly support Gimsa and colleagues’ hypothesis?",
    answers: {
      choice1: "The model with a sail took significantly longer to travel a specified distance while submerged than the model without a sail did.",
      choice2: "The model with a sail had significantly less battery power remaining after completing the tests than the model without a sail did.",
      choice3: "The model with a sail displaced significantly more water while submerged than the model without a sail did.",
      choice4: "The model with a sail took significantly less time to complete a sharp turn while submerged than the model without a sail did.",
    },
    answer: "D",
    explanation: "y Explanation: Choice D is the best answer. The passage states that Gimsa and colleagues’ hypothesis was that the sail-like structure on the back of Saegyptiacus enhanced the dinosaur’s ability to travel underwater to hunt down “prey species capable of making quick, evasive movements.” This choice’s finding would effectively support the hypothesis because it would indicate that the sail-like structure would enable a ",

  },
]