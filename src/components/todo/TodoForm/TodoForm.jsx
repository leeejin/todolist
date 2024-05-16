import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import titleIcon from "../../../styles/images/title-icon.png";
import { handleChangeFormatDate } from "../../../util/constants";
import Alert from "../../alert/Alert";
import "./form.css";
/** 모달 */
const Modal = ({ handleModalOpen, list }) => {
  const titleInputRef = useRef(null);
  const [alert, setAlerts] = useState({ isVisible: false, message: "" }); //alerts on/off

  useEffect(() => {
    document.body.style = "overflow:hidden";
    return () => (document.body.style = "overflow:auto");
  }, []);

  /** 입력 함수 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const content = formData.get("content");
    const error = {
      title: title.length > 20 || !title.trim(),
      content: content.length > 20 || !content.trim(),
    };
    const isNotDoneCount = list.filter((item) => !item.isDone).length;
    if (error.title || error.content || isNotDoneCount >= 20) {
      let message = "";
      if (error.title) message = "20자 이내의 제목을 입력해주세요";
      else if (error.content) message = "20자 이내의 내용을 입력해주세요";
      else message = "데이터는 20개 이상 저장 못해요";

      setAlerts((prev) => ({
        ...prev,
        isVisible: !prev.isVisible,
        message,
      }));
      return;
    }
    const newInfo = {
      //새로 추가할 객체
      id: crypto.randomUUID(),
      title,
      content,
      isDone: false,
      date: handleChangeFormatDate(),
    };
    list.push(newInfo);
    titleInputRef.current.focus();
    e.target.reset();
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
              autoFocus
              type="text"
              name="title"
              ref={titleInputRef}
              placeholder="제목을 입력해주세요"
              required
            />
            <textarea
              type="text"
              rows={9}
              name="content"
              placeholder="내용을 입력해주세요 (20자이내)"
              required
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
