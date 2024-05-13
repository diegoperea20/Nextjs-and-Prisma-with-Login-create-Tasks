"use client"
import React, { useEffect, useState } from 'react';
import "./changepasword.css"; 
import { useRouter } from "next/navigation";
import { signOut, useSession } from 'next-auth/react';


function Changepassword() {
    const { data: session } = useSession();
    const router = useRouter();
    const user = session.user.username;
    const id = session.user.user_id;
  const [token, setToken] = useState('');
  const [password, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const[same_password, setSame_password] = useState("");

  const [error, setError] = useState(""); // Nueva variable de estado para el mensaje de error
  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const requirements = [
      /\d/,
      /[a-z]/,
      /[A-Z]/,
      /[!@#$%^&*]/,
      /.{8,}/,
      /\S/,
    ];
    const errorMessages = [
      "Debe incluir al menos un número.",
      "Debe incluir al menos una letra minúscula.",
      "Debe incluir al menos una letra mayúscula.",
      "Debe incluir al menos un carácter especial.",
      "La longitud de la contraseña debe ser igual o mayor a 8 caracteres.",
      "No debe contener espacios en blanco.",
    ];

    const errors = [];
    for (let i = 0; i < requirements.length; i++) {
      if (!requirements[i].test(value)) {
        errors.push(errorMessages[i]);
      }
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
    } else {
      setError("");
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const response = await fetch(`/api/loginup/${id}`);
        if (response.ok) {
          const user = await response.json();
          setEmail(user.email);
        } else {
          throw new Error('Error al obtener el email');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getEmail();

    // Si necesitas hacer alguna limpieza cuando el componente se desmonta, puedes devolver una función en useEffect
    // return () => {
    //   // Código de limpieza
    // };
  }, [id]); // Añade [id] si quieres que useEffect se ejecute de nuevo cuando id cambie

  const Home = () => {
    router.push('/home');
    // Redireccionar a la página de cambio de contraseña
    /* window.location.href = '/home'; */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== same_password) {
      window.alert("Las contraseñas no coinciden");
      return;
    }

    const response = await fetch(`/api/loginup/${id}`, {  // Cambia la URL para que coincida con la ruta de inicio de sesión en tu backend
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        email ,
        password,
      }),
    });

    if (response.status === 200) {
        // La contraseña se ha modificado exitosamente
        setNewPassword("");
        setSame_password("");
        console.log('Contraseña modificada correctamente');
        window.alert('Contraseña modificada correctamente');
        signOut();
      } else {
        // Ocurrió un error al modificar la contraseña
        console.log('Error al modificar la contraseña');
      } 
  };




  return (
    <div className="darkTheme">
    <h1>Changepassword, {user} , ID:{id}! </h1>
    <button onClick={Home}>Home</button>
    <br/>
    <br/>
    <form onSubmit={handleSubmit}>
    <h3>New Password</h3>
    <input
          type="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          value={password}
          placeholder="NewPassword"
        />
        
        {/* Mostrar la condición de validación de la contraseña */}
        {error && <p className="errorMessage">{error}</p>}
        
        
        <h3>Confrim New Password</h3>
        <input
          type="password"
          onChange={(e) => {
            setSame_password(e.target.value);
            
          }}
          value={same_password}
          placeholder="Validation Password"
          
        />
        <h3>Email</h3>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder={email}
        />
        <br/>
        <br/>
        <button className="modify">Update</button>
    </form>
    
    </div>
  );
}

export default Changepassword;
