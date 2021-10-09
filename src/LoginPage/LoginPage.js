import './LoginPage.css';

const LoginPage = ({ handleClose, modalShow }) => {
  const showHideClassName = modalShow
    ? 'modal display-block'
    : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div id="modal-login-image">
          <img
            src="https://images.unsplash.com/photo-1593672715438-d88a70629abe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
            alt=""
            height="100%"
            style={{
              borderRadius: '10px 00px 0px 10px'
            }}
          />
        </div>
        <div id="modal-content">
          <span id="help-text">Login to continue</span>
          <span id="login-inputs">
            <input type="text" placeholder="Email ID" />
            <input type="text" placeholder="Password" />
          </span>
          <button id="submit-button">Login</button>
        </div>
        <button type="button" onClick={handleClose} id="modal-close-button">
          ×
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
