import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import titleIcon from "../styles/images/title-icon.png";
import { handleChangeFormatDate } from "../util/constants";
import Alert from "./alert";
/** 모달 */
const Modal = ({ handleModalOpen, list }) => {
  const [info, setInfo] = useState({
    //새로 추가할 객체
    id: 0,
    title: "",
    content: "",
    date: handleChangeFormatDate(),
  });
  const [alert, setAlert] = useState({ isVisible: false, message: "" }); //alerts on/off

  useEffect(() => {
    document.body.style = "overflow:hidden";
    return () => (document.body.style = "overflow:auto");
  }, []);

  /** input이 변할때 info상태값도 변함 */
  const handleSendInfo = (e) => {
    const { name, value } = e.target;

    setInfo((prev) => ({
      ...prev,
      [name]: value,
      isDone: false,
    }));
  };
  /** 입력 함수 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {
      title: info.title.length < 2 || info.title.length > 20,
      content: info.content.length < 2 || info.content.length > 20,
    };
    const isNotDoneCount = list.filter((item) => !item.isDone).length;
    if (error.title || error.content || isNotDoneCount >= 14) {
      let message = "";
      if (error.title) {
        message = "2자 ~20자 이내의 제목을 입력해주세요";
      } else if (error.content) {
        message = "2자 ~20자 이내의 내용을 입력해주세요";
      } else {
        message = "데이터는 14개 이상 저장 못해요";
      }
      setAlert((prev) => ({
        ...prev,
        isVisible: !prev.isVisible,
        message,
      }));
      return;
    }

    const newId = list.length > 0 ? list[list.length - 1].id + 1 : 0; //id 생성
    const newInfo = { ...info, id: newId }; // info에다가 새로운 id 넣기
    list.push(newInfo);
    handleModalOpen(); // 모달 off
  };
  return (
    <>
      {alert.isVisible && <Alert message={alert.message} />}
      <div className="blackdrop" onClick={handleModalOpen} />
      <div className="whitedrop">
        <h3>
          할 일 <img src={titleIcon} width={"30px"} />
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="modal">
            <input
              type="text"
              name="title"
              placeholder="제목을 입력해주세요"
              onChange={handleSendInfo}
            />
            <textarea
              type="text"
              rows={9}
              name="content"
              placeholder="내용을 입력해주세요 (20자이내)"
              onChange={handleSendInfo}
            />
            <div className="modal-button-box">
              <button type="submit">확인</button>
              <button onClick={handleModalOpen}>취소</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
Modal.propTypes = {
  handleModalOpen: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};

export default Modal;
