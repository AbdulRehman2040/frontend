import { useState } from 'react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerId: string;
  currentNote: string;
  onSave: (buyerId: string, note: string) => void;
}

const NoteModal = ({ isOpen, onClose, buyerId, currentNote, onSave }: NoteModalProps) => {
  const [note, setNote] = useState(currentNote);

  const handleSave = () => {
    onSave(buyerId, note);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Admin Notes</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
        />
        <div className="mt-4 flex justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;