import React, { useState, useEffect } from 'react'
import fireDb from '../firebase';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';

const Home = () => {

  const [data, setData] = useState({});

  useEffect(() => {
    fireDb.child("tasks").on("value", (snapshop) => {
      if (snapshop.val() !== null) 
      {
        setData({...snapshop.val()})
      }

      else
      {
        setData({})
      }
    })

    return () => {
      setData({})
    }
  }, [])  

  const onDelete = (id) => {
    if (window.confirm("Você tem certeza que quer apagar esta tarefa?")) 
    {
      fireDb.child(`tasks/${id}`).remove((err) => {
        if(err)
        {
          toast.error(err)
        }

        else
        {
          toast.success("Tarefa apagada com sucesso!")
        }
      })
    }
  }

    return (
      <div className="content">
        <table className="styledTable">
          <thead>
            <tr>
              <th>Número</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Descrição completa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].title}</td>
                  <td>{data[id].description}</td>
                  <td>{data[id].fullDescription}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btnEdit">Editar</button>
                    </Link>
                    <button className="btn btnDelete" onClick={() => onDelete(id)}>Apagar</button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btnEdit">Visualizar</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
}

export default Home