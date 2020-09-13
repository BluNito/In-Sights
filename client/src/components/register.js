import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/actions/authActions";
import Logo from "./shared/logo";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomButton from "./shared/customButton";
import { CenteredAlert } from "./shared/customAlert";

const Register = (props) => {
  let target, value;
  const [gridWidth, setGridWidth] = useState(6);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    target = event.target.name;
    value = event.target.value;
    setCredentials((prevState) => ({
      ...prevState,
      [target]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await props.register(credentials);
    if (res) {
      setErrors(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.dimensions.width < 450) setGridWidth(12);
    else setGridWidth(6);
  }, [props.dimensions]);

  return (
    <div className="login-page">
      <div className="login-cover" />
      <div className="register-panel">
        <div className="register-logo">
          <Logo />
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={gridWidth}>
                <TextField
                  label="First Name"
                  placeholder="Enter your first name"
                  name="fname"
                  type="text"
                  value={credentials.fname}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                  error={!!errors.fname}
                  helperText={errors.fname}
                />
              </Grid>
              <Grid item xs={gridWidth}>
                <TextField
                  label="Last Name"
                  placeholder="Enter your last name"
                  name="lname"
                  type="text"
                  value={credentials.lname}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                  error={!!errors.lname}
                  helperText={errors.lname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  placeholder="Unique username"
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
                  label="Email"
                  placeholder="example@somewhere.com"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={gridWidth}>
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
              <Grid item xs={gridWidth}>
                <TextField
                  label="Confirm Password"
                  placeholder="**********"
                  name="password2"
                  type="password"
                  value={credentials.password2}
                  onChange={handleChange}
                  fullWidth={true}
                  variant="outlined"
                  error={!!errors.password2}
                  helperText={errors.password2}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="form-button-container">
                  {loading ? (
                    <CircularProgress color="primary" />
                  ) : (
                    <CustomButton
                      label="Register"
                      type="submit"
                      handleClick={handleSubmit}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
            {errors.register ? (
              <Grid item>
                <CenteredAlert severity="error" content={errors.register} />
              </Grid>
            ) : (
              <div />
            )}
          </form>
        </div>
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dimensions: state.coms.dimensions,
});

export default connect(mapStateToProps, { register })(Register);
