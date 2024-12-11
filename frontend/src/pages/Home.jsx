import { useEffect, useState } from "react";
import axios from "axios"; 
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]); 

  useEffect(() => {   
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note");
      setNotes(data.notes); 
    } catch (error) {
      console.log(error);
    }
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {notes.map((note) => (
          <div className="flex justify-center" key={note._id}>
            <NoteCard note={note} />
          </div>
        ))}
      </div>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 bottom-4 bg-blue-800 font-bold p-4 rounded-full text-white text-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        +
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <NoteModal closeModal={closeModal} addNote={addNote} />
        </div>
      )}
    </div>
  );
};

export default Home;
