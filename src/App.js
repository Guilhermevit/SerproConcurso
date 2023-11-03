import React, { useState, useEffect } from "react";
import "./App.css";
import jsonData from "./final2.json";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState("todos");

  useEffect(() => {
    const candidatesWithRanking = jsonData.map((candidate, index) => ({
      ...candidate,
      originalRanking: index + 1,
    }));
    setCandidates(candidatesWithRanking);
  }, []);

  function getHighlightLimit(filterType) {
    switch (filterType) {
      case "todos":
        return 602;
      case "negr":
        return 120;
      case "def":
        return 121;
      default:
        return 602;
    }
  }

  const filteredCandidates = candidates.filter((candidate) => {
    if (
      searchName &&
      !candidate.name.toLowerCase().includes(searchName.toLowerCase())
    ) {
      return false;
    }
    if (filterType === "def" && candidate.vaga !== "def") {
      return false;
    }
    if (filterType === "negr" && candidate.vaga !== "negr") {
      return false;
    }
    if (
      filterType === "highScore" &&
      (candidate.newScore > 100 || !candidate.newScore)
    ) {
      return false;
    }
    return true;
  });

  if (filterType === "highScore") {
    filteredCandidates.sort((a, b) => b.newScore - a.newScore);
  }

  function getSuffix(vaga) {
    if (vaga === "def") return "*";
    if (vaga === "negr") return "**";
    return "";
  }

  return (
    <div className="App">
      <div className="filters">
        <input
          type="text"
          placeholder="Seu nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />{" "}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="todos"> Todos </option>{" "}
          <option value="negr"> Negros </option>{" "}
          <option value="def"> Deficientes </option>{" "}
          <option value="highScore"> Maior Nota Prática </option>{" "}
        </select>{" "}
      </div>{" "}
      {filteredCandidates.length > 0 && (
        <table>
          <thead>
            <tr>
              <th> Class </th> <th className="left"> Nome do Candidato </th>{" "}
              <th> Nota Final(CB) </th> <th> Nota Final(CE) </th>{" "}
              <th> Pratica </th> <th> Soma </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {filteredCandidates.map((candidate, index) => (
              <tr
                key={candidate.registrationNumber}
                className={
                  index < getHighlightLimit(filterType) ? "grayHighlight" : ""
                }
              >
                <td> {candidate.originalRanking}º </td>{" "}
                <td className="left">
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
