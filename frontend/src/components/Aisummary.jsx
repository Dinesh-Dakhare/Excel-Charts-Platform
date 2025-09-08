import React from 'react'
import ReactMarkdown from "react-markdown";
const Aisummary = ({ getSummary, summary, copyToClipboard, copied }) => {
  return (
      <div className="p-4 border rounded shadow bg-white w-full max-w-[60rem]">
      <button
        onClick={getSummary}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate AI Summary
      </button>

      {summary && (
        <div className="mt-4 p-3 border rounded bg-gray-50 relative">
          <h2 className="font-bold mb-2">AI Summary:</h2>
          <ReactMarkdown>{summary}</ReactMarkdown>
         

          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Aisummary