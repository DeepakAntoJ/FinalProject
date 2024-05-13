import { useState } from 'react'
import './App.css'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faMicrophone} from '@fortawesome/free-solid-svg-icons'

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  async function generateAnswer(e) {
    
    e.preventDefault();
    try {
      const response = await axios({
        url: "",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      console.log(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
      setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"])
    } catch (error) {
      console.log(error);
    }
  }

    function  runSpeechRecog() {
            document.getElementById("result").innerHTML = "Loading text...";
            var output = document.getElementById('result');
            let recognization = new webkitSpeechRecognition();
            recognization.onstart = () => {
            }
            recognization.onresult = (e) => {
                var transcript = e.results[0][0].transcript;
                output.innerHTML = transcript;
            }
            recognization.start();
        }

  return (
    <>
      <a href="https://www.youtube.com/" style={{ position: 'absolute', top: '0', left: '0', margin: '10px', textDecoration: 'none', color: 'white' }}>Image Generator</a>
      <h1>CHAT SVCE</h1>
      <h2>Made by DMD</h2>
      <textarea 
        id='result'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Ask anything">
      </textarea>
      <div className='mic' onClick={runSpeechRecog}>
        <FontAwesomeIcon icon={faMicrophone} />
      </div>
      <button onClick={generateAnswer}>
        Generate answer
      </button>
      <pre style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'auto' }}>{answer}</pre>
    </>
  )
}

export default App
