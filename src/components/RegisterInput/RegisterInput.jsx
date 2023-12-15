import React from "react";
import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";

export default function RegisterInput({ register }) {
  const [name, setName] = useInput();
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  const onRegisterHandler = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={onRegisterHandler}>
      <label htmlFor="name">
        Name
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={setName}
          required
        />
      </label>
      <label htmlFor="email">
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
          placeholder="Password"
          value={password}
          onChange={setPassword}
          required
        />
      </label>
      <button type="submit" className="btn">
        Daftar
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
