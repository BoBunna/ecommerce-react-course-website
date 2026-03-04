import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { signUp, user, logout, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);

    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    // ✅ make sure your AuthContext returns { success: true/false, error?: string }
    if (result?.success) {
      navigate("/");
    } else {
      setError(result?.error || "Something went wrong");
    }
  } // ✅ YOU MISSED THIS CLOSING BRACE

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User logged in: {user.email}</p>}
          {user && <button onClick={logout}>Logout</button>}

          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div>{error}</div>}

            <div className="form-group">
              <label className="form-lable" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-input"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-lable" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                  minLength: { value: 6, message: "Password must at least 6 characters" },
                  maxLength: { value: 12, message: "Password must be less than 12 characters" },
                })}
                className="form-input"
                type="password"
                id="password"
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}