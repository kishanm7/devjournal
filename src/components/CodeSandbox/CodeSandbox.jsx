import { useState, useRef, useEffect } from 'react';
import './CodeSandbox.css';

export default function CodeSandbox({ starterCode, challenge }) {
  const [code, setCode] = useState(starterCode || '');
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const handleRun = () => {
    setIsRunning(true);
    setOutput([]);

    const logs = [];
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Override console methods to capture output
    console.log = (...args) => {
      logs.push({ type: 'log', content: args.map(formatArg).join(' ') });
    };
    console.warn = (...args) => {
      logs.push({ type: 'warn', content: args.map(formatArg).join(' ') });
    };
    console.error = (...args) => {
      logs.push({ type: 'error', content: args.map(formatArg).join(' ') });
    };

    try {
      // Use Function constructor for safer eval
      const fn = new Function(code);
      fn();
    } catch (err) {
      logs.push({ type: 'error', content: `${err.name}: ${err.message}` });
    }

    // Restore console methods
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;

    // Show output with a slight delay for effect
    setTimeout(() => {
      setOutput(logs);
      setIsRunning(false);
    }, 200);
  };

  const handleReset = () => {
    setCode(starterCode || '');
    setOutput([]);
  };

  const formatArg = (arg) => {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'object') {
      try { return JSON.stringify(arg, null, 2); } catch { return String(arg); }
    }
    return String(arg);
  };

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle tab key in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setCode(code.substring(0, start) + '  ' + code.substring(end));
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="sandbox" id="code-sandbox">
      {/* Toolbar */}
      <div className="sandbox-toolbar">
        <div className="sandbox-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Interactive Playground
        </div>
        <div className="sandbox-actions">
          <button className="sandbox-btn reset" onClick={handleReset} title="Reset code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Reset
          </button>
          <button
            className={`sandbox-btn run ${isRunning ? 'running' : ''}`}
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="spinner"></span>
                Running...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="sandbox-editor">
        <div className="sandbox-line-numbers" ref={lineNumbersRef}>
          {Array.from({ length: lineCount }).map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="sandbox-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>

      {/* Output */}
      {output.length > 0 && (
        <div className="sandbox-output animate-fade-in">
          <div className="sandbox-output-header">Console Output</div>
          <div className="sandbox-output-content">
            {output.map((line, i) => (
              <div key={i} className={`sandbox-output-line ${line.type}`}>
                <span className="output-prefix">
                  {line.type === 'error' ? '✕' : line.type === 'warn' ? '⚠' : '›'}
                </span>
                <pre>{line.content}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge */}
      {challenge && (
        <div className="sandbox-challenge">
          <button
            className="sandbox-challenge-toggle"
            onClick={() => setShowChallenge(!showChallenge)}
          >
            <span>🎯 Try This Challenge</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ transform: showChallenge ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {showChallenge && (
            <p className="sandbox-challenge-text animate-fade-in">{challenge}</p>
          )}
        </div>
      )}
    </div>
  );
}
