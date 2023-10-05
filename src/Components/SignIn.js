import { useState } from "react";
import { useUser } from "../Provider/UserProvider";
import { useNavigate } from "react-router-dom";

const PROJECT_ID = "3adcv0i849w8";

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signIn, loggedInUserHandler } = useUser();

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [key]: value });
  }

  async function signInHandler(userInfo) {
    const loginResponse = await fetch(
      "https://academics.newtonschool.co/api/v1/user/login",
      {
        method: "POST",
        headers: {
          projectID: PROJECT_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
          appType: "music",
        }),
      }
    );

    console.log(loginResponse);

    if (loginResponse.ok) {
      const data = await loginResponse.json();
      // console.log(data);
      signIn(data.token);
      loggedInUserHandler(data.data);
      navigate("/");
    } else {
      alert("Invalid Credentials!");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    signInHandler(userInfo);
  }

  return (
    <div className="pages">
      <form onSubmit={handleSubmit}>
        <label>Email : </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <label>Password : </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChange}
        />
        <button>Sign In</button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={() => navigate("/signup")}>SignUp Here</button>
    </div>
  );
}
