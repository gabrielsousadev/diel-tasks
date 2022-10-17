import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import fireDb from '../firebase';
import './AddEdit.css'

const initialState = {
  title: "",
  description: "",
  fullDescription: ""
}

const AddEdit = () => {

  const [state, setState] = useState(initialState)
  const [data, setData] = useState({})
  const {title, description, fullDescription} = state

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!title || !description || !fullDescription)
    {
      toast.error("Por favor preencher todas as informações.")
    }

    else
    {
      fireDb.child("tasks").push(state, (error) => {
        if(error)
        {
          toast.error(error)
        }

        else
        {
          toast.success("Tarefa adicionada com sucesso.");
        }
      })
      setTimeout(() => navigate("/"), 500);
    }
  }

  return (
    <div className="content">
        <form className='form' onSubmit={handleSubmit}>
          <label htmlFor="title">Título</label>
          <input 
            type="text"
            id="title"
            name="title"
            placeholder="Título tarefa"
            value={title}
            onChange={handleInputChange}
             />
          <label htmlFor="description">Descrição</label>
          <input 
            type="text"
            id="description"
            name="description"
            placeholder="Breve descrição tarefa"
            value={description}
            onChange={handleInputChange}
             />
          <label htmlFor="fullDescription">Descrição detalhada</label>
          <input 
            type="text"
            id="fullDescription"
            name="fullDescription"
            placeholder="Descrição completa tarefa"
            value={fullDescription}
            onChange={handleInputChange}
             />
          <input type="submit" value="Save" />
        </form>
    </div>
  )
}

export default AddEdit