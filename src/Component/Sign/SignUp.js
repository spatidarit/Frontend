import React, { useState } from "react";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleSignUpRequest = () => {
    const payload = {
      username: userName,
      password: password,
      role: role,
      firstName: firstName,
      lastName: lastName,
    };
  };
};
export default SignUp;
