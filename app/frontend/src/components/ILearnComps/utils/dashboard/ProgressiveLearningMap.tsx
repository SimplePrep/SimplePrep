import React, { useState } from 'react';
import { X, Clock, Trophy, Star, BookOpen, Target, Activity, ArrowRight, CheckCircle, Lock } from 'lucide-react';

// Types and Interfaces
enum SkillLevel {
  Foundation = 'Foundation',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

interface Progress {
  quizScore: number;
  practiceQuestions: number;
  timeSpent: number; // in minutes
  lastAttempted?: Date;
}

interface SubTopic {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
}

interface LearningStep {
  id: string;
  title: string;
  description: string;
  skillLevel: SkillLevel;
  icon: React.ReactNode;
  requiredTime: string;
  difficulty: 1 | 2 | 3;
  subTopics: SubTopic[];
  progress?: Progress;
  unlockRequirements?: string[];
}

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedTopics: string[];
  progress: { [key: string]: Progress };
  onTopicSelect: (topicId: string) => void;
}

const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  completedTopics,
  progress,
  onTopicSelect
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const learningSteps: LearningStep[] = [
    {
      id: 'words-context',
      title: "Words in Context",
      description: "Master the art of understanding vocabulary in context and analyzing word choice",
      skillLevel: SkillLevel.Foundation,
      icon: <BookOpen className="w-6 h-6" />,
      requiredTime: "2-3 hours",
      difficulty: 1,
      subTopics: [
        {
          id: 'wc-1',
          title: 'Context Clues',
          description: 'Using surrounding text to determine word meanings',
          estimatedTime: 45
        },
        {
          id: 'wc-2',
          title: 'Connotation vs Denotation',
          description: 'Understanding implied vs literal meanings',
          estimatedTime: 60
        }
      ]
    },
    {
      id: 'main-purpose',
      title: "Main Purpose",
      description: "Learn to identify and analyze the author's primary goals and intentions",
      skillLevel: SkillLevel.Foundation,
      icon: <Target className="w-6 h-6" />,
      requiredTime: "3-4 hours",
      difficulty: 2,
      subTopics: [
        {
          id: 'mp-1',
          title: 'Author Intent',
          description: 'Identifying the main goal of the passage',
          estimatedTime: 60
        }
      ],
      unlockRequirements: ['words-context']
    }
  ];

  const getTopicProgress = (topic: LearningStep): number => {
    const topicProgress = progress[topic.id];
    if (!topicProgress) return 0;
    return Math.min((topicProgress.quizScore / 100) * 100, 100);
  };

  const isTopicLocked = (topic: LearningStep): boolean => {
    if (!topic.unlockRequirements) return false;
    return !topic.unlockRequirements.every(req => completedTopics.includes(req));
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };

  return (
    <div 
      className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm
        flex items-center justify-center z-50
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">SAT Reading Mastery Path</h2>
            <p className="text-sm text-gray-600">Track your progress and master each concept</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Topics List */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <div className="space-y-4">
              {learningSteps.map((step, index) => {
                const isCompleted = completedTopics.includes(step.id);
                const isLocked = isTopicLocked(step);
                const progress = getTopicProgress(step);

                return (
                  <div
                    key={step.id}
                    onClick={() => !isLocked && onTopicSelect(step.id)}
                    className={`
                      relative p-5 rounded-xl border-2 
                      transition-all duration-200
                      ${isLocked ? 'bg-gray-50 cursor-not-allowed' : 'hover:shadow-lg cursor-pointer'}
                      ${selectedTopic === step.id ? 'border-blue-500 shadow-lg' : 'border-transparent'}
                      ${isCompleted ? 'bg-green-50' : 'bg-white'}
                    `}
                  >
                    {/* Lock overlay */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-gray-50/90 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Complete previous topics to unlock</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`
                        p-3 rounded-lg
                        ${isCompleted ? 'bg-green-100' : 'bg-blue-100'}
                      `}>
                        {step.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800">{step.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              {step.requiredTime}
                              <span className="mx-2">•</span>
                              <div className="flex items-center gap-1">
                                {getDifficultyStars(step.difficulty)}
                              </div>
                            </div>
                          </div>
                          {isCompleted && (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-3">{step.description}</p>

                        {/* Progress bar */}
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        {/* Subtopics preview */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {step.subTopics.map(subtopic => (
                            <span
                              key={subtopic.id}
                              className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                            >
                              {subtopic.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right sidebar - Stats & Details */}
          <div className="w-1/3 border-l bg-gray-50 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Overall Progress */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold mb-3">Overall Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-medium">
                      {completedTopics.length}/{learningSteps.length} Topics
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ 
                        width: `${(completedTopics.length / learningSteps.length) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold mb-3">Recent Achievements</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Streak */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold mb-3">Study Streak</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold">7</span>
                  <span className="text-gray-600">days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapModal;