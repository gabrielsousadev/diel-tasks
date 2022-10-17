import React, { useState, useEffect } from 'react'
import fireDb from '../firebase';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';

const Home = () => {

  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);


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
  const handleChange = (e) => {
    setSort(true)
    fireDb.child("tasks").orderByChild(`${e.target.value}`).on("value", snapshot => {
      let sortedData = []
      snapshot.forEach((snap) => {
        sortedData.push(snap.val())
      })
      setSortedData(sortedData)
    })
  }
  const handleReset = () => {
    setSort(false)
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
              {!sort && (<th>Ações</th>)}
            </tr>
          </thead>
          {!sort && (
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
          )}
          {sort && (
            <tbody>
              {sortedData.map((item, index) => {
                return (
                  <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.fullDescription}</td>
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
        <label>Listar por:</label>
        <select className="dropdown" name="colValue" onChange={handleChange}>
          <option>Selecione</option>
          <option value="title">Título</option>
          <option value="description">Descrição</option>
          <option value="fullDescription">Descrição completa</option>
        </select>
        <button className="btn btnReset" onClick={handleReset}>Resetar</button>
      </div>
    )
}

export default Home