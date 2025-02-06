import { useState } from "react";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyerId: string;
 
  onSave: (buyerId: string, note: string, adminName: string) => void;
  adminName: string;
}

const AddNoteModal = ({ isOpen, onClose, buyerId, onSave, adminName }:AddNoteModalProps) => {
  const [note, setNote] = useState('');

  const handleSave = () => {
    onSave(buyerId, note, adminName);
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Add Note</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#b4a483] hover:bg-[#614713] text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;