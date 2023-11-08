import './SigninForm.css';

function SigninForm() {
  return (
    <form
      className="SigninForm"
      action=""
      method="post"
      // onSubmit={handleFormSubmit}
    >
      <div className="container login__input-wrapper">
        <label className="form__label">User name</label>
        <input
          // ref={emailRef}
          className="form__item"
          name="name"
          autoFocus
          required
        />
      </div>
      <div className="container login__input-wrapper">
        <label className="form__label">E-mail</label>
        <input
          // ref={emailRef}
          className="form__item"
          name="email"
          required
        />
      </div>
      <div className="container login__input-wrapper">
        <label className="form__label">Password</label>
        <input
          // ref={passwordRef}
          className="form__item"
          type="password"
          name="password"
          autoComplete="off"
          required
        />
      </div>
      <button className="btn btn--login" type="submit">
        LOG IN
      </button>
    </form>
  );
}

export default SigninForm;
