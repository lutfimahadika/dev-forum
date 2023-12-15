import React from "react";
import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";

export default function LoginInput({ login }) {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  const onLoginHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <form onSubmit={onLoginHandler}>
      <label id="email" htmlFor="email">
        Email
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
          required
        />
      </label>
      <button type="submit" className="btn">
        Masuk
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
