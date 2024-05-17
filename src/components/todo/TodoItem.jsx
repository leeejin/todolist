import PropTypes from "prop-types";
import checkIcon from "../../styles/images/check-icon.png";
import deleteIcon from "../../styles/images/delete-icon.png";
const TodoItem = ({ item, handleListDone, handleListDelete }) => {
  const { title, content, id, isDone } = item; //구조분해 할당
  return (
    <div className="card-items">
      <h5 className="list-title">{title}</h5>
      <p className="list-content">{content}</p>
      <div>
        {!isDone && (
          <img
            src={checkIcon}
            onClick={() => handleListDone(id)}
            width={"30px"}
          />
        )}
        <img
          src={deleteIcon}
          onClick={() => handleListDelete(id)}
          width={"30px"}
        />
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleListDone: PropTypes.func.isRequired,
  handleListDelete: PropTypes.func.isRequired,
};

export default TodoItem;
