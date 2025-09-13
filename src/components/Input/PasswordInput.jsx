import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="d-flex align-items-center border rounded px-2 mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Enter your password"}
        className="form-control border-0 shadow-none"
      />
      <span
        onClick={toggleShowPassword}
        style={{ cursor: "pointer" }}
        className="ms-2"
      >
        {isShowPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
      </span>
    </div>
  );
};

export default PasswordInput;
