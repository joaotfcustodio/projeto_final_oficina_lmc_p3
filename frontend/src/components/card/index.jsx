// Styles
import "./styles.css";

const Card = ({
  children = null,
  className = '',
  title = ''
}) => {
  return (
    <div className={`card${className ? ` ${className}` : ''}`}>
      {title && (
        <h5 className="card-title">
          {title}
        </h5>
      )}
      {children}
    </div>
  );
};

export default Card;
