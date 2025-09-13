import React, { useState } from "react";
import { MdOutlinePushPin, MdPushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onSummarize,
  summary,
  onTagClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayContent = summary ? summary : content;
  const preview =
    displayContent.length > 100 ? displayContent.substring(0, 100) + "..." : displayContent;

  return (
    <>
      <div className="card shadow-sm border-0 mb-3 h-100">
        <div className="card-body d-flex flex-column">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 className="card-title mb-1">{title}</h6>
              <small className="note-date">
  {new Date(date).toLocaleDateString()}
</small>

            </div>

            {/* Pin button */}
            {isPinned ? (
              <MdPushPin className="fs-4" onClick={onPinNote} style={{ cursor: "pointer", color: "#124170" }} />
            ) : (
              <MdOutlinePushPin className="fs-4" onClick={onPinNote} style={{ cursor: "pointer", color: "#26667F" }} />
            )}
          </div>

          {/* Content preview */}
          <p className="card-text flex-grow-1" style={{ cursor: "pointer" }} onClick={() => setIsModalOpen(true)}>
            {preview}
          </p>

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex flex-wrap gap-2">
              {tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="badge bg-light text-primary border border-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-sm btn-outline-primary" onClick={onSummarize}>
                Summarize
              </button>
              <MdCreate className="fs-5" onClick={onEdit} style={{ cursor: "pointer", color: "#124170" }} />
              <MdDelete className="fs-5" onClick={onDelete} style={{ cursor: "pointer", color: "#124170" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${isModalOpen ? "show d-block" : ""}`} tabIndex="-1" aria-hidden={!isModalOpen}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              <small className="text-muted">{date}</small>
              <hr />
              <p style={{ whiteSpace: "pre-wrap" }}>{displayContent}</p>

              {/* Tags */}
              <div className="mt-3 d-flex flex-wrap gap-2">
                {tags?.map((tag, idx) => (
                  <span key={idx} className="badge bg-light text-primary border border-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default NoteCard;
