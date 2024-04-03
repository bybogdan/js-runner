// src/CodeRunner.tsx
import React, { useState } from 'react'

const CodeRunner: React.FC = () => {
  const [code, setCode] = useState<string>(
    "// Try your code here\nconsole.log('Hello, world!');"
  )
  const [output, setOutput] = useState<string>('')

  const runCode = () => {
    const logMessages: string[] = []
    const originalConsoleLog = console.log

    // Intercept console.log calls
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log = (...args: any[]) => {
      logMessages.push(
        args
          .map((arg) =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(' ')
      )
      originalConsoleLog.apply(console, args)
    }

    try {
      // eslint-disable-next-line no-eval
      eval(code)
      setOutput(`Result:\n${logMessages.join('\n')}`)
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`)
      }
    } finally {
      // Restore original console.log
      console.log = originalConsoleLog
    }
  }

  return (
    <div>
      <textarea
        rows={10}
        cols={50}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={runCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  )
}

export default CodeRunner
