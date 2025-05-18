// Styles
import "./styles.css";

const Input = ({
  className = "",
  name = "",
  onChange = () => {},
  placeholder = "",
  type = "text",
  value = "",
}) => {
  return (
    <input
      className={`input${className ? ` ${className}` : ""}`}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
