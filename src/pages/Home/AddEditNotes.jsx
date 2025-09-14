// AddEditNotes.js

import React from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ noteData, type, onClose, refreshNotes, theme }) => {
  const [title, setTitle] = React.useState(noteData?.title || "");
  const [content, setContent] = React.useState(noteData?.content || "");
  const [tags, setTags] = React.useState(noteData?.tags || []);
  const [error, setError] = React.useState("");

  const token = localStorage.getItem("token");

  const addNewNote = async () => {
    try {
      const res = await fetch("https://vercel-backend-lilac-theta.vercel.app/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add note");

      refreshNotes();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const editNote = async () => {
    try {
      const res = await fetch(`https://vercel-backend-lilac-theta.vercel.app/api/notes/${noteData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update note");

      refreshNotes();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = () => {
    if (!title) return setError("Title is required");
    if (!content) return setError("Content is required");

    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  const bgColor = theme === "dark" ? "#2a2a2a" : "white";
  const inputBg = theme === "dark" ? "#1e1e1e" : "#f8f9fa";
  const textColor = theme === "dark" ? "#f8f9fa" : "#212529";
  const buttonBg = "#26667F";
  const buttonHoverBg = "#fff";
  const buttonHoverColor = "#26667F";

  return (
  <div
  className="d-flex flex-column"
  style={{
    backgroundColor: theme === "dark" ? "#2a2a2a" : "white",
    width: "60vh",
    height: "80vh",
    maxWidth: "100vw",
    transition: "background-color 0.15s ease, color 0.15s ease",
  }}
>
      {/* Top Close Button */}
      <div className="d-flex justify-content-end p-2">
        <button
          onClick={onClose}
          className="btn btn-sm"
          style={{
            fontSize: "1.2rem",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme === "dark" ? "#3a3a3a" : "#DDF4E7",
            color: textColor,
            border: "none",
            outline: "none",
            transition: "all 0.15s ease",
          }}
        >
          <MdClose />
        </button>
      </div>

      {/* Note Form */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3">
        <div
          className="w-100 p-4"
          style={{
            maxWidth: "800px",
            backgroundColor: bgColor,
            color: textColor,
            transition: "all 0.15s ease",
          }}
        >
          <h5 className="mb-3 text-center text-secondary">
            {type === "edit" ? "Edit Note" : "Add Note"}
          </h5>

          {/* Title */}
          <div className="mb-3">
            <label className="form-label text-secondary small">TITLE</label>
            <input
              type="text"
              className="form-control"
            
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              style={{
                backgroundColor: inputBg,
                color: textColor,
                border: "none",
                width: "100%",
                padding: "0.5rem 0.75rem",
                transition: "all 0.15s ease",
              }}
            />
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label text-secondary small">CONTENT</label>
            <textarea
              className="form-control"
              rows={5}
              value={content}
              onChange={({ target }) => setContent(target.value)}
              style={{
                backgroundColor: inputBg,
                color: textColor,
                border: "none",
                width: "100%",
                padding: "0.5rem 0.75rem",
                resize: "vertical",
                transition: "all 0.15s ease",
              }}
            ></textarea>
          </div>

          {/* Tags */}
          <div className="mb-3">
            <label className="form-label text-secondary small">TAGS</label>
            <TagInput tags={tags} setTags={setTags} 
            />
          </div>

          {error && <p className="text-danger small">{error}</p>}

          {/* Save/Close Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn px-3 py-1"
              onClick={handleSave}
              style={{
                backgroundColor: buttonBg,
                color: "white",
                border: "none",
                width: "100%", // fills container
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = buttonHoverBg;
                e.currentTarget.style.color = buttonHoverColor;
                e.currentTarget.style.border = `1px solid ${buttonBg}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = buttonBg;
                e.currentTarget.style.color = "white";
                e.currentTarget.style.border = "none";
              }}
            >
              {type === "edit" ? "Update" : "Add"}
            </button>

            <button
              className="btn px-3 py-1"
              onClick={onClose}
              style={{
                backgroundColor: inputBg,
                color: textColor,
                border: `1px solid ${buttonBg}`,
                width: "100%", // fills container
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = buttonBg;
                e.currentTarget.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = inputBg;
                e.currentTarget.style.color = textColor;
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;
