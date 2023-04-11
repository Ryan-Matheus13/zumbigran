import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

import "./Home.css";
import background from "../assets/images/background.jpg";
import loadingJson from "../assets/lottie/loading.json";
import Card from "../components/Card";
import Input from "../components/Input";

export default function Home() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("register");
  const [loading, setLoading] = useState(true);
  const [loadingCard, setLoadingCard] = useState(false);

  const [email, setEmail] = useState();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleMode = () => {
    if (mode == "register") {
      setMode("login");
    } else {
      setMode("register");
    }
  };

  const handleValidation = () => {
    setLoadingCard(true);
    setMessage("");
    if (!email || !user || !password || !passwordConfirm) {
      setMessage("Preencha todos os campos!");
    }
    if (password !== passwordConfirm) {
      setMessage("Senhas divergentes!");
    }
    setTimeout(() => {
      setLoadingCard(false);
      navigate("dashboard");
    }, 1000);
  };

  return (
    <div className="container">
      {loading && (
        <div className="loading-container-full">
          <Player
            src={loadingJson}
            className="player"
            loop
            autoplay
            style={{ width: 100 }}
          />
        </div>
      )}
      {!loading && (
        <>
          <div className="layer" />
          <img className="background" src={background} alt="" />
          <section className="content home-content">
            <div className="home-content-text">
              <h1 className="home-title">Bem vindo à zumbigran!</h1>
              <p className="home-description">
                Aqui, você pode se conectar com outros membros, descobrir novas
                perspectivas e se envolver em conversas emocionantes. Não perca
                a chance de explorar o melhor da Zumbigran - você nunca sabe o
                que pode encontrar em um apocalipse zumbi global!
              </p>
            </div>
            <div className="home-content-card">
              <Card>
                {loadingCard && (
                  <div className="loading-container">
                    <Player
                      src={loadingJson}
                      className="player"
                      loop
                      autoplay
                      style={{ width: 100 }}
                    />
                  </div>
                )}

                {!loadingCard && mode == "register" && (
                  <>
                    <Input
                      onchange={setEmail}
                      value={email}
                      label={"Email"}
                      type={"email"}
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                      }}
                    >
                      <Input
                        value={password}
                        onchange={setPassword}
                        label={"Nome"}
                        type={"text"}
                        style={{ flex: 1 }}
                      />
                      <Input
                        value={passwordConfirm}
                        onchange={setPasswordConfirm}
                        label={"Sobrenome"}
                        type={"text"}
                        style={{ flex: 1 }}
                      />
                    </div>
                    <Input
                      onchange={setUser}
                      value={user}
                      label={"Usuário"}
                      type={"text"}
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        marginBottom: message ? 0 : 30,
                      }}
                    >
                      <Input
                        value={password}
                        onchange={setPassword}
                        label={"Senha"}
                        type={"password"}
                        style={{ flex: 1 }}
                      />
                      <Input
                        value={passwordConfirm}
                        onchange={setPasswordConfirm}
                        label={"Confirme a senha"}
                        type={"password"}
                        style={{ flex: 1 }}
                      />
                    </div>
                    {message && (
                      <span className="error-message">{message}</span>
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={handleValidation}
                    >
                      Registrar
                    </button>
                    <button className="btn btn-secundary" onClick={handleMode}>
                      Entrar
                    </button>
                  </>
                )}

                {!loadingCard && mode == "login" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,

                        backgroundColor: "red",
                      }}
                    ></div>
                    <Input
                      onchange={setUser}
                      value={user}
                      label={"Usuário"}
                      type={"text"}
                      style={{ flex: 1 }}
                    />
                    <Input
                      onchange={setPassword}
                      value={password}
                      label={"Senha"}
                      type={"password"}
                      style={{ flex: 1, marginBottom: message ? 0 : 30 }}
                    />
                    {message && (
                      <span className="error-message">{message}</span>
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={handleValidation}
                    >
                      Entrar
                    </button>
                    <button className="btn btn-secundary" onClick={handleMode}>
                      Registrar
                    </button>
                  </>
                )}
              </Card>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
