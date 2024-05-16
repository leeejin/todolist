import PropTypes from "prop-types";
import { useState } from "react";
import addIcon from "../../styles/images/add-icon.png";
import checkIcon from "../../styles/images/check-icon.png";
import deleteIcon from "../../styles/images/delete-icon.png";
import noData from "../../styles/images/noData.png";
import { handleChangeFormatDate } from "../../util/constants";
import Alert from "../alert/Alert";
import TodoForm from "./TodoForm/TodoForm";

/** 메인함수 */
const Todo = () => {
  const [lists, setList] = useState([]); //데이터 넣는 리스트

  const [modal, setModal] = useState(false); // 모달 on/off
  const [alert, setAlerts] = useState({ isVisible: false, message: "" }); //alert창 on/off

  const workinglists = lists.filter((item) => !item.isDone);
  const donelists = lists.filter((item) => item.isDone);
  /** 모달 on/off 함수 */
  const handleModalOpen = () => setModal((prev) => !prev);

  /** 리스트 done 함수 */
  const handleListDone = (id) => {
    const updatedList = lists.map((item) =>
      item.id === id ? { ...item, isDone: true } : item
    );
    const isDoneCount = updatedList.filter((item) => item.isDone).length;
    if (isDoneCount > 20) {
      setAlerts((prev) => ({
        ...prev,
        isVisible: !prev.isVisible,
        message: "완료한 리스트를 지워주세요",
      }));
      return;
    }
    setList(updatedList);
  };
  /** 리스트 삭제 함수 */
  const handleListDelete = (id) =>
    setList(lists.filter((item) => item.id !== id));

  return (
    <>
      {alert.isVisible && <Alert message={alert.message} />}

      {modal && <TodoForm handleModalOpen={handleModalOpen} list={lists} />}
      <div className="card">
        <h3>{handleChangeFormatDate()}</h3>
        <h4>Working...</h4>
        <div className="card-sub">
          {workinglists.length ? (
            workinglists.map((item) => (
              <ListItem
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
        <h4>Done...</h4>
        <div className="card-sub">
          {donelists.length ? (
            donelists.map((item) => (
              <ListItem
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
        <img
          className="icon"
          src={addIcon}
          onClick={handleModalOpen}
          width={"70px"}
        />
      </div>
    </>
  );
};

const ListItem = ({ item, handleListDone, handleListDelete }) => {
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

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleListDone: PropTypes.func.isRequired,
  handleListDelete: PropTypes.func.isRequired,
};

export default Todo;
