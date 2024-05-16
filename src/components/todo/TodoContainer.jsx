import { useState } from "react";
import addIcon from "../../styles/images/add-icon.png";
import { handleChangeFormatDate } from "../../util/constants";
import Alert from "../alert/Alert";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList";
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
    if (isDoneCount > 15) {
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
        <h2>{handleChangeFormatDate()}</h2>
        <h3>Working...</h3>
        <TodoList
          item={workinglists}
          handleListDelete={handleListDelete}
          handleListDone={handleListDone}
        />
        <h3>Done...</h3>
        <TodoList
          item={donelists}
          handleListDelete={handleListDelete}
          handleListDone={handleListDone}
        />
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

export default Todo;
