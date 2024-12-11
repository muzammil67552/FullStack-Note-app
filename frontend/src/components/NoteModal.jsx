import { useState } from "react";
import axios from "axios";

const NoteModal = ({closeModal, addNote}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        addNote(title, description)
       
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-500">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Note</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`w-full p-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-green-400 ${title ? "font-bold" : ""}`}
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            placeholder="Note Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow focus:ring-2 focus:ring-green-400 h-32"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white font-medium rounded-md bg-gradient-to-r from-blue-400 to-blue-500 hover:from-green-500 hover:to-green-600 transition-colors"
                    >
                        Add Now
                    </button>
                </form>
                <button
                    className="mt-4 text-red-400 hover:text-red-600"
                    onClick={closeModal}
                >
                    Cancel Now
                </button>
            </div>
        </div>
    );
};

export default NoteModal;
