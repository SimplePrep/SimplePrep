import React from 'react';
import { BookOpen, AlertTriangle, Lightbulb, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface CheatSheetProps {
  isDarkMode: boolean;
}

type RuleOrStrategy = {
  title: string;
  explanation: string;
  examples?: string[];
};

const content = {
  title: "Finding Main Ideas & Central Claims",
  description: "Master the skill of identifying the main idea and central arguments in passages",
  rules: [
    {
      title: "Topic vs Main Idea",
      explanation: "The topic is what the passage is about, while the main idea is what the author wants to say about that topic.",
      examples: [
        "Topic: Climate Change | Main Idea: Recent technological innovations offer promising solutions to combat climate change",
        "Topic: Remote Work | Main Idea: Remote work has permanently transformed corporate culture and productivity expectations"
      ]
    },
    {
      title: "Location Strategy",
      explanation: "Main ideas are often found in key positions within the text.",
      examples: [
        "First paragraph: Sets up the main argument",
        "Last paragraph: Reinforces or summarizes the main point",
        "Topic sentences: Signal important supporting ideas"
      ]
    },
    {
      title: "Scope Rule",
      explanation: "The main idea should cover all major points without being too broad or narrow.",
      examples: [
        "Too broad: 'Technology affects society'",
        "Too narrow: 'Social media usage among US teenagers increased by 23% in 2023'",
        "Just right: 'Social media's growing influence is reshaping how teenagers communicate and learn'"
      ]
    }
  ],
  keyStrategies: [
    {
      title: "Preview and Predict",
      explanation: "Scan the text structure before reading in detail.",
      examples: [
        "Read title, headings, and first/last paragraphs",
        "Look for repeated words or phrases",
        "Note organizational patterns (comparison, cause-effect, etc.)"
      ]
    },
    {
      title: "Track Development",
      explanation: "Follow how ideas progress through the text.",
      examples: [
        "Make mental connections between paragraphs",
        "Note transition words and phrases",
        "Identify how each paragraph contributes to the overall message"
      ]
    }
  ],
  commonMistakes: [
    "Choosing an option that only covers part of the passage",
    "Selecting answers that are too broad or too narrow",
    "Confusing supporting details with main ideas",
    "Missing shifts in argument or perspective"
  ],
  quickTips: [
    "Ask yourself: 'What is the author's primary purpose?'",
    "Look for patterns and repeated ideas",
    "Consider what connects all paragraphs",
    "Watch for transition words that signal main points"
  ]
};

const ReviewSpaceCheatSheet: React.FC<CheatSheetProps> = ({ isDarkMode }) => {
  const colors = {
    background: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    text: isDarkMode ? "text-gray-100" : "text-gray-900",
    cardBg: isDarkMode ? "bg-gray-800" : "bg-white",
    secondary: isDarkMode ? "text-gray-300" : "text-gray-700",
    highlight: isDarkMode ? "bg-gray-700" : "bg-blue-50",
    warning: isDarkMode ? "bg-red-900/50" : "bg-red-50",
    success: isDarkMode ? "bg-green-900/50" : "bg-green-50",
    border: isDarkMode ? "border-gray-700" : "border-gray-200"
  };

  return (
    <div className={`min-h-screen py-24 px-6 ${colors.background} ${colors.text} font-sans`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`${colors.cardBg} rounded-lg p-8 mb-8 shadow-lg`}>
          <h1 className="text-4xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {content.title}
          </h1>
          <p className={`text-xl ${colors.secondary} font-light leading-relaxed`}>
            {content.description}
          </p>
        </div>

        <div className="space-y-6">
          {/* Rules */}
          <div className={`${colors.cardBg} rounded-lg p-6 shadow-lg`}>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold tracking-tight">Core Rules</h2>
            </div>
            <div className="space-y-4">
              {content.rules.map((rule, index) => (
                <div key={index} className={`${colors.highlight} rounded-lg p-5`}>
                  <h3 className="font-bold text-xl mb-3 tracking-tight">{rule.title}</h3>
                  <p className={`${colors.secondary} text-lg leading-relaxed`}>{rule.explanation}</p>
                  {rule.examples && (
                    <div className="mt-4 space-y-2">
                      {rule.examples.map((example, idx) => (
                        <div key={idx} className={`${colors.cardBg} p-3 rounded font-medium`}>
                          {example}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Strategies */}
          <div className={`${colors.cardBg} rounded-lg p-6 shadow-lg`}>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold tracking-tight">Key Strategies</h2>
            </div>
            <div className="space-y-4">
              {content.keyStrategies.map((strategy, index) => (
                <div key={index} className={`${colors.highlight} rounded-lg p-5`}>
                  <h3 className="font-bold text-xl mb-3 tracking-tight">{strategy.title}</h3>
                  <p className={`${colors.secondary} text-lg leading-relaxed`}>{strategy.explanation}</p>
                  {strategy.examples && (
                    <div className="mt-4 space-y-2">
                      {strategy.examples.map((example, idx) => (
                        <div key={idx} className={`${colors.cardBg} p-3 rounded font-medium`}>
                          {example}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className={`${colors.cardBg} rounded-lg p-6 shadow-lg`}>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold tracking-tight">Common Mistakes</h2>
            </div>
            <div className={`${colors.warning} rounded-lg p-5`}>
              <ul className="space-y-3">
                {content.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 mt-1 flex-shrink-0 text-red-500" />
                    <span className="text-lg leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Tips */}
          <div className={`${colors.cardBg} rounded-lg p-6 shadow-lg`}>
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold tracking-tight">Quick Tips</h2>
            </div>
            <div className={`${colors.highlight} rounded-lg p-5`}>
              <ul className="space-y-3">
                {content.quickTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0 text-blue-500" />
                    <span className="text-lg leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSpaceCheatSheet;