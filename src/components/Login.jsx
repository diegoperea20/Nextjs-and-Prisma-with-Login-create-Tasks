
"use client"
import React, { useState } from "react";
import "./login.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function Login() {
    const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseNextAuth = await signIn("credentials", {
      redirect: false,
       user,
       password,
      
    })
    /* const response = await fetch(`${API_URL}`, {  // Cambia la URL para que coincida con la ruta de inicio de sesión en tu backend
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        password,
      }),
    }); */

    /* if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      const user_id = data.user_id;

      // Guardar el token en el almacenamiento local (localStorage) para su uso posterior
      localStorage.setItem("token", token);
      localStorage.setItem('user', user);
      localStorage.setItem('id', user_id);
      

      // Redireccionar a la página de inicio después de un inicio de sesión exitoso
      router.push("/home"); // Incluir también la contraseña en la URL
    } else {
      setIncorrectLogin(true);
    } */

    if(responseNextAuth.error){
      setIncorrectLogin(true);
      return;
    }

    router.push("/home");
  };

  return (
    <div className="loginContainer">
    <h1 className="title">Login</h1>
    <form onSubmit={handleSubmit} className="form">
      <h3 className="subtitle">Username</h3>
      <input
        type="text"
        onChange={(e) => setUser(e.target.value)}
        value={user}
        placeholder="Username"
        autoFocus
        className="input"
      />
      <br />
      <h3 className="subtitle">Password</h3>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        className="input"
      />
      <br />
      <br />
      <button type="submit" className="loginButton">
        Login
      </button>
    </form>
    <br />
    <Link href="/loginup" className="registerLink">
      Register
    </Link>

    {incorrectLogin && <p className="errorMessage">Incorrect username or password</p>}
  </div>
    /* https://www.youtube.com/watch?v=Ynkf2ZueKJU */
  );
}

export default Login;
