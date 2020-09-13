import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "./shared/logo";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { login } from "../store/actions/authActions";
import CustomButton from "./shared/customButton";
import { CenteredAlert } from "./shared/customAlert";

const Login = (props) => {
  let target, value;
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    target = event.currentTarget.name;
    value = event.currentTarget.value;
    setCredentials((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await props.login(credentials);
    if (res) {
      setLoading(false);
      setErrors(res);
    }
  };

  return (
    <div className="login-page">
      <div className="login-cover" />
      <div className="login-panel">
        <div className="login-logo">
          <Logo />
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  placeholder="Your Username"
                  name="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  placeholder="**********"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="form-button-container">
                  {loading ? (
                    <CircularProgress color="primary" />
                  ) : (
                    <CustomButton
                      label="Login"
                      type="submit"
                      handleClick={handleSubmit}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
            {errors.login ? (
              <Grid item>
                <CenteredAlert severity="error" content={errors.login} />
              </Grid>
            ) : (
              <div />
            )}
          </form>
        </div>
        <Link to="/register">No account? Register here</Link>
      </div>
    </div>
  );
};

export default connect(null, { login })(Login);
