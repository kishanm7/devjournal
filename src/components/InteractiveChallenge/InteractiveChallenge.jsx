import React, { useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import './InteractiveChallenge.css';

export default function InteractiveChallenge({ title, description, initialCode, expectedOutput }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect
  const { addXp } = useGamification();

  const handleRun = () => {
    try {
      // Very basic evaluation for simulation purposes
      // In a real app, use a safe sandboxed iframe or a service
      
      let capturedOutput = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput.push(args.join(' '));
      };

      // eslint-disable-next-line no-new-func
      const func = new Function(code);
      func();

      console.log = originalConsoleLog;
      const resultString = capturedOutput.join('\n').trim();
      setOutput(resultString);

      if (resultString === expectedOutput) {
        setStatus('correct');
        addXp(25, 'Challenge Solved!');
      } else {
        setStatus('incorrect');
      }
    } catch (err) {
      setOutput(err.toString());
      setStatus('incorrect');
    }
  };

  return (
    <div className="interactive-challenge card">
      <div className="challenge-header">
        <span className="challenge-badge">MICRO CHALLENGE</span>
        <h3>{title}</h3>
      </div>
      <p className="challenge-desc">{description}</p>
      
      <div className="challenge-editor">
        <textarea 
          value={code} 
          onChange={(e) => {
            setCode(e.target.value);
            setStatus('idle');
          }}
          spellCheck="false"
        ></textarea>
      </div>

      <div className="challenge-actions">
        <button className="btn-primary-warm" onClick={handleRun}>Run Code</button>
      </div>

      {output && (
        <div className={`challenge-output ${status}`}>
          <div className="output-header">
            <span>Console Output</span>
            {status === 'correct' && <span className="status-badge success">Passed</span>}
            {status === 'incorrect' && <span className="status-badge error">Failed</span>}
          </div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
