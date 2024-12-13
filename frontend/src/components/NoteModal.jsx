// NoteModal.jsx
import { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(title, description);
  };

  return (
    <div className="flex justify-center items-center bg-black bg-opacity-50 fixed inset-0 z-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl relative">
        <h1 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
          {currentNote ? "Edit Note" : "Add Note"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-5 text-white font-bold text-lg rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 transition-all transform hover:scale-105"
          >
            {currentNote ? "Save Changes" : "Add Note"}
          </button>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
