import { useParams, useNavigate } from "react-router-dom";
import React, {useState} from "react";
import { AiOutlineClose } from 'react-icons/ai'; 
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsMoon} from 'react-icons/bs';
import MiniTestModal from "./utils/test_components/MiniTestModal";
interface ParagraphProps {
  text: string | null;
  isHighlighted?: boolean; // New prop to indicate highlighting
}

const Paragraph: React.FC<ParagraphProps> = ({ text, isHighlighted = false }) => {
  return (
    <p className={`text-xl leading-relaxed max-w-prose mx-auto text-indent ${isHighlighted ? "bg-slate-200 rounded-xl p-4 text-black " : ""}`} style={{ marginBottom: '30px' }}>
      {text}
    </p>
  );
};
  
interface SubSection {
  id: string;
  title: string;
  content: string;
}

interface SectionData {
  id: string;
  title: string;
  completed: boolean;
  content: string;
  subSections?: SubSection[];
}
  
export const sections: SectionData[] = [
    {
      id: 'command of evidence',
      title: 'Command of Evidence',
      completed: false,
      content: `Command of Evidence`,
      subSections: [
        {
          id: 'sample-subsection-1',
          title: 'Sample Subsection 1',
          content: `Text Details Tutorial:

          Solving reading comprehension questions, especially those that focus on understanding the main idea, determining the author's purpose, or interpreting specific details, requires careful reading and analytical thinking. Here are some general tips and strategies, followed by detailed explanations for a sample question.
          
          important General Tips and Tricks 1. **Read the Question First:** This helps you know what to look for when you read the passage. 
          
          2. **Skim the Passage:** Get a general sense of the passage's content and structure before diving into the details. Identify the main idea, author’s tone, and the purpose of the passage.
          
          3. **Highlight or Note Key Information:** While reading, pay attention to names, dates, places, any stated opinions or arguments, and changes in topic or tone.
          
          4. **Eliminate Clearly Wrong Answers:** Often, some options can be dismissed right away if they contradict the passage or are irrelevant.
          
          5. **Look for Direct Evidence:** The correct answer must be supported by information directly stated or clearly implied in the passage.
          
          6. **Consider the Context:** For questions that require interpretation, consider the broader context of the cited lines or paragraphs. How do they fit into the passage as a whole?
          
          7. **Beware of Extremes:** Answers that use absolute words like "always," "never," "all," and "none" are often incorrect, unless the passage uses similar absolutes.
          
          8. **Check Your Assumptions:** Ensure your answer choice is based on the passage's content, not outside knowledge or personal opinions.
          
          ### Sample Question with Detailed Explanation:
          
          **Passage:**
          **"In the Shadow of the Eclipse," a novel set during the tumultuous period of a solar eclipse that alters the course of a kingdom, follows the journey of a young seer named Eliana. "As the eclipse cast its shadow over the land, Eliana's visions grew clearer, revealing paths woven with destiny and peril. 'An eclipse is not merely an alignment of celestial bodies,' she mused, gazing into the darkened sky, 'it is a confluence of past, present, and future, a moment when fate can be shifted.' Her role in the kingdom's future was to decipher these omens, guiding those who hold power towards light or darkness."
          
          important **Question:** What is Eliana's perspective on the eclipse?

          A) It is a natural phenomenon that interests her scientifically 
          B) It is a harbinger of chaos and destruction for the kingdom.
          C) It is a pivotal event that holds the power to alter destinies.
          D) It is a curse that has been brought upon the land by enemies.
          
          **Explanation:**
          
          1. **Eliminate A:** While the passage mentions celestial bodies, Eliana’s focus isn’t scientific interest but the impact on fate and destiny.
          
          2. **Eliminate B and D:** The passage doesn’t mention chaos, destruction, or curses. These choices introduce ideas not supported by the text.
          
          3. **Identify Key Phrases:** Eliana views the eclipse as “a moment when fate can be shifted,” indicating its significance in changing destinies.
          
          4. **Choose C:** This choice is directly supported by Eliana’s thoughts on the eclipse’s power to alter the future, making it the correct answer.
          
          By following these steps, emphasizing direct evidence and context, and eliminating unsupported answers, you can more accurately and confidently answer reading comprehension questions.
          
          Let's tackle this request by creating single-passage-based questions with a focus on detailed explanations for the answer choices, following the guideline of one passage per question.
          `
        },
        {
          id: 'sample-subsection-2',
          title: 'Sample Subsection 2',
          content: `Text Details Tutorial:

          Solving reading comprehension questions, especially those that focus on understanding the main idea, determining the author's purpose, or interpreting specific details, requires careful reading and analytical thinking. Here are some general tips and strategies, followed by detailed explanations for a sample question.
          
          ### General Tips and Tricks:
          
          1. **Read the Question First:** This helps you know what to look for when you read the passage. 
          
          2. **Skim the Passage:** Get a general sense of the passage's content and structure before diving into the details. Identify the main idea, author’s tone, and the purpose of the passage.
          
          3. **Highlight or Note Key Information:** While reading, pay attention to names, dates, places, any stated opinions or arguments, and changes in topic or tone.
          
          4. **Eliminate Clearly Wrong Answers:** Often, some options can be dismissed right away if they contradict the passage or are irrelevant.
          
          5. **Look for Direct Evidence:** The correct answer must be supported by information directly stated or clearly implied in the passage.
          
          6. **Consider the Context:** For questions that require interpretation, consider the broader context of the cited lines or paragraphs. How do they fit into the passage as a whole?
          
          7. **Beware of Extremes:** Answers that use absolute words like "always," "never," "all," and "none" are often incorrect, unless the passage uses similar absolutes.
          
          8. **Check Your Assumptions:** Ensure your answer choice is based on the passage's content, not outside knowledge or personal opinions.
          
          ### Sample Question with Detailed Explanation:
          
          **Passage:**
          "In the Shadow of the Eclipse," a novel set during the tumultuous period of a solar eclipse that alters the course of a kingdom, follows the journey of a young seer named Eliana. "As the eclipse cast its shadow over the land, Eliana's visions grew clearer, revealing paths woven with destiny and peril. 'An eclipse is not merely an alignment of celestial bodies,' she mused, gazing into the darkened sky, 'it is a confluence of past, present, and future, a moment when fate can be shifted.' Her role in the kingdom's future was to decipher these omens, guiding those who hold power towards light or darkness."
          
          **Question:**
          What is Eliana's perspective on the eclipse?
          
          A) It is a natural phenomenon that interests her scientifically.
          B) It is a harbinger of chaos and destruction for the kingdom.
          C) It is a pivotal event that holds the power to alter destinies.
          D) It is a curse that has been brought upon the land by enemies.
          
          **Explanation:**
          
          1. **Eliminate A:** While the passage mentions celestial bodies, Eliana’s focus isn’t scientific interest but the impact on fate and destiny.
          
          2. **Eliminate B and D:** The passage doesn’t mention chaos, destruction, or curses. These choices introduce ideas not supported by the text.
          
          3. **Identify Key Phrases:** Eliana views the eclipse as “a moment when fate can be shifted,” indicating its significance in changing destinies.
          
          4. **Choose C:** This choice is directly supported by Eliana’s thoughts on the eclipse’s power to alter the future, making it the correct answer.
          
          By following these steps, emphasizing direct evidence and context, and eliminating unsupported answers, you can more accurately and confidently answer reading comprehension questions.
          
          Let's tackle this request by creating single-passage-based questions with a focus on detailed explanations for the answer choices, following the guideline of one passage per question.
          `,
        },
        {
          id: 'sample-subsection-3',
          title: 'Sample Subsection 3',
          content: `Text Details Tutorial:

          Solving reading comprehension questions, especially those that focus on understanding the main idea, determining the author's purpose, or interpreting specific details, requires careful reading and analytical thinking. Here are some general tips and strategies, followed by detailed explanations for a sample question.
          
          ### General Tips and Tricks:
          
          1. **Read the Question First:** This helps you know what to look for when you read the passage. 
          
          2. **Skim the Passage:** Get a general sense of the passage's content and structure before diving into the details. Identify the main idea, author’s tone, and the purpose of the passage.
          
          3. **Highlight or Note Key Information:** While reading, pay attention to names, dates, places, any stated opinions or arguments, and changes in topic or tone.
          
          4. **Eliminate Clearly Wrong Answers:** Often, some options can be dismissed right away if they contradict the passage or are irrelevant.
          
          5. **Look for Direct Evidence:** The correct answer must be supported by information directly stated or clearly implied in the passage.
          
          6. **Consider the Context:** For questions that require interpretation, consider the broader context of the cited lines or paragraphs. How do they fit into the passage as a whole?
          
          7. **Beware of Extremes:** Answers that use absolute words like "always," "never," "all," and "none" are often incorrect, unless the passage uses similar absolutes.
          
          8. **Check Your Assumptions:** Ensure your answer choice is based on the passage's content, not outside knowledge or personal opinions.
          
          ### Sample Question with Detailed Explanation:
          
          **Passage:**
          "In the Shadow of the Eclipse," a novel set during the tumultuous period of a solar eclipse that alters the course of a kingdom, follows the journey of a young seer named Eliana. "As the eclipse cast its shadow over the land, Eliana's visions grew clearer, revealing paths woven with destiny and peril. 'An eclipse is not merely an alignment of celestial bodies,' she mused, gazing into the darkened sky, 'it is a confluence of past, present, and future, a moment when fate can be shifted.' Her role in the kingdom's future was to decipher these omens, guiding those who hold power towards light or darkness."
          
          **Question:**
          What is Eliana's perspective on the eclipse?
          
          A) It is a natural phenomenon that interests her scientifically.
          B) It is a harbinger of chaos and destruction for the kingdom.
          C) It is a pivotal event that holds the power to alter destinies.
          D) It is a curse that has been brought upon the land by enemies.
          
          **Explanation:**
          
          1. **Eliminate A:** While the passage mentions celestial bodies, Eliana’s focus isn’t scientific interest but the impact on fate and destiny.
          
          2. **Eliminate B and D:** The passage doesn’t mention chaos, destruction, or curses. These choices introduce ideas not supported by the text.
          
          3. **Identify Key Phrases:** Eliana views the eclipse as “a moment when fate can be shifted,” indicating its significance in changing destinies.
          
          4. **Choose C:** This choice is directly supported by Eliana’s thoughts on the eclipse’s power to alter the future, making it the correct answer.
          
          By following these steps, emphasizing direct evidence and context, and eliminating unsupported answers, you can more accurately and confidently answer reading comprehension questions.
          
          Let's tackle this request by creating single-passage-based questions with a focus on detailed explanations for the answer choices, following the guideline of one passage per question.
          `,
        },
        // Add more subsections as needed
      ]
    },
    {
      id: 'central ideas and purpose',
      title: 'Central Ideas and Details',
      completed: false,
      content: ''
    },
    {
      id: 'inferences',
      title: 'Inferences',
      completed: false,
      content: ''
    },
    {
      id: 'text structure and purpose',
      title: 'Text Structure and Purpose',
      completed: false,
      content: ''
    },
    {
      id: 'cross-text connections',
      title: 'Cross-Text Connections',
      completed: false,
      content: ''
    },{
      id: 'inferences',
      title: 'Inferences',
      completed: false,
      content: ''
    },
    {
      id: 'text structure and purpose',
      title: 'Text Structure and Purpose',
      completed: false,
      content: ''
    },
    {
      id: 'cross-text connections',
      title: 'Cross-Text Connections',
      completed: false,
      content: ''
    },{
      id: 'inferences',
      title: 'Inferences',
      completed: false,
      content: ''
    },
    {
      id: 'text structure and purpose',
      title: 'Text Structure and Purpose',
      completed: false,
      content: ''
    },
    {
      id: 'cross-text connections',
      title: 'Cross-Text Connections',
      completed: false,
      content: '',
      subSections: [
        {
          id: 'sample-subsection-1',
          title: 'Sample Subsection 1',
          content: `Text Details Tutorial:

          Solving reading comprehension questions, especially those that focus on understanding the main idea, determining the author's purpose, or interpreting specific details, requires careful reading and analytical thinking. Here are some general tips and strategies, followed by detailed explanations for a sample question.
          
          ### General Tips and Tricks:
          
          1. **Read the Question First:** This helps you know what to look for when you read the passage. 
          
          2. **Skim the Passage:** Get a general sense of the passage's content and structure before diving into the details. Identify the main idea, author’s tone, and the purpose of the passage.
          
          3. **Highlight or Note Key Information:** While reading, pay attention to names, dates, places, any stated opinions or arguments, and changes in topic or tone.
          
          4. **Eliminate Clearly Wrong Answers:** Often, some options can be dismissed right away if they contradict the passage or are irrelevant.
          
          5. **Look for Direct Evidence:** The correct answer must be supported by information directly stated or clearly implied in the passage.
          
          6. **Consider the Context:** For questions that require interpretation, consider the broader context of the cited lines or paragraphs. How do they fit into the passage as a whole?
          
          7. **Beware of Extremes:** Answers that use absolute words like "always," "never," "all," and "none" are often incorrect, unless the passage uses similar absolutes.
          
          8. **Check Your Assumptions:** Ensure your answer choice is based on the passage's content, not outside knowledge or personal opinions.
          
          ### Sample Question with Detailed Explanation:
          
          **Passage:**
          "In the Shadow of the Eclipse," a novel set during the tumultuous period of a solar eclipse that alters the course of a kingdom, follows the journey of a young seer named Eliana. "As the eclipse cast its shadow over the land, Eliana's visions grew clearer, revealing paths woven with destiny and peril. 'An eclipse is not merely an alignment of celestial bodies,' she mused, gazing into the darkened sky, 'it is a confluence of past, present, and future, a moment when fate can be shifted.' Her role in the kingdom's future was to decipher these omens, guiding those who hold power towards light or darkness."
          
          **Question:**
          What is Eliana's perspective on the eclipse?
          
          A) It is a natural phenomenon that interests her scientifically.
          B) It is a harbinger of chaos and destruction for the kingdom.
          C) It is a pivotal event that holds the power to alter destinies.
          D) It is a curse that has been brought upon the land by enemies.
          
          **Explanation:**
          
          1. **Eliminate A:** While the passage mentions celestial bodies, Eliana’s focus isn’t scientific interest but the impact on fate and destiny.
          
          2. **Eliminate B and D:** The passage doesn’t mention chaos, destruction, or curses. These choices introduce ideas not supported by the text.
          
          3. **Identify Key Phrases:** Eliana views the eclipse as “a moment when fate can be shifted,” indicating its significance in changing destinies.
          
          4. **Choose C:** This choice is directly supported by Eliana’s thoughts on the eclipse’s power to alter the future, making it the correct answer.
          
          By following these steps, emphasizing direct evidence and context, and eliminating unsupported answers, you can more accurately and confidently answer reading comprehension questions.
          
          Let's tackle this request by creating single-passage-based questions with a focus on detailed explanations for the answer choices, following the guideline of one passage per question.
          `
        },
        {
          id: 'sample-subsection-2',
          title: 'Sample Subsection 2',
          content: `Text Details Tutorial:

          Solving reading comprehension questions, especially those that focus on understanding the main idea, determining the author's purpose, or interpreting specific details, requires careful reading and analytical thinking. Here are some general tips and strategies, followed by detailed explanations for a sample question.
          
          ### General Tips and Tricks:
          
          1. **Read the Question First:** This helps you know what to look for when you read the passage. 
          
          2. **Skim the Passage:** Get a general sense of the passage's content and structure before diving into the details. Identify the main idea, author’s tone, and the purpose of the passage.
          
          3. **Highlight or Note Key Information:** While reading, pay attention to names, dates, places, any stated opinions or arguments, and changes in topic or tone.
          
          4. **Eliminate Clearly Wrong Answers:** Often, some options can be dismissed right away if they contradict the passage or are irrelevant.
          
          5. **Look for Direct Evidence:** The correct answer must be supported by information directly stated or clearly implied in the passage.
          
          6. **Consider the Context:** For questions that require interpretation, consider the broader context of the cited lines or paragraphs. How do they fit into the passage as a whole?
          
          7. **Beware of Extremes:** Answers that use absolute words like "always," "never," "all," and "none" are often incorrect, unless the passage uses similar absolutes.
          
          8. **Check Your Assumptions:** Ensure your answer choice is based on the passage's content, not outside knowledge or personal opinions.
          
          ### Sample Question with Detailed Explanation:
          
          **Passage:**
          "In the Shadow of the Eclipse," a novel set during the tumultuous period of a solar eclipse that alters the course of a kingdom, follows the journey of a young seer named Eliana. "As the eclipse cast its shadow over the land, Eliana's visions grew clearer, revealing paths woven with destiny and peril. 'An eclipse is not merely an alignment of celestial bodies,' she mused, gazing into the darkened sky, 'it is a confluence of past, present, and future, a moment when fate can be shifted.' Her role in the kingdom's future was to decipher these omens, guiding those who hold power towards light or darkness."
          
          **Question:**
          What is Eliana's perspective on the eclipse?
          
          A) It is a natural phenomenon that interests her scientifically.
          B) It is a harbinger of chaos and destruction for the kingdom.
          C) It is a pivotal event that holds the power to alter destinies.
          D) It is a curse that has been brought upon the land by enemies.
          
          **Explanation:**
          
          1. **Eliminate A:** While the passage mentions celestial bodies, Eliana’s focus isn’t scientific interest but the impact on fate and destiny.
          
          2. **Eliminate B and D:** The passage doesn’t mention chaos, destruction, or curses. These choices introduce ideas not supported by the text.
          
          3. **Identify Key Phrases:** Eliana views the eclipse as “a moment when fate can be shifted,” indicating its significance in changing destinies.
          
          4. **Choose C:** This choice is directly supported by Eliana’s thoughts on the eclipse’s power to alter the future, making it the correct answer.
          
          By following these steps, emphasizing direct evidence and context, and eliminating unsupported answers, you can more accurately and confidently answer reading comprehension questions.
          
          Let's tackle this request by creating single-passage-based questions with a focus on detailed explanations for the answer choices, following the guideline of one passage per question.
          `,
        },
        {
          id: 'sample-subsection-3',
          title: 'Sample Subsection 3',
          content: `Text Details Tutorial:

          Solving reading comprehension questions, especially those that focus on understanding the main idea, determining the author's purpose, or interpreting specific details, requires careful reading and analytical thinking. Here are some general tips and strategies, followed by detailed explanations for a sample question.
          
          ### General Tips and Tricks:
          
          1. **Read the Question First:** This helps you know what to look for when you read the passage. 
          
          2. **Skim the Passage:** Get a general sense of the passage's content and structure before diving into the details. Identify the main idea, author’s tone, and the purpose of the passage.
          
          3. **Highlight or Note Key Information:** While reading, pay attention to names, dates, places, any stated opinions or arguments, and changes in topic or tone.
          
          4. **Eliminate Clearly Wrong Answers:** Often, some options can be dismissed right away if they contradict the passage or are irrelevant.
          
          5. **Look for Direct Evidence:** The correct answer must be supported by information directly stated or clearly implied in the passage.
          
          6. **Consider the Context:** For questions that require interpretation, consider the broader context of the cited lines or paragraphs. How do they fit into the passage as a whole?
          
          7. **Beware of Extremes:** Answers that use absolute words like "always," "never," "all," and "none" are often incorrect, unless the passage uses similar absolutes.
          
          8. **Check Your Assumptions:** Ensure your answer choice is based on the passage's content, not outside knowledge or personal opinions.
          
          ### Sample Question with Detailed Explanation:
          
          **Passage:**
          "In the Shadow of the Eclipse," a novel set during the tumultuous period of a solar eclipse that alters the course of a kingdom, follows the journey of a young seer named Eliana. "As the eclipse cast its shadow over the land, Eliana's visions grew clearer, revealing paths woven with destiny and peril. 'An eclipse is not merely an alignment of celestial bodies,' she mused, gazing into the darkened sky, 'it is a confluence of past, present, and future, a moment when fate can be shifted.' Her role in the kingdom's future was to decipher these omens, guiding those who hold power towards light or darkness."
          
          **Question:**
          What is Eliana's perspective on the eclipse?
          
          A) It is a natural phenomenon that interests her scientifically.
          B) It is a harbinger of chaos and destruction for the kingdom.
          C) It is a pivotal event that holds the power to alter destinies.
          D) It is a curse that has been brought upon the land by enemies.
          
          **Explanation:**
          
          1. **Eliminate A:** While the passage mentions celestial bodies, Eliana’s focus isn’t scientific interest but the impact on fate and destiny.
          
          2. **Eliminate B and D:** The passage doesn’t mention chaos, destruction, or curses. These choices introduce ideas not supported by the text.
          
          3. **Identify Key Phrases:** Eliana views the eclipse as “a moment when fate can be shifted,” indicating its significance in changing destinies.
          
          4. **Choose C:** This choice is directly supported by Eliana’s thoughts on the eclipse’s power to alter the future, making it the correct answer.
          
          By following these steps, emphasizing direct evidence and context, and eliminating unsupported answers, you can more accurately and confidently answer reading comprehension questions.
          
          Let's tackle this request by creating single-passage-based questions with a focus on detailed explanations for the answer choices, following the guideline of one passage per question.
          `,
        },
      ]
    }

  ]

  interface SectionProps {
    sectionId?: string;
    isDarkMode: boolean
  }

  const Section: React.FC<SectionProps> = (props) => {

    const [showMiniTest, setShowMiniTest] = useState(false);

    const { tutorialId, sectionId, subsectionId } = useParams();
    const navigate = useNavigate();
    const normalizedSectionId = sectionId?.replaceAll('-', ' ');
    const section = sections.find(s => s.id === normalizedSectionId);
    
    const currentSectionIndex = sections.findIndex(section => section.id === sectionId);
    const currentSubsectionIndex = subsectionId ? sections[currentSectionIndex]?.subSections?.findIndex(sub => sub.id === subsectionId) : -1;

    const navigateToSection = (index:number) => {
      const targetSection = sections[index];
      const targetPath = `/demo/tutorials/${tutorialId}/${targetSection.id}`;
      navigate(targetPath);
      window.scrollTo(0, 0);
    }

    const navigateToSubSection = (sectionIndex:number, subIndex:number) => {
      const targetSubsection = sections[sectionIndex]?.subSections?.[subIndex];
      if (targetSubsection) {
        const targetPath = `/demo/tutorials/${tutorialId}/${sections[sectionIndex].id}/${targetSubsection.id}`;
        navigate(targetPath);
        window.scrollTo(0, 0);
      }
    }

    const handlePreviousClick = () => {
      if (currentSubsectionIndex! > 0) {
          navigateToSubSection(currentSectionIndex, currentSubsectionIndex! - 1);
      } else if (currentSectionIndex > 0) {
          navigateToSection(currentSectionIndex - 1);
      }
    };

    const handleNextClick = () => {
      const subsectionCount = sections[currentSectionIndex]?.subSections?.length ?? 0;
      if (currentSubsectionIndex! >= 0 && currentSubsectionIndex! < subsectionCount - 1) {
          navigateToSubSection(currentSectionIndex, currentSubsectionIndex! + 1);
      } else if (currentSectionIndex < sections.length - 1) {
          navigateToSection(currentSectionIndex + 1);
      }
  };


    const modeClass = props.isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-gray-800';
    const subsection = subsectionId ? section?.subSections?.find(sub => sub.id.replaceAll(' ', '-') === subsectionId) : undefined;
  
    const contentToRender = subsection?.content;
    const titleToRender = subsection ? subsection.title : section?.title;
  

    return (
      <div className={`h-full  rounded-2xl ${modeClass}`}>
        <div className='flex flex-col gap-6 justify-center items-center p-10'>
          <p className='text-center text-3xl font-bold'>{titleToRender}</p>
        </div>
        <div className='py-5'>
          {contentToRender?.split('\n').map((paragraph, index) => {
            const isHighlighted = paragraph.includes("**");
            return <Paragraph key={index} text={paragraph} isHighlighted={isHighlighted} />;
          })}
        </div>
        <div className='p-5 flex justify-between items-center'>  
        <button 
          onClick={handlePreviousClick}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          <BsFillArrowLeftCircleFill className="inline mr-2" /> Previous
        </button>
          <button 
          onClick={() => setShowMiniTest(true)}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          Take a quick quiz
        </button>
        <button 
          onClick={handleNextClick}
          className="py-2 px-6 border-2 rounded-xl hover:bg-[#00df9a] hover:border-blue-500 hover:text-white font-semibold text-lg"
        >
          Next <BsFillArrowRightCircleFill className="inline ml-2" />
        </button>
        </div>
{/* 
      {showMiniTest && <MiniTestModal onClose={() => setShowMiniTest(false)} />} */}
          
      </div>
    );
  };
  
  export default Section;
