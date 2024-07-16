import { Link } from 'react-router-dom';
import { useNotes } from '../stores/notes';

const NoteList: React.FC = () => {
  const { notes } = useNotes();

  return (
    <div className="overflow-y-auto h-full">
      {notes.map((note) => (
        <Link
          key={note.id}
          to={`/note/${note.id}`}
          className="block p-4 border-b hover:bg-gray-100"
        >
          <h3 className="font-bold">{note.title}</h3>
          <p className="text-sm text-gray-600 truncate">{note.content}</p>
        </Link>
      ))}
    </div>
  );
};

export default NoteList;