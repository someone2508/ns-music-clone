import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
// import Social from "./Components/Social";
import Library from "./Components/Library";
import { useUser } from "./Provider/UserProvider";
import { Navigate } from "react-router-dom";
import { useState } from "react";
const LazySocial = React.lazy(() => import('./Components/Social'));


function ProtectedRoute({ children }) {
  const { isUserLoggedIn } = useUser();
  if (!isUserLoggedIn) {
    return <Navigate to="/signin" />;
  }

  console.log(isUserLoggedIn);

  return children;
}

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/social" element={
          <React.Suspense fallback='Loading...'>
            <LazySocial />
          </React.Suspense>
        } />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
