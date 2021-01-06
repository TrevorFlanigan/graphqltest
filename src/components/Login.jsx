import "../styles/login.css";
import { TextField, Button, Paper } from "@material-ui/core";
import graphFetch from "../util/fetch";
import { useState } from "react";
const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirm, setSignUpConfirm] = useState("");

  const handleLogin = async () => {
    let res = await graphFetch(`{
            login(name: "${loginUsername}", password: "${loginPassword}") {
                id
                name
            }
        }`);

    if (res.ok) {
      let json = await res.json();
      console.log(json);
      if (json.errors) {
        console.error(json.errors[0]);
      } else {
        console.log(json.data);
      }
    } else {
      console.error("Server Error!");
    }
  };

  const handleSignUp = async () => {
    let res = await graphFetch(`mutation {
            createUser(name: "${signUpUsername}", password: "${signUpPassword}") {
                id
                name
            }
        }`);

    if (res.ok) {
      let json = await res.json();
      if (json.errors) {
        console.error(json.errors[0]);
      } else {
        console.log(json.data);
      }
    } else {
      console.error("Server Error!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper style={{ margin: 10, height: "50%", maxHeight: "500px" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            height: "100%",
            minWidth: "300px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            label="Username"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <TextField
            label="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
            type="password"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Paper>

      <Paper style={{ margin: 10, height: "50%", maxHeight: "500px" }}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            height: "100%",
            minWidth: "300px",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <TextField
            label="Username"
            onChange={(e) => setSignUpUsername(e.target.value)}
          />
          <TextField
            label="Password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            type="password"
          />
          <TextField
            label="Confirm Password"
            onChange={(e) => setSignUpConfirm(e.target.value)}
            type="password"
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!signUpPassword || signUpPassword !== signUpConfirm}
          >
            Signup
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
