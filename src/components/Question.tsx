import React from 'react';
import { Question as QuestionType } from '@/types/generatedTypes';

interface QuestionProps {
  question: QuestionType;
  value: number | null;
  onChange: (id: number, value: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, value, onChange }) => {
  const labels = question.responseType === 'effectiveness' 
    ? ['Very Poorly', 'Poorly', 'Adequately', 'Well', 'Excellently Well']
    : ['Not Likely', 'Rarely', 'Sometimes', 'Often', 'Always'];

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <p className="mb-3 text-lg">{question.id}. {question.text}</p>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="flex flex-col items-center">
            <button
              type="button"
              className={`w-full py-2 px-3 rounded ${
                value === rating
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => onChange(question.id, rating)}
            >
              {rating}
            </button>
            <span className="text-xs mt-1 text-center text-gray-600">
              {labels[rating - 1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;