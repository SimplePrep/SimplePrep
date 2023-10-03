import React, { FC, useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';

interface Section {
  id: number;
  name: string;
  num_questions: number;
}


const TestSections = () => {

  const [sections, setSections] = useState<Section[]>([]);
  const {testId} = useParams<{testId: string}>();

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/test/tests/${testId}/sections/`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetching test sections: ", data)
        setSections(data)
    })
    .catch((error)=> console.error(`Error fetching testsections with id ${testId}`, error))
  }, [testId]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {sections.map(section => (
        <div key={section.id} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">{section.name}</h2>
          <p>Number of Questions: {section.num_questions}</p>
          <Link to={`/practice-tests/${testId}/sections/${section.id}/${section.name}`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Start Section
            </button>
           </Link>
        </div>
      ))}
    </div>
  );

};

export default TestSections;