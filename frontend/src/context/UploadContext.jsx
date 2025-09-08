import { createContext, useContext, useState } from 'react'

const UploadContext = createContext()

export const UploadProvider = ({ children }) => {
  const [excelData, setExcelData] = useState([]); // Full row-wise data
const [headers, setHeaders] = useState([]);     // Column headers

const [chartLabels, setChartLabels] = useState([]);
const [chartData, setChartData] = useState([]);

 const [labels, setLabels] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [chartTitle, setChartTitle] = useState('My Chart');
  const [xLabel, setXLabel] = useState('X Axis');
  const [yLabel, setYLabel] = useState('Y Axis');
const [bgColors, setBgColors] = useState('');
const [borderColors, setBorderColors] = useState('');
  // file data
  const [fileName,setFileName] = useState([])
  const[fileSize,setFileSize] = useState([])
  
  return (
    <UploadContext.Provider value={{ chartLabels, setChartLabels, chartData, setChartData,excelData, setExcelData, headers, setHeaders, labels, dataSet, setLabels, setDataSet, chartType, setChartType, chartTitle, setChartTitle, xLabel, setXLabel, yLabel, setYLabel ,fileName,setFileName,fileSize,setFileSize,bgColors,setBgColors,borderColors,setBorderColors}}>
      {children}
    </UploadContext.Provider>
  )
}

export const useUpload = () => useContext(UploadContext)

