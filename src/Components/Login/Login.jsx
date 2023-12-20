import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import "./Login.css";
//material ui imports
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Link,
  Typography,
  Alert
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const isEmail = (email) =>
/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Login = () => {
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [redirect,setRedirect]=useState(false);
  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Validation for onBlur Email
const handleEmail = () => {

  // console.log(isEmail(email)); 

  if (!isEmail(email)) {
    setEmailError(true);
    return;
  }

  setEmailError(false);
};

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailError || !email) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }
    if(!password){
      setFormValid("Password cannot be empty");
      return;
    }
    try {
      const response = await Axios.post("http://localhost:5000/login",{
        email:email,
        password:password
      });

      if (response) {
        navigate("/dashboard",{
          state:{
            profile:email
          }
        })
      } else {
        setFormValid(`${response.message}`);
        console.log("error in response");
        console.error("Login failed:", response.message);
      }
    } catch (error) {
      setFormValid(`Invalid credentials`)
      console.error(":", error.message);
    }
  };

  return (
    <div>
      <Grid>
        <Paper elevation={20} className="paper-login">
          <Grid align="Center">
            <Avatar sx={{ bgcolor: "#1bbd7e" }}>
              <LoginIcon />
            </Avatar>
            <h2>Login</h2>
          </Grid>
          <form onSubmit={handleLogin}>
            <Stack spacing={2} direction="column">
              <TextField
                label="Email"
                placeholder="Enter Email"
                type="text"
                value={email}
                error={emailError}
                onBlur={handleEmail}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Password"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Stack>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              login
            </Button>
          </form>
          <Typography>
            <Link href="#">Forgot Password?</Link>
          </Typography>
          <Typography>
            Don't have an account?
            <Link href="/signup">
          Signup
            </Link>
          </Typography>
          {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px", marginTop:"10px" }} spacing={2}>
          <Alert severity="error" size="small" margin>
            {formValid}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
