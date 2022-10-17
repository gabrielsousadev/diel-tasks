import React, { useEffect, useState } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search?task=${search}`)
    setSearch("")
  }

  return (
    <div className="header">
      <p className="logo">Tasks</p>
      <div className="headerRight">
        <form onSubmit={handleSubmit} className="form">
          <input 
            type="text"
            className="inputfield"
            placeholder="Pesquisar tarefa.."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
           />
        </form>
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
