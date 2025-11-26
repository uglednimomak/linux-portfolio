import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../../services/geminiService';

interface Log {
  type: 'input' | 'output';
  content: string;
}

export const TerminalApp: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([
    { type: 'output', content: 'Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.5.0-generic x86_64)' },
    { type: 'output', content: ' * Documentation:  https://help.ubuntu.com' },
    { type: 'output', content: ' * Management:     https://landscape.canonical.com' },
    { type: 'output', content: ' * Support:        https://ubuntu.com/advantage' },
    { type: 'output', content: '' },
    { type: 'output', content: 'System information as of ' + new Date().toUTCString() },
    { type: 'output', content: '' },
    { type: 'output', content: 'Type "help" for a list of commands. Type "ai <question>" to ask the intelligent agent.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setLogs(prev => [...prev, { type: 'input', content: trimmed }]);
    setInput('');
    setIsProcessing(true);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
  help      - Show this help message
  clear     - Clear terminal history
  ls        - List directory contents
  whoami    - Display current user
  ai <msg>  - Ask the AI assistant anything (Gemini powered)`;
        break;
      case 'clear':
        setLogs([]);
        setIsProcessing(false);
        return;
      case 'ls':
        output = 'Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos';
        break;
      case 'whoami':
        output = 'visitor';
        break;
      case 'ai':
        if (!args) {
          output = 'Usage: ai <question>';
        } else {
          output = await getGeminiResponse(args);
        }
        break;
      default:
        output = `Command '${command}' not found. Type 'help' for list of commands.`;
    }

    setLogs(prev => [...prev, { type: 'output', content: output }]);
    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="h-full bg-[#300a24] text-gray-100 font-mono text-sm p-2 overflow-auto" onClick={() => document.getElementById('term-input')?.focus()}>
      {logs.map((log, i) => (
        <div key={i} className={`mb-1 ${log.type === 'input' ? 'mt-2' : 'text-gray-300'}`}>
          {log.type === 'input' ? (
            <div>
              <span className="text-[#8ae234] font-bold">visitor@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-[#729fcf] font-bold">~</span>
              <span className="text-white">$ {log.content}</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{log.content}</div>
          )}
        </div>
      ))}

      {isProcessing && <div className="animate-pulse text-gray-400">Processing...</div>}

      <div className="flex items-center mt-2">
        <span className="text-[#8ae234] font-bold">visitor@portfolio</span>
        <span className="text-white">:</span>
        <span className="text-[#729fcf] font-bold">~</span>
        <span className="text-white mr-2">$</span>
        <input
          id="term-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="bg-transparent border-none outline-none flex-1 text-white"
          autoFocus
          disabled={isProcessing}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
