import "./styles.css";

const Button = ({
  children,
  className = "",
  onClick = () => {},
  theme = "primary",
  type = "button",
  variant = "default",
}) => {
  return (
    <button
      className={`button button--${theme} button--${variant}${className ? ` ${className}` : ""}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
