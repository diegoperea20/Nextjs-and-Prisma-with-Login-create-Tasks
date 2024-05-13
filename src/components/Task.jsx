"use client"
import React, { useEffect, useState } from 'react';
import "./task.css"; 
import { useRouter } from "next/navigation";
import { signOut, useSession } from 'next-auth/react';

function Task() {
    const { data: session } = useSession();
    const user = session.user.username;
    const id = session.user.user_id;
    const [token, setToken] = useState('');
    const router = useRouter();

    const same=() => {
        router.push('/home/task/same');
       /*  window.location.href = '/home/task/same'; */
      }

      const home=() => {
        router.push('/home');
        /* window.location.href = '/home'; */
      } 

      //tasks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const[editing , setEditing] = useState(false);
  const[id_task , setId_task] = useState('');

  const [tasks, setTasks] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!editing){
      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          title,
          description,
        }),
      })
      const data = await response.json();
      console.log(data);
      setTitle('');
      setDescription('');
    } else {
      const response = await fetch(`/api/tasks/${id_task}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          title,
          description,
        }),
      })
      const data = await response.json();
      console.log(data);
      setEditing(false);
      setId_task('');
      setTitle('');
      setDescription('');
    }

    await getTasks();
    
  };

  const getTasks = async (user) => {
    const response = await fetch(`/api/task/${user}`);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks(user);
  },  );


  const deleteTask = async (id_task) => {
    const response = await fetch(`/api/tasks/${id_task}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    await getTasks(user);
  };

  const editTask = async (id_task, user) => {
    const response = await fetch(`/api/tasks/${id_task}/${user}`);
    const data = await response.json();
    console.log(data);
    
    // Verifica que la respuesta contenga al menos un objeto
    if (data.length > 0) {
      const task = data[0];

      // Captura el id y title desde el objeto task
      const id = task.id || '';
      const title = task.title || '';

      setEditing(true);
      setId_task(id_task);
      setTitle(title);
      setDescription(task.description || ''); // Asegurar que el valor esté definido
    }
  };
   
  
   const canceledit=() => {
        setEditing(false);
         setTitle('');
      setDescription('');
      }


  return (
    <div className="darkTheme">
    <h1>Task</h1>
    <button onClick={same}>Same</button>
    <button onClick={home}>Home</button>
    <br/>
    <br/>
    <div >
      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
              <input
          
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title } // Agrega el operador ?? para proporcionar un valor predeterminado
          placeholder="Add a title"
          autoFocus
        />

        <br/>
        <h3>Description</h3>
        <input
          
          type="text"
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder="Add a description"
          
        />
        <br/>
        <br/>
        <button className={editing ? "update" : ""}>
          {editing ?"Update" : "Create"}
        </button>
      </form>
      <br/>
      {editing && (
        <button  className="canceledit" onClick={canceledit}>
          Cancel Edit
        </button>
      )}
    </div>
    <br/>
    <br/>

    <div>
      <div className='table-container'>
      <table >
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="justified">{task.title}</td>
              <td className="justified">{task.description}</td>
              <td>
              <button className="update" onClick={(e) => editTask(task.id, task.user) }>Edit</button>

              <button className="delete" onClick={(e) => deleteTask(task.id)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  )
}

export default Task