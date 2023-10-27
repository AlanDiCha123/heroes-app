import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const { name, onInputChange } = useForm({ name: "" });

  const navigate = useNavigate();

  const onLogin = () => {
    if (name === "") {
      alert("Ingresa algo po favo");
      return;
    }
    login(name);

    const lastPath = localStorage.getItem("lastPath");

    navigate(lastPath, {
      replace: true,
    });
  };

  return (
    <div className="container mt-5">
      {name === "" && (
        <div className="alert alert-danger animate__animated animate__fadeIn">
          Fill the field
        </div>
      )}
      <h1>Login</h1>
      <hr />
      <div className="mb-3">
        <label htmlFor="exampleInputEmail" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={onInputChange}
          name="name"
          value={name}
        />
      </div>
      <button className="btn btn-outline-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};
