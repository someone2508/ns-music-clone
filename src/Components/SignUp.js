import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Provider/UserProvider";

export default function SignUp() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signUp, loggedInUserHandler } = useUser();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function signUpFunc() {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectId: "3adcv0i849w8",
        },
        body: JSON.stringify({
          ...userInfo,
          appType: "music",
        }),
      }
    );

    if (response.ok) {
      const jsonResp = await response.json();
      const {
        token,
        data: { user },
      } = jsonResp;

      // console.log(token);
      // console.log(user);

      signUp(token);
      loggedInUserHandler(user);
      navigate("/");
    } else {
      // console.log(response);
      alert("Error while signup!");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    signUpFunc();
  }

  return (
    <div className="pages">
      <form onSubmit={handleSubmit}>
        {/* username */}
        <label htmlFor="name">Username : </label>
        <input
          type="text"
          name="name"
          id="name"
          value={userInfo.name}
          onChange={handleChange}
        />
        {/* email */}
        <label htmlFor="email">Email : </label>
        <input
          type="text"
          name="email"
          id="email"
          value={userInfo.email}
          onChange={handleChange}
        />
        {/* password */}
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          value={userInfo.password}
          onChange={handleChange}
        />
        {/* button signup */}
        <button>Sign Up</button>
        {/* signin */}
        <p>Already have an account?</p>
        <button onClick={() => navigate("/signin")}>SignIn Here!</button>
      </form>
    </div>
  );
}
