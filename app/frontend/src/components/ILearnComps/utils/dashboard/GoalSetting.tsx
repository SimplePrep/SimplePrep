import React, { useState } from 'react';
import { BsPlus, BsX, BsPencil, BsTrash } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { BsLightbulb } from 'react-icons/bs';

interface AhaButtonProps {
    isDarkMode: boolean;
}

const AhaButton: React.FC<AhaButtonProps> = ({ isDarkMode }) => {
    const [showStars, setShowStars] = useState(false);

    const handleClick = () => {
        setShowStars(true);
        setTimeout(() => setShowStars(false), 1000); // Show stars for 1 second
    };

    const starColors = isDarkMode ? ['#FFD700', '#FF6347', '#ADFF2F', '#00BFFF', '#FF69B4'] : ['#FF4500', '#1E90FF', '#32CD32', '#FFD700', '#FF1493'];

    const starPath = "M 12,17.3 L 4.5,21 l 1.4,-8.1 L 0,8.5 l 8.2,-1.2 L 12,0 l 3.8,7.3 L 24,8.5 l -5.9,4.4 L 18.5,21 Z";

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className={`flex items-center space-x-2 px-2 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition-colors`}
            >
                <BsLightbulb />
                <span>Aha!</span>
            </button>
            <AnimatePresence>
                {showStars && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    >
                        {Array.from({ length: 20 }).map((_, index) => (
                            <motion.svg
                                key={index}
                                className="absolute"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={starColors[index % starColors.length]}
                                initial={{
                                    opacity: 0,
                                    x: Math.random() * 200 - 100,
                                    y: Math.random() * 200 - 100,
                                    rotate: Math.random() * 360,
                                    scale: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    rotate: Math.random() * 360,
                                    scale: 1,
                                    transition: { duration: 0.6, ease: 'easeOut' },
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <path d={starPath} />
                            </motion.svg>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface GoalSettingProps {
    isDarkMode: boolean;
}

interface Goal {
    id: number;
    subject: string;
    progress: string;
}

const GoalSetting: React.FC<GoalSettingProps> = ({ isDarkMode }) => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [newGoal, setNewGoal] = useState({ subject: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const textColor = isDarkMode ? 'text-slate-200' : 'text-slate-800';
    const bgColor = isDarkMode ? 'bg-slate-700' : 'bg-white';
    const borderColor = isDarkMode ? 'border-slate-600' : 'border-slate-300';
    const buttonBg = isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600';
    const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';

    const validateInput = () => {
        if (newGoal.subject.trim() === '') {
            setError('Goal cannot be empty.');
            return false;
        }
        setError(null);
        return true;
    };

    const addGoal = () => {
        if (!validateInput()) return;
        const newGoalObj = { id: Date.now(), subject: newGoal.subject, progress: 'Not Started' };
        setGoals([...goals, newGoalObj]);
        setNewGoal({ subject: '' });
        setIsCreating(false);
    };

    const saveEditedGoal = () => {
        if (!validateInput()) return;
        setGoals(goals.map(goal =>
            goal.id === editingGoalId ? { ...goal, subject: newGoal.subject } : goal
        ));
        setNewGoal({ subject: '' });
        setIsCreating(false);
        setEditingGoalId(null);
    };

    const deleteGoal = (id: number) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    const startEditingGoal = (id: number) => {
        const goalToEdit = goals.find(goal => goal.id === id);
        if (goalToEdit) {
            setNewGoal({ subject: goalToEdit.subject });
            setEditingGoalId(id);
            setIsCreating(true);
        }
    };

    return (
        <div className={`${cardBg} p-6 rounded-2xl shadow-lg border ${borderColor} mt-6`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${textColor}`}>Goal Setting</h2>
                {!isCreating && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className={`flex items-center space-x-2 px-4 py-2 ${buttonBg} text-white rounded-lg transition-colors`}
                    >
                        <BsPlus />
                        <span>Create</span>
                    </button>
                )}
            </div>

            {goals.length === 0 && !isCreating && (
                <div className="text-center py-6">
                    <p className={`${textColor} mb-4`}>Create goals and accelerate your learning journey.</p>
                </div>
            )}

            {isCreating && (
                <div className="space-y-4">
                    <input
                        type="text"
                        value={newGoal.subject}
                        onChange={(e) => setNewGoal({ ...newGoal, subject: e.target.value })}
                        placeholder="Enter your goal"
                        className={`w-full p-2 ${textColor} ${bgColor} border ${borderColor} rounded-lg`}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => {
                                setIsCreating(false);
                                setEditingGoalId(null);
                                setNewGoal({ subject: '' });
                                setError(null);
                            }}
                            className={`px-3 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center`}
                        >
                            <BsX className="mr-2" />
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={editingGoalId !== null ? saveEditedGoal : addGoal}
                            className={`flex flex-row items-center px-3 py-3 ${buttonBg} text-white rounded-lg transition-colors`}
                        >
                            <BsPlus className="mr-2" />
                            <span>{editingGoalId !== null ? 'Save Goal' : 'Add Goal'}</span>
                        </button>
                    </div>
                </div>
            )}

            {!isCreating && goals.length > 0 && (
                <div className='space-y-4'>
                    {goals.map((goal) => (
                        <div key={goal.id} className='flex justify-between items-center'>
                            <span className={`${textColor} font-medium`}>{goal.subject}</span>
                            <div className="flex space-x-2 items-center">
                                <AhaButton isDarkMode={isDarkMode} />
                                <button onClick={() => startEditingGoal(goal.id)} className={`text-indigo-600 hover:text-indigo-800`}>
                                    <BsPencil />
                                </button>
                                <button onClick={() => deleteGoal(goal.id)} className={`text-red-600 hover:text-red-800`}>
                                    <BsTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GoalSetting;