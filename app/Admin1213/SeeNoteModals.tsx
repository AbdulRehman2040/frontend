import { useState } from 'react';

interface SeeNoteModalsProps {
  isOpen: boolean;
  onClose: () => void;
  note: string;
}

const SeeNoteModals = ({ isOpen, onClose, note }: SeeNoteModalsProps) => {
  if (!isOpen) return null;

  // Split notes and filter empty entries
  const notesArray = note.split('---').filter(entry => entry.trim() !== '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Admin Notes History</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>
        
        <div className="space-y-4">
          {notesArray.map((noteEntry, index) => {
            const lines = noteEntry.trim().split('\n');
            const [noteText, metaData] = [lines[0], lines.slice(1).join(' ')];
            
            return (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">{noteText}</p>
                {metaData && (
                  <p className="text-sm text-gray-500 italic">
                    {metaData.replace('- Added by', 'Added by')}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SeeNoteModals;