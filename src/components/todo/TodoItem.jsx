import PropTypes from "prop-types";
import checkIcon from "../../styles/images/check-icon.png";
import deleteIcon from "../../styles/images/delete-icon.png";
const TodoItem = ({ item, handleListDone, handleListDelete }) => {
  return (
    <div className="card-items">
      <h5 className="list-title">{item.title}</h5>
      <p className="list-content">{item.content}</p>
      <div>
        {!item.isDone && (
          <img
            src={checkIcon}
            onClick={() => handleListDone(item.id)}
            width={"30px"}
          />
        )}
        <img
          src={deleteIcon}
          onClick={() => handleListDelete(item.id)}
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
