import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/")
    {
        setActiveTab("Home");
    }

    else if(location.pathname === "/add")
    {
        setActiveTab("AddTask");
    }

    else if(location.pathname === "/about")
    {
        setActiveTab("About");
    }
  }, [location])

  return (
    <div className="header">
      <p className="logo">Tasks</p>
      <div className="headerRight">
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddTask" ? "active" : ""}`}
            onClick={() => setActiveTab("AddTask")}
          >
            Adicionar Tarefa
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            Sobre
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
