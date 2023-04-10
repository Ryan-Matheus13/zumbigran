import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
// import Highcharts from "highcharts";

import { Player } from "@lottiefiles/react-lottie-player";
import { VscBell } from "react-icons/vsc";

import "./Dashboard.css";
import loadingJson from "../assets/lottie/loading.json";
import Chart from "../components/Chart";

const tooltipCustom = {
  container: {
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#9e9e9e",
    padding: "0.31rem  0.62rem",
  },
  body: {
    padding: "0.31rem  0.62rem",
    color: "#9e9e9e",
  },
  bodyValue: {
    color: "#f93855c2",
  },
};

const lineGraph = {
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ["#555"],
    },
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "category",
    categories: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    labels: {
      style: {
        colors: [
          "#878787de",
          "#878787de",
          "#878787de",
          "#878787de",
          "#878787de",
          "#878787de",
          "#878787de",
        ],
      },
    },
  },
  colors: ["#f93854"],
  legend: {
    labels: {
      colors: ["#fff"],
    },
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
      var category = w.globals.categoryLabels[dataPointIndex];

      return `
            <div style='background-color: #eee; border-radius: 0.31rem; overflow: hidden; border: none'>
              <div style='background-color: #9e9e9e; padding: 0.31rem 0.62rem;'>
                <span>${category}</span>
              </div>
              <div style='padding: 0.31rem 0.62rem; color: #9e9e9e;'>
                <span>Infectados: </span>
                <span style='color: #f93855c2;'>${data}</span>
              </div>
            </div>
          `;
    },
  },
};

const donutGraph = {
  chart: {
    width: 380,
    type: "donut",
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  legend: {
    position: "left",
    offsetY: 0,
    height: 230,
  },
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("ryan!");
  const [data, setData] = useState([
    {
      name: "Infectados",
      data: [10, 13, 16, 17, 17, 19, 22],
    },
  ]);
  const [data2, setData2] = useState([15, 23, 98, 7])
  const [options, setOptions] = useState();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);


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
          <div className="content-header">
            <h1>Olá, {user}</h1>

            <button className="notification-button">
              <VscBell fontSize={22} />
            </button>
          </div>
          <div className="row-dashboard">
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Infectados</h2>
              </div>
              <div id="infectados">
                <Chart options={lineGraph} series={data} type={"area"}/>
              </div>
            </div>
            <div className="content-container" style={{ flex: 1.28 }}>
              <div className="card-header">
                <h2>Inventário</h2>
              </div>
              <div id="graph1"></div>
            </div>
          </div>
          <div className="row-dashboard">
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de águas</h2>
                <div>
                  <Chart options={donutGraph} series={data2} type={"donut"}/>
                </div>
              </div>
            </div>
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de alimentação</h2>
              </div>
            </div>
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de medicações</h2>
              </div>
            </div>
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de Munições</h2>
              </div>
            </div>
          </div>
          <div className="row-dashboard">
            <div
              className="content-container"
              style={{ flex: 1, marginBottom: 20 }}
            >
              <div className="card-header">
                <h2>Teste</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
