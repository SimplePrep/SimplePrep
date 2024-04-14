import { useParams } from "react-router-dom";
import React from "react";

interface ParagraphProps { 
    text: string | null;
  }
  
  const Paragraph: React.FC<ParagraphProps> = ({text}) => {
    return (
      <p className="text-xl text-gray-800 font-serif leading-relaxed max-w-prose mx-auto text-indent"style={{ marginBottom: '30px' }}>
        {text}
      </p>
    )
  }
  
export const sections = [
    {
      id: 'command of evidence',
      title: 'Command of Evidence',
      completed: false,
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
      
      ### Sample Question 1
      #### Passage:
      In a small coastal town, an ancient lighthouse stands at the edge of a cliff, guiding ships away from treacherous rocks. The lighthouse keeper, Mr. Alcott, has devoted his life to ensuring the light never dims. One stormy night, with lightning fracturing the sky, a ship dangerously close to the rocks sends out a distress signal. Mr. Alcott, despite the raging storm, manages to keep the light burning, guiding the ship to safety.
      
      #### Question:
      What does the passage mainly illustrate about Mr. Alcott?
      
      A) His loneliness as a lighthouse keeper.
      B) His dedication to his responsibility.
      C) His fear of storms.
      D) His desire to leave the coastal town.
      
      #### Detailed Explanation:
      
      - **A)** The passage mentions Mr. Alcott's role and his actions during a storm but does not discuss his feelings of loneliness.
      - **B)** The correct answer is supported by the passage describing how Mr. Alcott ensures the lighthouse light never dims and his actions during the storm to guide a ship to safety, demonstrating his dedication to his duty.
      - **C)** Although a storm is mentioned, there's no indication that Mr. Alcott is afraid; instead, he actively works to keep the light burning.
      - **D)** There's no mention or implication of a desire to leave; the focus is on his actions during the storm.
      
      ### Sample Question 2
      #### Passage:
      Dr. Lena Nguyen, a renowned marine biologist, has spent years studying coral reef ecosystems. Her latest research, conducted in the vibrant but vulnerable Great Barrier Reef, aims to understand the impacts of climate change on coral bleaching. Through her innovative use of drone technology, Dr. Nguyen maps out affected areas and collects data crucial for developing conservation strategies.
      
      #### Question:
      What is the primary focus of Dr. Nguyen's research?
      
      A) The economic impact of coral reefs.
      B) The role of drone technology in oceanography.
      C) The effects of climate change on coral reefs.
      D) The discovery of new coral species.
      
      #### Detailed Explanation:
      
      - **A)** While important, the economic impact of coral reefs is not mentioned in the passage, which focuses on the ecological effects of climate change.
      - **B)** Drone technology is mentioned as a tool in her research, not the primary focus.
      - **C)** This is the correct answer because the passage specifically states Dr. Nguyen aims to understand the impacts of climate change on coral bleaching, indicating this is her research's main focus.
      - **D)** Discovery of new species is not discussed; the passage centers on the health and preservation of existing coral ecosystems.
      
      These questions and explanations demonstrate a methodical approach to interpreting passages and selecting the most accurate answer by closely examining the details provided and understanding the main idea.
      `
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
    }
  ]

  interface SectionProps {
    sectionId?: string;
  }

  const Section: React.FC<SectionProps> = (props) => {

    const { sectionId: urlSectionId } = useParams<{ sectionId?: string }>();
    const sectionId = props.sectionId || urlSectionId;

    const normalizedSectionId = sectionId?.replaceAll('-', ' '); // Normalize the section ID
    const section = sections.find(s => s.id === normalizedSectionId);
    const paragraphs = section?.content.split('\n');
    return (
        <div className='h-full mt-10'>
          <div className='flex flex-col gap-6  justify-center items-center'>
            <p className='text-center text-3xl font-bold'>{section?.title}</p>
          </div>
          <div className='py-5'>
            {paragraphs?.map((paragraph, index) => {
              console.log(index)
              return <Paragraph key={index} text={paragraph}/>
              })}
          </div>
        </div>
    );
  };
  
  export default Section;

