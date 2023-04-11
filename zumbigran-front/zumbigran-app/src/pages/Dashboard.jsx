import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Player } from "@lottiefiles/react-lottie-player";
import { VscBell } from "react-icons/vsc";


import "./Dashboard.css";
import loadingJson from "../assets/lottie/loading.json";
import Chart from "../components/Chart";
import Table from "../components/Table";
import ActionButtons from "../components/ActionButtons";

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

const colunasInventario = [
  { field: "item", headerName: "Item", width: 530 },
  {
    field: "quant",
    headerName: "Quant.",
    width: 70,
    type: "number",
    valueGetter: (params) => `${params.row.quant} un.`,
  },
];

const colunasSobreviventes = [
  { field: "nome", headerName: "Nome", width: 320 },
  { field: "sobrenome", headerName: "Sobrenome", width: 320 },
  { field: "idade", headerName: "Idade", width: 80 },
  { field: "sexo", headerName: "Sexo", width: 130 },
  { field: "local", headerName: "Ultimo local (latitude/longitude)", width: 230 },
  { field: "acoes", sortable: false, headerName: "Ações", width: 230, renderCell: (params) => params.value },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("ryan!");
  const [infectados, setInfectados] = useState([
    {
      name: "Infectados",
      data: [10, 13, 16, 17, 17, 19, 22],
    },
  ]);
  const [totalInfectados, setTotalInfectados] = useState();

  const [inventario, setinventario] = useState([
    { id: 1, item: "Agua", quant: 35 },
    { id: 2, item: "Bandetes", quant: 42 },
    { id: 3, item: "Gases", quant: 45 },
    { id: 4, item: "Arroz", quant: 16 },
    { id: 5, item: "Lata de feijão", quant: 10 },
    { id: 6, item: "Munição de glock", quant: 150 },
    { id: 7, item: "Soda", quant: 44 },
    { id: 8, item: "Munição de AK-47", quant: 36 },
    { id: 9, item: "ALmondegas", quant: 65 },
    { id: 10, item: "ALmondegas", quant: 65 },
    { id: 11, item: "ALmondegas", quant: 65 },
  ]);

  const [sobreviventes, setSobreviventes] = useState([
    { id: 1, nome: "Antonio", sobrenome: "José", idade: 27, sexo: "Masculino", local: "10.66657 | -11.63827", acoes: <ActionButtons/>},
    { id: 2, nome: "Antoni", sobrenome: "José", idade: 27, sexo: "Masculino", local: "10.66657 | -11.63827", acoes: <ActionButtons/>},
  ]);

  const [aguaOptions, setAguaOptions] = useState({
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
            show: true,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 20,
    },
    stroke: {
      colors: ["#3d3d3d"],
    },
  });
  const [aguaSeries, setAguaSeries] = useState([15, 23, 98, 7]);

  const [alimentacaoOptions, setAlimentacaoOptions] = useState({
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
            show: true,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 20,
    },
    stroke: {
      colors: ["#3d3d3d"],
    },
  });
  const [alimentacaoSeries, setAlimentacaoSeries] = useState([10, 5, 3, 1]);

  const [medicacoesOptions, setMedicacoesOptions] = useState({
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
            show: true,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 20,
    },
    stroke: {
      colors: ["#3d3d3d"],
    },
  });
  const [medicacoesSeries, setMedicacoesSeries] = useState([10, 17, 42, 34]);

  const [municoesOptions, setMunicoesOptions] = useState({
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
            show: true,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 20,
    },
    stroke: {
      colors: ["#3d3d3d"],
    },
  });
  const [municoesSeries, setMunicoesSeries] = useState([16, 29, 38, 66]);

  useEffect(() => {
    aguaOptions.labels = ["Agua", "Suco", "Soda", "Coca"];
    alimentacaoOptions.labels = [
      "Arroz",
      "Lata de feijão",
      "Cereal",
      "Legumes",
    ];
    medicacoesOptions.labels = ["Dipirona", "Paracetamol", "Gases", "Bandetes"];
    municoesOptions.labels = [
      "Munição de glock",
      "Munição de AK-47",
      "Munição de Barret",
      "Granada",
    ];
    let sum = 0;

    for (let i = 0; i < infectados[0].data.length; i++) {
      sum += infectados[0].data[i];
    }
    setTotalInfectados(sum);
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
            <div className="pontos-container">
              <span>Inventário:</span>
              {"120"}pts
            </div>
            <button className="notification-button">
              <VscBell fontSize={22} />
            </button>
          </div>
          <div className="row-dashboard">
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>
                  Total de infectados até o momento <br />{" "}
                  <span style={{fontSize: 18}}>({totalInfectados} Pessoas)</span>
                </h2>
              </div>
              <div id="infectados">
                <Chart options={lineGraph} series={infectados} type={"area"} />
              </div>
            </div>
            <div className="content-container" style={{ flex: 1.28 }}>
              <div className="card-header">
                <h2>Inventário</h2>
              </div>
              <div style={{ height: "100%" }}>
                <Table rows={inventario} columns={colunasInventario} />
              </div>
            </div>
          </div>
          <div className="row-dashboard">
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de águas</h2>
                <div>
                  <Chart
                    options={aguaOptions}
                    series={aguaSeries}
                    type={"donut"}
                  />
                </div>
              </div>
            </div>
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de alimentação</h2>
                <div>
                  <Chart
                    options={alimentacaoOptions}
                    series={alimentacaoSeries}
                    type={"donut"}
                  />
                </div>
              </div>
            </div>
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de medicações</h2>
                <div>
                  <Chart
                    options={medicacoesOptions}
                    series={medicacoesSeries}
                    type={"donut"}
                  />
                </div>
              </div>
            </div>
            <div className="content-container" style={{ flex: 1 }}>
              <div className="card-header">
                <h2>Média de Munições</h2>
                <div>
                  <Chart
                    options={municoesOptions}
                    series={municoesSeries}
                    type={"donut"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row-dashboard">
            <div
              className="content-container"
              style={{ flex: 1, minHeight: 600, marginBottom: 20 }}
            >
              <div className="card-header">
                <h2>Lista de sobreviventes cadastrados</h2>
              </div>
              <div style={{ height: "100%" }}>
                <Table rows={sobreviventes} columns={colunasSobreviventes} />
              </div>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
