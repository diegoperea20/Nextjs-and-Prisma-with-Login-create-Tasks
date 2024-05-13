"use client"
import React, { useState ,useEffect} from "react";
import Link from "next/link";
import "./loginup.css"; 

function Loginup() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (password !== same_password) {
        window.alert("Las contraseñas no coinciden");
        return;
      }
      const response = await fetch(`/api/loginup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          password,
          email,
        }),
      });
      const data = await response.json();
  
      if (response.status === 200) {
        // Registro exitoso, restablecer los campos y borrar el mensaje de error
        setUser("");
        setEmail("");
        setPassword("");
        setError("");
        window.location.href = `/`;
      } else {
        // Mostrar el mensaje de error en caso de que ocurra un error en el registro
        setError(data.error);
      }
    };
  
    // Botón de registro con Google no medio sale error
   /*  useEffect(() => {
      const initializeGoogleAuth = () => {
        window.gapi.load("auth2", () => {
          window.gapi.auth2
            .getAuthInstance() // Cambiar de init a getAuthInstance
            .then(() => {
              console.log("Google API initialized");
            })
            .catch((error) => {
              console.log("Error initializing Google API:", error);
            });
        });
      };
  
      const loadGoogleScript = () => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.onload = () => {
          initializeGoogleAuth();
        };
        document.head.appendChild(script);
      };
  
      loadGoogleScript();
    }, []);
  
    const handleGoogleRegister = async (response) => {
      try {
        const profile = response.getBasicProfile();
        const userFromGoogle = profile.getName();
        const emailFromGoogle = profile.getEmail();
        const passwordFromGoogle = generateRandomPassword();
  
        setUser(userFromGoogle);
        setEmail(emailFromGoogle);
        setPassword(passwordFromGoogle);
  
        handleSubmit();
      } catch (error) {
        console.log("Error en el registro con Google:", error);
      }
    };
  
    const generateRandomPassword = () => {
    const length = 8; // Longitud de la contraseña
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
  
    return password;
  }; */
  
  
  
  
  //------------------------------
    
  
    return (
      <div className="darkTheme">
        <h1>Login UP</h1>
        <form onSubmit={handleSubmit}>
          <h3>Username</h3>
          <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            placeholder="Username"
            autoFocus
          />
          <br />
          
          <h3>Password</h3>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            value={password}
            placeholder="Password"
            autoFocus
          />
          
          {/* Mostrar la condición de validación de la contraseña */}
          {error && <p className="errorMessage">{error}</p>}
          
          
          <h3>Confirm Password</h3>
          <input
            type="password"
            onChange={(e) => {
              setSame_password(e.target.value);
              
            }}
            value={same_password}
            placeholder="Validation Password"
            autoFocus
          />
          
          <h3>Email</h3>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            autoFocus
          />
          <br />
          <br />
          <button disabled={error.length > 0 && error !== "User already exists"}>Register</button>
  
        </form>
        <br/>
        <Link href="/">Login In</Link>
        <br/>
        <br/>
         {/* Botón de registro con Google 
  
         <GoogleLogin
          clientId="ID_CLIENT_GOOGLE"
          buttonText="Register with Google"
          onSuccess={handleGoogleRegister}
          onFailure={(error) => console.log("Error in Google registration:", error)}
          cookiePolicy="single_host_origin"
        */}
      </div>
    );
  }
  
  export default Loginup;
  