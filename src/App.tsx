import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/dados");
        const data = await response.json();
        setCandidates(data);
        console.log("Dados recebidos:", data);
      } catch (error) {
        console.error("Erro ao buscar os candidatos:", error);
      }
    }

    fetchData();
  }, []);

  function getSuffix(vaga) {
    if (vaga === "def") return "*";
    if (vaga === "negr") return "**";
    return "";
  }

  return (
    <div className="App">
      {" "}
      {candidates.length > 0 && (
        <table>
          <thead>
            <tr>
              <th> Class </th> <th> Nome do Candidato </th>{" "}
              <th> Nota Final(CB) </th> <th> Nota Final(CE) </th>{" "}
              <th> Pratica </th> <th> Soma </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {candidates.map((candidate, index) => (
              <tr
                key={candidate.registrationNumber}
                className={index < 602 ? "grayHighlight" : ""}
              >
                <td> {index + 1}º </td>{" "}
                <td>
                  {" "}
                  {candidate.name} {getSuffix(candidate.vaga)}{" "}
                </td>{" "}
                <td> {candidate.basicKnowledgeScore} </td>{" "}
                <td> {candidate.specificKnowledgeScore} </td>{" "}
                <td> {candidate.newScore} </td>{" "}
                <td>
                  {" "}
                  {candidate.totalScore
                    ? candidate.totalScore.toFixed(2)
                    : "N/A"}{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>
      )}{" "}
    </div>
  );
}

export default App;
