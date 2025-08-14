import React from 'react'

const ExcelDataTable = ({data}) => {
     if (!data || data.length === 0) return <p>No data available</p>;

  const headers = Object.keys(data[0]);
  return (
     <div className="overflow-auto rounded-lg shadow border border-gray-200 w-[60rem] ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 text-sm text-gray-800">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExcelDataTable