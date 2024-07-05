import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Section } from '../utils/types';

const SectionContent: React.FC = () => {
  const { activeSection } = useOutletContext<{ activeSection: Section | null }>();

  if (!activeSection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-content">
      <h1 className="text-2xl font-bold">{activeSection.title}</h1>
      <div className="mt-4">{activeSection.content}</div>
    </div>
  );
};

export default SectionContent;
