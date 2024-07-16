import React, { useState, useCallback } from 'react';
import { parseAndEvaluateNote } from '../utils/math';

const NoteEditor: React.FC = () => {
  const [content, setContent] = useState('');
  const [evaluatedContent, setEvaluatedContent] = useState<ReturnType<typeof parseAndEvaluateNote>>([]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setEvaluatedContent(parseAndEvaluateNote(newContent));
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-4/5 h-full p-4 font-mono text-lg resize-none"
        placeholder="Enter your note with math expressions here..."
      />
      <div className="w-1/5 h-full p-4 bg-gray-100 font-mono text-lg whitespace-pre overflow-auto">
        {evaluatedContent.map((result, index) => (
          <div key={index} className="flex">
            <div className="flex-grow">{result.original}</div>
            <div className="flex-shrink-0 text-blue-600">
              {result.error ?
                <span className="text-red-500">{result.error}</span> :
                result.evaluated !== null ? `= ${result.evaluated}` : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteEditor;