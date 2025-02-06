import { useState } from "react";

interface SeeNoteModalsProps {
  isOpen: boolean;
  onClose: () => void;
  note: string;
}

const SeeNoteModals = ({ isOpen, onClose, note }: SeeNoteModalsProps) => {
  // Parse notes with admin name and date
  const notes = note.split('---')
    .filter(n => n.trim() !== '')
    .map(noteText => {
      const lines = noteText.split('\n').filter(l => l.trim() !== '');
      const noteContent = lines.slice(0, -1).join('\n'); // All lines except last
      const [adminInfo] = lines.slice(-1); // Last line: "- Added by Admin on Date"
      
      // Extract admin name and date using regex
      const match = adminInfo?.match(/- Added by (.+) on (.+)$/);
      return {
        date: match?.[2] || 'Unknown Date',
        admin: match?.[1] || 'Unknown Admin',
        content: noteContent.trim()
      };
    });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Notes </h2>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Admin</th>
              <th className="border p-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border p-2 text-sm">{note.date}</td>
                <td className="border p-2 text-sm font-medium">{note.admin}</td>
                <td className="border p-2 text-sm whitespace-pre-wrap">{note.content}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={onClose}
          className="mt-4 bg-[#b4a483] text-white px-4 py-2 rounded hover:bg-[#a57922] float-right"
        >
          Close
        </button>
      </div>
    </div>
  );
};


export default SeeNoteModals;