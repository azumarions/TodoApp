import React, { useState } from "react";
// import styles from "./Auth.modules.css"
import { Box, makeStyles, Theme } from "@mui/material"
import { TextField, Button } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store"
import { 
    toggleMode,
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchAsyncCreateProf,
    selectIsLoginView,
} from "./authSlice";

// const useStyles = makeStyles((theme: Theme) => ({
//     button: {
//         margin: theme.spacing(3),
//     },
// }));

const Auth: React.FC = () => {
    // const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const isLoginView = useSelector(selectIsLoginView);
  const [credential, setCredential] = useState({ username: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredential({ ...credential, [name]: value });
  };
  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(credential));
    } else {
      const result = await dispatch(fetchAsyncRegister(credential));
      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(credential));
        await dispatch(fetchAsyncCreateProf());
      }
    }
  };

    return (
        <Box sx={{fontFamily: "serif",
            color: "dimgray",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
        }}>
          <React.Fragment>
          {process.env.REACT_APP_API_URL}
        </React.Fragment>
          <h1>{isLoginView ? "Login" : "Register"}</h1>
          <br />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Username"
            type="text"
            name="username"
            value={credential.username}
            onChange={handleInputChange}
          />
          <br />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Password"
            type="password"
            name="password"
            value={credential.password}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={login}
            sx={{margin: 3,}}
          >
            {isLoginView ? "Login" : "Register"}
          </Button>
          <span onClick={() => dispatch(toggleMode())}>
            {isLoginView ? "Create new account ?" : "Back to Login"}
          </span>
        </Box>
    );
};
    
export default Auth;