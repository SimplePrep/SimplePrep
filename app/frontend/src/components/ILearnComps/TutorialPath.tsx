import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MixCard from './utils/tutorials/MixCard';
import CurvedLine from './utils/tutorials/CurvedLine';
import ChapterCard from './utils/tutorials/ChapterCard';
import { getUserProgressTutorial } from '../auth_utils/axios/axiosServices';
import { UserProgress } from '../auth_utils/types';

const TutorialPath: React.FC<{ isDarkMode: boolean; userSubscription: 'Free' | 'Nova+' | 'Nova Pro'; userId: number }> = ({ isDarkMode, userSubscription, userId }) => {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<{ x: number, y: number }[]>([]);
  const [chapterCardPosition, setChapterCardPosition] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const progressResponse = await getUserProgressTutorial(Number(tutorialId));
        setUserProgress(progressResponse);

        // Set the first incomplete chapter as active
        const firstIncompleteChapter = progressResponse!.chapters.find(chapter => chapter.progress < 100);
        if (firstIncompleteChapter) {
          setActiveChapterId(firstIncompleteChapter.chapterId);
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    fetchUserProgress();
  }, [tutorialId, userId]);

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
  }, [userProgress, activeChapterId, updatePositions]);

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
            } else {
              const isComplete = userProgress?.chapters
                .find(chapter => chapter.chapterId === activeChapterId)?.sections
                .find(section => section.sectionId === index + 1)?.completed;
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
          })}
        </svg>
      )}

      <div>
        {userProgress?.chapters.map((chapter) => (
          <div className='mb-16' key={chapter.chapterId}>
            <ChapterCard
              chapter={chapter}
              isDarkMode={isDarkMode}
              isActive={chapter.chapterId === activeChapterId}
              onToggle={() => toggleChapterActive(chapter.chapterId)}
              userSubscription={userSubscription}
              sections={chapter.sections}
              userCompletedSections={chapter.sections.filter(section => section.completed).map(s => s.sectionId)}
              chapterId={chapter.chapterId}
              progress={chapter.progress}
            />
            {chapter.chapterId === activeChapterId &&
              chapter.sections.map((section, index) => {
                const isFirstIncomplete = !section.completed && index === chapter.sections.findIndex(sec => !sec.completed);
                return (
                  <MixCard
                    key={section.sectionId}
                    index={index}
                    isActive={isFirstIncomplete}
                    isDarkMode={isDarkMode}
                    isComplete={section.completed}
                    section={section}
                    position={getPosition(index)}
                    tutorialId={tutorialId!}
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
