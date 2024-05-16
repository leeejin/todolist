import PropTypes from "prop-types";
import noData from "../../styles/images/noData.png";
import TodoItem from "./TodoItem";
const TodoList = ({ item, handleListDone, handleListDelete }) => {
  return (
    <div className="card-sub">
      {item.length ? (
        item.map((item) => (
          <TodoItem
            item={item}
            key={item.id}
            handleListDone={handleListDone}
            handleListDelete={handleListDelete}
          />
        ))
      ) : (
        <div className="d-flex">
          <img src={noData} width={"300px"} />
        </div>
      )}
      <div style={{ clear: "both" }} />
    </div>
  );
};
TodoList.propTypes = {
  item: PropTypes.array.isRequired,
  handleListDone: PropTypes.func.isRequired,
  handleListDelete: PropTypes.func.isRequired,
};

export default TodoList;
