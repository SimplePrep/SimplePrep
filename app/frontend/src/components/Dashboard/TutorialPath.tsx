import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MixCard from './utils/tutorials/MixCard';
import CurvedLine from './utils/tutorials/CurvedLine';
import { Chapter, Section } from '../auth_utils/types';
import ChapterCard from './utils/tutorials/ChapterCard';


const getUserCompletionData = (userId: number): number[] => {
  // Replace this with actual logic to determine if the section is complete for the current user.
  return [1, 3, 5]; // Example: sections that are complete for this user.
};

const TutorialPath: React.FC<{ isDarkMode: boolean; userSubscription: 'free' | 'nova+' | 'nova pro'; userId: number }> = ({ isDarkMode, userSubscription, userId }) => {
  const { tutorialID } = useParams<{ tutorialID: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<{ x: number, y: number }[]>([]);
  const [chapterCardPosition, setChapterCardPosition] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const dummyChapters: Chapter[] = [
      {
        id: 1,
        title: "Introduction to SAT Reading",
        order: 1,
        tutorial: 1,
        description: "This chapter introduces the basics of SAT Reading, covering the structure and types of passages.",
        lessons: 5,
        practices: 10,
        difficulty: "Intermediate",
        image_path: "tutorials/img1.jpg",
        requiredSubscription: 'free',
      },
      {
        id: 2,
        title: "Advanced Passage Analysis",
        order: 2,
        tutorial: 1,
        description: "This chapter delves into advanced strategies for analyzing SAT Reading passages.",
        lessons: 6,
        practices: 12,
        difficulty: "Advanced",
        image_path: "tutorials/img2.jpg",
        requiredSubscription: 'nova+',
      },
    ];

    setChapters(dummyChapters);
  }, [tutorialID]);

  const userCompletedSections = getUserCompletionData(userId);

  const calculateChapterCompletion = (chapterId: number): number => {
    const totalSections = sections.filter(section => section.chapter === chapterId).length;
    const completedSections = sections.filter(section => section.chapter === chapterId && userCompletedSections.includes(section.id)).length;
    return (completedSections / totalSections) * 100;
  };

  // Set the first incomplete chapter as the active chapter on initial render
  useEffect(() => {
    const firstIncompleteChapter = chapters.find(chapter => calculateChapterCompletion(chapter.id) < 100);
    if (firstIncompleteChapter) {
      setActiveChapterId(firstIncompleteChapter.id);
    }
  }, [chapters]);

  const toggleChapterActive = (chapterId: number) => {
    setActiveChapterId(prevChapterId => (prevChapterId === chapterId ? null : chapterId));
  };

  const updatePositions = useCallback(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const chapterCardElement = document.querySelector('.ChapterCard');
      if (chapterCardElement) {
        const chapterCardRect = chapterCardElement.getBoundingClientRect();
        setChapterCardPosition({
          x: chapterCardRect.left + chapterCardRect.width / 2 - containerRect.left,
          y: chapterCardRect.bottom - containerRect.top,
        });
      }

      const cards = containerRef.current.querySelectorAll('.MixCard');
      const newPositions = Array.from(cards).map(card => {
        const rect = card.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      });
      setCardPositions(newPositions);
    }
  }, []);

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [chapters, activeChapterId, updatePositions]);

  const sections: Section[] = [
    { id: 1, title: "Introduction to Reading 1", slug: 'slug-1', order: 1, chapter: 1, content: "This section covers the basics of SAT Reading.", description: 'abc' },
    { id: 2, title: "Introduction to Reading 2", slug: 'slug-2', order: 1, chapter: 1, content: "This section covers the basics of SAT Reading.", description: 'abc' },
    { id: 3, title: "Introduction to Reading 3", slug: 'slug-3', order: 1, chapter: 1, content: "This section covers the basics of SAT Reading.", description: 'abc' },
    { id: 4, title: "Introduction to Reading 4", slug: 'slug-4', order: 1, chapter: 1, content: "This section covers the basics of SAT Reading.", description: 'abc' },
    { id: 5, title: "Analyzing Passages", slug: 'slug-2', order: 2, chapter: 1, content: "In this section, you'll learn how to analyze passages effectively.", description: 'abc' },
    { id: 6, title: "Understanding Question Types", slug: 'slug-3', order: 3, chapter: 2, content: "This section explains the different types of questions in SAT Reading.", description: 'abc' },
  ];

  const getPosition = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'middle';
      case 1:
        return 'right';
      case 2:
        return 'middle';
      case 3:
        return 'left';
      default:
        return 'middle';
    }
  };

  return (
    <div className={`max-w-6xl mx-auto py-32 font-montserrat relative`} ref={containerRef}>
      {chapterCardPosition && cardPositions.length > 0 && (
        <svg className="absolute top-0 left-0 w-full h-full">
          {cardPositions.map((pos, index) => {
            if (index === 0) {
              return (
                <CurvedLine
                  key={`line-chapter-${index}`}
                  startX={chapterCardPosition.x}
                  startY={chapterCardPosition.y}
                  endX={pos.x}
                  endY={pos.y}
                  isStraight={true}
                  color={isDarkMode ? '#4B5563' : '#4B5563'}
                />
              );
            } else if (index > 0) {
              const isComplete = userCompletedSections.includes(sections[index].id);
              return (
                <CurvedLine
                  key={`line-${index}`}
                  startX={cardPositions[index - 1].x}
                  startY={cardPositions[index - 1].y}
                  endX={pos.x}
                  endY={pos.y}
                  color={isComplete ? 'green' : (isDarkMode ? '#4B5563' : '#4B5563')}
                />
              );
            }
            return null;
          })}
        </svg>
      )}

      <div>
        {chapters.map((chapter) => (
          <div className='mb-16' key={chapter.id}>
            <ChapterCard
              chapter={chapter}
              isDarkMode={isDarkMode}
              isActive={chapter.id === activeChapterId}
              onToggle={() => toggleChapterActive(chapter.id)}
              userSubscription={userSubscription} // Pass the user's subscription type
              sections={sections.filter(section => section.chapter === chapter.id)} // Filter sections by chapter
              userCompletedSections={userCompletedSections} // Pass the completed sections for the user
            />
            {chapter.id === activeChapterId &&
              sections
                .filter(section => section.chapter === chapter.id)
                .map((section, index) => {
                  const isComplete = userCompletedSections.includes(section.id);
                  const isFirstIncomplete = !isComplete && index === sections.findIndex(sec => sec.chapter === chapter.id && !userCompletedSections.includes(sec.id));
                  return (
                    <MixCard
                      key={section.id}
                      index={index}
                      isActive={isFirstIncomplete}
                      isDarkMode={isDarkMode}
                      isComplete={isComplete}
                      section={section}
                      position={getPosition(index)}
                      verticalPosition={index * 250 + 50}
                    />
                  );
                })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialPath;
