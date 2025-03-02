import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import AddNewNote from "./components/addNewNote";
import EditNote from "./components/editNote";
import CirclePlus from "./assets/circle-plus.svg";
import PenToSquare from "./assets/pen-to-square-solid.svg";
import Trashcan from "./assets/trash-can-solid.svg";
import { fetchNotes, deleteNote } from "./api/fetcher";
import { Note } from "./types/note";

function App() {
  const [data, setData] = useState<Note[]>([]);
  const [showAddNewNote, setShowAddNewNote] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const notes = await fetchNotes();
        setData(notes);
      } catch (error) {
        console.error(error);
      }
    };
    getNotes();
  }, []);

  const addNewNoteToList = (newNote: Note) => {
    setData((prevData) => [...prevData, newNote]);
  };

  const updateNoteInList = (updatedNote: Note) => {
    setData((prevData) =>
      prevData.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNoteFromList = async (id: number | undefined) => {
    try {
      await deleteNote(id ? id : 0);
      setData((prevData) => prevData.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleNoteClick = (note: Note) => {
    setCurrentNote(note);
    navigate(`/edit/${note.id}`);
  };

  const renderNotes = () => {
    return (
      <ul className="grid grid-flow-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 p-2">
        {data.map((note) => (
          <li
            className="note-item text-center p-2 bg-grey border-2 m-2 pb-20 rounded-md shadow-2xl min-w-50"
            key={note.id}
          >
            <h2 className="text-center p-2 text-3xl font-bold w-fit">
              {note.title}
            </h2>
            <p className="text-2xl">{note.content}</p>
            <div className="note-actions flex justify-center gap-4 my-3">
              <img
                className="hover:cursor-pointer"
                src={PenToSquare}
                alt="Edit"
                width={"30rem"}
                onClick={() => handleNoteClick(note)}
              />
              <img
                className="hover:cursor-pointer"
                src={Trashcan}
                alt="Delete"
                width={"30rem"}
                onClick={() => deleteNoteFromList(note.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="absolute w-full h-full bg-gray-200">
      <Header />
      {renderNotes()}
      {showAddNewNote && (
        <AddNewNote
          setShowAddNewNote={setShowAddNewNote}
          addNewNoteToList={addNewNoteToList}
          note={{ title: "", content: "" }}
        />
      )}
      {currentNote && (
        <Routes>
          <Route
            path="/edit/:id"
            element={
              <EditNote
                setShowEditNote={() => navigate("/")}
                note={currentNote}
                updateNoteInList={updateNoteInList}
              />
            }
          />
        </Routes>
      )}
      <img
        className="w-12 hover:cursor-pointer fixed bottom-4 right-4"
        src={CirclePlus}
        alt="circle-plus"
        onClick={() => setShowAddNewNote(!showAddNewNote)}
      />
    </div>
  );
}

export default App;
