import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {toast} from 'react-toastify'
import "./Signup.css";

// npm library imports 
import Axios from 'axios';

//material ui imports 
import { Grid,Paper,Avatar,Typography,TextField,Link,Alert
} from "@mui/material";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

// Email Validation
const isEmail = (email) =>
/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const btnstyle = { margin: "8px 0" };
  const marginTop = { marginTop: "5px" };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Validations
  
  
  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [redirect,setRedirect]=useState(false);
  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();
  
  
  // Validation for onBlur Username
  const handleUsername = () => {
    if (!username) {
      setUsernameError(true);
      return;
    }
    
    setUsernameError(false);
  };
  
// Validation for onBlur Email
const handleEmail = () => {
  // console.log(isEmail(email));
  if (!isEmail(email)) {
    setEmailError(true);
    return;
  }

  setEmailError(false);
};

//  

function validatePhoneNumber(input_str) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
}

  const handleSignup = async (e) => {
    e.preventDefault();

    setSuccess(null);
    //First of all Check for Errors

    // IF username error is true
    if (usernameError || !username) {
      setFormValid(
        "Username is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }

    // If Email error is true
    if (emailError || !email) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }
    if(!gender){
      setFormValid("Please select your gender");
      return;
    }
    if(!validatePhoneNumber(phoneNumber)){
      setFormValid("Please enter a valid phone number");
      return ;
    }
    if(password!=confirmPassword){
      setFormValid("Confirm password doesnt match password. Please Check!!");
      return;
    }

    const alldata={
      username:username,
      email:email,
      phoneNumber:phoneNumber,
      gender:gender,
      password:password,
      confirmPassword:confirmPassword
    }
    try {
      const response = await Axios.post("http://localhost:5000/signup",alldata);
      if (response) {
       setFormValid(null);
       setSuccess("Form submitted sucessfully");
       navigate('/login');
      } else {
        setFormValid(`Signup failed:, ${error.message}`);
      }
    } catch (error) {
      setFormValid(`Error during signup: ${error.message}`)
      setSuccess(null);
    }
  };

  return (
    <div>
      <Grid>
        {/* Show Form Error if any */}
        <Paper elevation={20} className="paper-signup">
          <Grid align="Center">
            <Avatar sx={{ bgcolor: "#1bbd8e" }}>
              <HowToRegRoundedIcon />
            </Avatar>
            <h2 className="headerStyle">Sign Up</h2>
            <Typography variant="caption" gutterBottom>
              Please fill this form to create an account!
            </Typography>
          </Grid>
          <form onSubmit={handleSignup}>
            <Stack spacing={1} direction="column">
              <TextField
                fullWidth
                label="Username"
                type="text"
                error={usernameError}
                onBlur={handleUsername}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                error={emailError}
                onBlur={handleEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email id"
                required
              />

              <FormControl component="fieldset" style={marginTop}>
                <FormLabel component="legend" required>
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{ display: "initial" }}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your Phone Number"
                required
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
    
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <TextField
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                placeholder="Confirm your password"
                required
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
              style={btnstyle}
              color="primary"
              fullWidth
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </form>
          <Typography>
            Already have an account?
            <Link href="/login">Login</Link>
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
        </Paper>
      </Grid>
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

    </div>
  );
};

export default Signup;
