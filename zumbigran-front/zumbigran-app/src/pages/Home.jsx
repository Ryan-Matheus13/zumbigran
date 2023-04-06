import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import background from "../assets/images/background.jpg";
import Card from "../components/Card";
import Input from "../components/Input";

export default function Home() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("Preencha todos os campos");
  const [mode, setMode] = useState("register");

  const handleMode = () => {
    if (mode == "register") {
      setMode("login");
    } else {
      setMode("register");
    }
  };

  return (
    <div className="container">
      <div className="layer" />
      <img className="background" src={background} alt="" />
      <section className="content home-content">
        <div className="home-content-text">
          <h1 className="home-title">Bem vindo à zumbigran!</h1>
          <p className="home-description">
            Aqui, você pode se conectar com outros membros, descobrir novas
            perspectivas e se envolver em conversas emocionantes. Não perca a
            chance de explorar o melhor da Zumbigran - você nunca sabe o que
            pode encontrar em um apocalipse zumbi global!
          </p>
        </div>
        <div className="home-content-card">
          {mode == "register" && (
            <Card>
              <Input label={"Email"} type={"email"} />
              <Input label={"Usuário"} type={"text"} />
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  marginBottom: message ? 0 : 30,
                }}
              >
                <Input label={"Senha"} type={"password"} style={{ flex: 1 }} />
                <Input
                  label={"Confirme a senha"}
                  type={"password"}
                  style={{ flex: 1 }}
                />
              </div>
              {message && <span className="error-message">{message}</span>}
              <button className="btn btn-primary">Registrar</button>
              <button className="btn btn-secundary" onClick={handleMode}>
                Entrar
              </button>
            </Card>
          )}

          {mode == "login" && (
            <Card>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,

                  backgroundColor: "red",
                }}
              ></div>
              <Input
                onchange={() => setUser()}
                value={user}
                label={"Usuário"}
                type={"text"}
                style={{ flex: 1 }}
              />
              <Input
                onchange={() => setPassword()}
                value={password}
                label={"Senha"}
                type={"password"}
                style={{ flex: 1, marginBottom: message ? 0 : 30 }}
              />
              {message && <span className="error-message">{message}</span>}
              <button className="btn btn-primary">Entrar</button>
              <button className="btn btn-secundary" onClick={handleMode}>
                Registrar
              </button>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
