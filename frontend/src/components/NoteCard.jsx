import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteCard = ({ note, onEdit , deleteNote}) => {
  return (
    <div className="w-80 h-40 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition duration-300">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 truncate">{note.title}</h2>
        <p className="text-sm text-gray-600 mt-2 overflow-hidden line-clamp-2">{note.description}</p>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button className="text-blue-500 hover:text-blue-700">
          <FaEdit onClick={()=> onEdit(note)}  />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <MdDelete onClick={()=> deleteNote(note)} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
