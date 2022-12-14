import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import fireDb from "../firebase";
import "./AddEdit.css";

const initialState = {
  title: "",
  description: "",
  date: "",
  days: "",
  priority: ""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { title, description, priority, date, days } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fireDb.child("tasks").on("value", (snapshop) => {
      if (snapshop.val() !== null) {
        setData({ ...snapshop.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !priority || !date || !days) {
      toast.error("Por favor preencher todas as informações.");
    } else {
      if (!id) {
        fireDb.child("tasks").push(state, (error) => {
          if (error) {
            toast.error(error);
          } else {
            toast.success("Tarefa adicionada com sucesso.");
          }
        });
      } else {
        fireDb.child(`tasks/${id}`).set(state, (error) => {
          if (error) {
            toast.error(error);
          } else {
            toast.success("Tarefa Atualizada com sucesso.");
          }
        });
      }

      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div className="content">
      <form className="formFields" onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Título tarefa"
          value={title || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Breve descrição da tarefa"
          value={description || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="date">Data</label>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Data"
          value={date || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="days">Dias</label>
        <input
          type="number"
          id="days"
          name="days"
          placeholder="Dias"
          value={days || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="priority">Prioridade</label>
        <input
          type="text"
          id="priority"
          name="priority"
          placeholder="Prioridade"
          value={priority || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Atualizar" : "Salvar"} />
      </form>
    </div>
  );
};

export default AddEdit;
