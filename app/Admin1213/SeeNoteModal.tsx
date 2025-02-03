interface SeeNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    note: string;
  }
  
  const SeeNoteModal = ({ isOpen, onClose, note }: SeeNoteModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded">
          <h2 className="text-xl font-bold mb-4">View Note</h2>
          <p className="whitespace-pre-wrap">{note}</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SeeNoteModal;