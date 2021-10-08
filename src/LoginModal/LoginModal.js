import './LoginModal.css';

const LoginModal = ({ handleClose, modalShow }) => {
  const showHideClassName = modalShow
    ? 'modal display-block'
    : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button" onClick={handleClose} id="modal-close-button">
          ×
        </button>
      </section>
    </div>
  );
};
export default LoginModal;
