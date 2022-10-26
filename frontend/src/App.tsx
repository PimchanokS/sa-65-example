import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Rooms from "./components/Rooms";
import RoomCreate from "./components/RoomCreate";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

export default function App() {
  const [token, setToken] = React.useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

 return (
   <Router>
    {token && (
     <div>
       <Navbar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/room" element={<Rooms />} />
         <Route path="/create" element={<RoomCreate />} />
       </Routes>
     </div>
     )}
   </Router>
 );
}