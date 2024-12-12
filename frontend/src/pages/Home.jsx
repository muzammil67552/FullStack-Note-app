import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  // Fetch notes from the backend
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note");
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentNote(null); // Reset the current note when closing the modal
  };

  // Open the modal for editing a specific note
  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  // Delete a note
  const deleteNote = async (id) => {
    console.log("Deleting note with ID:", id);
    try {
      const response = await axios.delete(`http://localhost:5000/api/note/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data && response.data.success) {
        fetchNotes(); // Refresh the notes after deletion
      } else {
        console.error("Error: Response did not indicate success", response.data);
      }
    } catch (error) {
      console.error("Error deleting note:", error.response?.data || error.message);
    }
  };

  // Add a new note or update an existing one
  const addNote = async (title, description) => {
    try {
      const url = currentNote
        ? `http://localhost:5000/api/note/update/${currentNote._id}`
        : "http://localhost:5000/api/note/add";
      const method = currentNote ? "put" : "post";

      const response = await axios[method](
        url,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && response.data.success) {
        fetchNotes();
        closeModal();
      } else {
        console.error("Error: Response did not indicate success", response.data);
      }
    } catch (error) {
      console.error("Error saving note:", error.response?.data || error.message);
    }
  };

  // Edit note function
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/note/update/${id}`, { title, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data && response.data.success) {
        fetchNotes(); // Refresh the notes after editing
        closeModal();
      } else {
        console.error("Error: Response did not indicate success", response.data);
      }
    } catch (error) {
      console.error("Error editing note:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {notes.map((note) => (
          <div className="flex justify-center" key={note._id}>
            <NoteCard
              note={note}
              onEdit={() => onEdit(note)}
              deleteNote={() => deleteNote(note._id)} // Pass the note ID to the delete function
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setCurrentNote(null); // Reset current note for adding a new note
          setModalOpen(true);
        }}
        className="fixed right-4 bottom-4 bg-blue-800 font-bold p-4 rounded-full text-white text-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        +
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <NoteModal 
            closeModal={closeModal} 
            addNote={addNote} 
            editNote={editNote} // Pass the editNote function
            currentNote={currentNote} 
          />
        </div>
      )}
    </div>
  );
};

export default Home;
