import React, { useState, useEffect } from 'react'
import fireDb from '../firebase';
import { useParams, Link } from 'react-router-dom';
import './View.css'

const View = () => {

  const [task, setTask] = useState({})
  const {id} = useParams()

  useEffect(() => {
    fireDb
    .child(`tasks/${id}`)
    .get()
    .then((snapshot) => {
      if(snapshot.exists())
      {
        setTask({...snapshot.val()})
      }

      else
      {
        setTask({})
      }
    })
  }, [id])
  
  console.log("task", task)

  return (
    <div className="content">
        <div className="card">
          <div className="cardHeader">
            <p>Detalhes da tarefa</p>
          </div>
          <div className="container">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Título: </strong>
            <span>{task.title}</span>
            <br />
            <br />
            <strong>Descrição: </strong>
            <span>{task.description}</span>
            <br />
            <br />
            <strong>Descrição completa: </strong>
            <span>{task.fullDescription}</span>
            <br />
            <br />
            <Link to="/">
              <button className="btn btnEdit">Voltar</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default View