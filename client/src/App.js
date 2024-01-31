// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");

  const handleSubmit = async () => {
    try {
      const payload = {
        language: language,
        code
      };
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Error connecting to server");
      }
    }
  }

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <div>
        <label>Language:</label>
        <select value={language} onChange={(e) => {
          setLanguage(e.target.value);
        }}>
          <option value="cpp">c++</option>
          <option value="py">python</option>
        </select>
      </div>
      <br />
      <textarea value={code} onChange={(e) => { setCode(e.target.value) }} cols="75" rows="20"></textarea>
      <br />-
      <button onClick={handleSubmit}>RUN</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
