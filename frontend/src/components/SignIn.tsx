import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Container from "@mui/material/Container";
import { SigninInterface } from "../models/ISignIn";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function SignIn() {
  const [signin, setSignin] = React.useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const login = () => {
    const apiUrl = "http://localhost:8080/login";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signin),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id",res.data.id);
          window.location.reload()
        } else {
          setError(true);
        }
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  return (
    <Container sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }} 
      component="main" 
      maxWidth="xs">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          เข้าสู่ระบบสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          อีเมลหรือรหัสผ่านไม่ถูกต้อง
        </Alert>
      </Snackbar>
      <CssBaseline />
        <Avatar >
          <LockOutlinedIcon />
        </Avatar>
        <Typography 
            marginTop={2}
            component="h1" 
            variant="h5">
          Sign In

        </Typography>
        
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            autoFocus
            value={signin.Email || ""}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="Password"
            autoComplete="current-pass"
            value={signin.Password || ""}
            onChange={handleInputChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
                marginTop: 2
            }}
            onClick={login}
          >
            Sign In
          </Button>
        </form>

    </Container>
  );
}
export default SignIn;