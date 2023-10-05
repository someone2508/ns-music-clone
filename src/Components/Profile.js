import { useUser } from "../Provider/UserProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as ProfileIcon } from "../assets/profile.svg";

export default function Profile() {
  const { isUserLoggedIn, loggedInUser, logout } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleSignOut() {
    logout();
  }

  //   useEffect(() => {
  //     document.addEventListener("click", )
  //   }, []);

  return (
    <section
      className="profile"
      onClick={() => {
        setShowModal((curr) => !curr);
      }}
    >
      {/* profile logo */}
      <section className="profile-icon">
        <ProfileIcon />
      </section>

      {isUserLoggedIn && <p>{loggedInUser.name}</p>}

      {/* modal code */}
      {showModal && (
        <section className="auth-modal">
          {isUserLoggedIn ? (
            <button className="sign-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className="sign-btn" onClick={() => navigate("/signin")}>
              Sign In
            </button>
          )}
        </section>
      )}
    </section>
  );
}
