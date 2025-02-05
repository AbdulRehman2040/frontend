import { useState, useEffect } from 'react';

interface AddNoteModalsProps {
  isOpen: boolean;
  onClose: () => void;
  sellerId: string;
  currentNote: string;
  onSave: (note: string, adminName: string) => void;
  adminName: string;
}

const AddNoteModals = ({
  isOpen,
  onClose,
  sellerId,
  currentNote,
  onSave,
  adminName
}: AddNoteModalsProps) => {
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewNote(currentNote);
    }
  }, [isOpen, currentNote]);

  const handleSave = () => {
    if (newNote.trim()) {
      onSave(newNote, adminName);
      setNewNote('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Admin Note</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg mb-4"
          placeholder="Enter your note here..."
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModals;