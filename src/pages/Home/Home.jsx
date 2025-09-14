import React from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Home = ({ theme, toggleTheme }) => {
  const [openAddEditModal, setOpenAddEditModal] = React.useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [notes, setNotes] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [summaries, setSummaries] = React.useState({}); // store summaries per note
  const [activeNote, setActiveNote] = React.useState(null); // 🟢 to show full content modal
  const [activeTag, setActiveTag] = React.useState(null);

  const token = localStorage.getItem("token");

  // ✅ fetch notes from backend
  const fetchNotes = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ pull token from storage

    if (!token) {
      console.error("No token found. Please log in again.");
      return;
    }

    const res = await fetch("https://vercel-backend-lyart-beta.vercel.app/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ attach token
      },
    });

    const data = await res.json();

    if (res.ok) {
      setNotes(data);
    } else {
      console.error("Error fetching notes:", data.message || "Unauthorized");
      // optional: redirect to login if unauthorized
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
};


  React.useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://vercel-backend-lyart-beta.vercel.app/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      fetchNotes(); // ✅ Refresh after deletion
    } catch (err) {
      console.error("Delete error:", err.message);
      alert(err.message);
    }
  };

  const handlePin = async (id) => {
    try {
      const res = await axios.patch(
        `https://vercel-backend-lyart-beta.vercel.app/api/notes/${id}/pin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Pinned note:", res.data);
      fetchNotes(); // refresh UI
    } catch (err) {
      console.error("Error pinning note:", err);
      alert(err.message);
    }
  };

  //Filter + Sort Notes

  const filteredNotes = notes
    .filter((note) => {
      const query = searchQuery.toLowerCase();
      const tagFilter = activeTag ? activeTag.toLowerCase() : null;

      const matchesSearch =
        !query ||
        note.title.toLowerCase().includes(query) ||
        (Array.isArray(note.tags) &&
          note.tags.some((tag) => tag.toLowerCase().includes(query)));

      const matchesTag =
        !tagFilter ||
        (Array.isArray(note.tags) &&
          note.tags.some((tag) => tag.toLowerCase() === tagFilter));

      return matchesSearch && matchesTag;
    })
    .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));

  const handleSummarize = async (id) => {
    try {
      const res = await axios.post(
        `https://vercel-backend-lyart-beta.vercel.app/api/notes/${id}/summarize`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🟢 Update notes state with summarized version
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, content: res.data.note.content } : note
        )
      );
    } catch (err) {
      console.error("Error summarizing note:", err.message);
      alert("Failed to summarize note");
    }
  };

  const handleTagClick = (tag) => {
    setActiveTag((prev) =>
      prev === tag.toLowerCase() ? null : tag.toLowerCase()
    );
  };

  return (
    <div className={theme === "dark" ? "dark-theme-container" : ""}>
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Notes List */}
      <div className="container mt-4">
        <div className="row g-4">
          {filteredNotes.map((note) => (
            <div className="col-12 col-sm-6 col-md-4" key={note._id}>
              <NoteCard
                note={note}
                title={note.title}
                date={new Date(note.createdAt).toLocaleDateString()}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() =>
                  setOpenAddEditModal({
                    isShown: true,
                    type: "edit",
                    data: note,
                  })
                }
                onDelete={() => handleDelete(note._id)}
                onPinNote={() => handlePin(note._id)}
                onSummarize={() => handleSummarize(note._id)}
                summary={summaries[note._id]}
                onOpenFullContent={() => setActiveNote(note)}
                onTagClick={(tag) => setSearchQuery(tag)} // ✅ add this
                theme={theme}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="btn position-fixed rounded-circle d-flex align-items-center justify-content-center shadow"
        style={{
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#26667F",
        }}
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="fs-1 text-white" />
      </button>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {openAddEditModal.isShown && (
          <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() =>
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              content: {
                background: theme === "dark" ? "#2a2a2a" : "white",
                border: "none",
                padding: "10px",
                inset: "unset",
              },
            }}
            ariaHideApp={false}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <AddEditNotes
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose={() =>
                  setOpenAddEditModal({
                    isShown: false,
                    type: "add",
                    data: null,
                  })
                }
                refreshNotes={fetchNotes}
                theme={theme}
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* 🟢 Full Content Modal - FIXED */}
      <Modal
        isOpen={!!activeNote}
        onRequestClose={() => setActiveNote(null)}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050
          },
          content: {
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80vh",
            padding: "30px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: theme === "dark" ? "#2a2a2a" : "white",
            color: theme === "dark" ? "#f8f9fa" : "#212529",
            overflow: "auto",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
          }
        }}
      >
        {activeNote && (
          <div>
            <h4 className="mb-3" style={{ color: theme === "dark" ? "#6bb3d4" : "#124170" }}>
              {activeNote.title}
            </h4>
            <small className="text-muted">
              {new Date(activeNote.createdAt).toLocaleDateString()}
            </small>
            <hr className="my-3" style={{ borderColor: theme === "dark" ? "#444" : "#e0e0e0" }} />
            <p className="mt-3" style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {activeNote.content}
            </p>

            {/* Tags */}
            {activeNote.tags && activeNote.tags.length > 0 && (
              <div className="mt-4">
                <div className="d-flex flex-wrap gap-2">
                  {activeNote.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="badge"
                      style={{
                        backgroundColor: theme === "dark" ? "#3a3a3a" : "#f0f0f0",
                        color: "#26667F",
                        border: "1px solid #26667F",
                        padding: "5px 10px"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 d-flex justify-content-end">
              <button
                className="btn"
                style={{
                  backgroundColor: "#26667F",
                  color: "white",
                  padding: "8px 20px"
                }}
                onClick={() => setActiveNote(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;