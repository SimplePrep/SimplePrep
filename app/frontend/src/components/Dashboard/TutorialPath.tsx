import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MixCard from './utils/tutorials/MixCard';
import CurvedLine from './utils/tutorials/CurvedLine';
import { Chapter, Section, UserProgress } from '../auth_utils/types';
import ChapterCard from './utils/tutorials/ChapterCard';
import { getChapters, getSections, getUserProgressTutorial } from '../auth_utils/axios/axiosServices';

const TutorialPath: React.FC<{ isDarkMode: boolean; userSubscription: 'Free' | 'Nova+' | 'Nova Pro'; userId: number }> = ({ isDarkMode, userSubscription, userId }) => {
  const { tutorialId } = useParams<{ tutorialId: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<{ x: number, y: number }[]>([]);
  const [chapterCardPosition, setChapterCardPosition] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const fetchChaptersAndSections = async () => {
      try {
        const chaptersResponse = await getChapters(Number(tutorialId));
        setChapters(chaptersResponse);

        // Fetch sections for each chapter
        const allSections: Section[] = [];
        for (const chapter of chaptersResponse) {
          const chapterSections = await getSections(chapter.id);
          allSections.push(...chapterSections);
        }
        setSections(allSections);

        // Fetch user progress
        const progressResponse = await getUserProgressTutorial(Number(tutorialId));
        setUserProgress(progressResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChaptersAndSections();
  }, [tutorialId, userId]);

  useEffect(() => {
    if (userProgress) {
      const firstIncompleteChapter = userProgress.chapters.find(chapter => chapter.progress < 100);
      if (firstIncompleteChapter) {
        setActiveChapterId(firstIncompleteChapter.chapterId);
      }
    }
  }, [userProgress]);

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
  }, [chapters, sections, activeChapterId, updatePositions]);

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
              const isComplete = userProgress?.chapters.find(chapter => chapter.chapterId === chapters[index].id)?.sections[index].completed;
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
        {chapters.map((chapter) => {
          const chapterProgress = userProgress?.chapters.find(ch => ch.chapterId === chapter.id)?.progress || 0;
          return (
            <div className='mb-16' key={chapter.id}>
              <ChapterCard
                chapter={chapter}
                isDarkMode={isDarkMode}
                isActive={chapter.id === activeChapterId}
                onToggle={() => toggleChapterActive(chapter.id)}
                userSubscription={userSubscription}
                sections={sections.filter(section => section.chapter === chapter.id)}
                userCompletedSections={userProgress?.chapters.find(ch => ch.chapterId === chapter.id)?.sections.filter(s => s.completed).map(s => s.sectionId) || []}
                chapterId={chapter.id}
                progress={chapterProgress}
              />
              {chapter.id === activeChapterId &&
                sections
                  .filter(section => section.chapter === chapter.id)
                  .map((section, index) => {
                    const isComplete = userProgress?.chapters.find(ch => ch.chapterId === chapter.id)?.sections.find(s => s.sectionId === section.id)?.completed;
                    const isFirstIncomplete = !isComplete && index === sections.findIndex(sec => sec.chapter === chapter.id && !userProgress?.chapters.find(ch => ch.chapterId === chapter.id)?.sections.find(s => s.sectionId === sec.id)?.completed);
                    return (
                      <MixCard
                        key={section.id}
                        index={index}
                        isActive={isFirstIncomplete}
                        isDarkMode={isDarkMode}
                        isComplete={isComplete || false}
                        section={section}
                        position={getPosition(index)}
                        tutorialId={tutorialId!}
                      />
                    );
                  })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorialPath;
