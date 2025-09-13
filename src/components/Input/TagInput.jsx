import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags, theme }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const tagBg = theme === "dark" ? "#333" : "#26667F";
  const tagColor = theme === "dark" ? "#6bb3d4" : "#ffffff";
  const tagHoverBg = theme === "dark" ? "#6bb3d4" : "#ffffff";
  const tagHoverColor = theme === "dark" ? "#1e1e1e" : "#26667F";

  const inputBg = theme === "dark" ? "#1e1e1e" : "#DDF4E7";
  const inputColor = theme === "dark" ? "#ffffff" : "#212529";
  const placeholderColor = theme === "dark" ? "#ffffff" : "#6c757d";

  return (
    <div>
      {/* Show tags */}
      {tags?.length > 0 && (
        <div className="mb-2 d-flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="badge d-flex align-items-center"
              style={{
                backgroundColor: tagBg,
                color: tagColor,
                fontSize: "14px",
                padding: "6px 10px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tagHoverBg;
                e.currentTarget.style.color = tagHoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tagBg;
                e.currentTarget.style.color = tagColor;
              }}
            >
              #{tag}
              <button
                type="button"
                className="btn btn-sm btn-link ms-1 p-0"
                style={{ color: "inherit" }}
                onClick={() => handleRemoveTag(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input and Add button */}
      <div className="d-flex align-items-center gap-2">
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add Tags"
          className="form-control"
          style={{
            backgroundColor: inputBg,
            color: inputColor,
            border: "none",
            flexGrow: 1,
            padding: "0.5rem 0.75rem",
          }}
          placeholderTextColor={placeholderColor}
        />

        <button
          type="button"
          onClick={addNewTag}
          className="btn d-flex align-items-center justify-content-center shadow"
          style={{
            width: "36px",
            height: "36px",
            backgroundColor: tagBg,
            color: tagColor,
            border: "none",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = tagHoverBg;
            e.currentTarget.style.color = tagHoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = tagBg;
            e.currentTarget.style.color = tagColor;
          }}
        >
          <MdAdd className="fs-5" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
