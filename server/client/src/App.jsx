import React from 'react';

import axios from 'axios';
import { BASE_API_URL, URL_2 } from './constants/data';
import CompanySelector from './components/CompanySelector';
import CompanySelector2 from './components/CompanySelector2';
import Loading from './components/Loader';



export default function App() {

  const [dummyData, setDummyData] = React.useState([])
  const [jsonData, setJsonData] = React.useState({})
  const [summary, setSummary] = React.useState([])
  const [pdf, setPdf] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [coreFeatures, setCoreFeatures] = React.useState([])

  const getPlatforms = React.useRef(() => { })

  getPlatforms.current = async function () {
    setLoading(true)
    const { data } = await axios.get(BASE_API_URL + "get_data")
    setDummyData(data)
    setLoading(false)
  }

  async function compare() {
    try {
      if (jsonData.corePlatform === undefined || jsonData.targetPlatform === undefined) {
        alert('Please select both platforms')
        return
      }

      if (jsonData.corePlatform.platformName === jsonData.targetPlatform) {
        alert('Please select different platforms')
        return
      }

      if (jsonData.corePlatform.features.length === 0) {
        alert('Please select features for core platform')
        return
      }
      setLoading(true)
      const { data } = await axios.post(URL_2 + "/api/summarize", {
        data: jsonData
      })
      if (data.message === "success") {
        setPdf(data.data)
        let message = data.data.split('\n').map((line, index) => line.split("\n").join(" "))
        setSummary(message)
        document.getElementById('my_modal_3').showModal()
      }
      else {
        alert('Error')
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  function setSelectedFeaturesWithData(desc) {
    if(desc === "") return
    desc = desc.replace(/-/g, '').replace(/ /g, ' ').trim()
  

    let index = coreFeatures.indexOf(desc)
    if (index !== -1) {
      coreFeatures.splice(index, 1)
      setCoreFeatures([...coreFeatures])
      return
    }
    setCoreFeatures([...coreFeatures, desc])
  }

  async function generatePDF() {
    
    const {data} = await axios.get(URL_2 + "/api/generate-pdf?"+
    new URLSearchParams({
      text: pdf
    })
    ,{
      responseType: 'blob', 
    })

    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'result.pdf';
    link.click();


  }

  React.useEffect(() => {
    getPlatforms.current()
  }, [])

  return (
    <>
      <div className='bg-[#D4D3DD] w-full m-auto py-12 '>
        <div className='flex justify-around items-start w-11/12 md:w-10/12 mx-auto flex-col md:flex-row'>
          <div className='p-10 my-2 w-full md:w-[40%] border rounded-2xl bg-gray-100'>
            {
              dummyData.length > 0 &&
              <CompanySelector companyData={dummyData} setData={setJsonData} data={jsonData} setCoreFeatures={setCoreFeatures} coreFeatures={coreFeatures} />
            }
          </div>
          <div className='w-full md:w-[40%]'>
            <div className='p-10 my-2 border rounded-2xl bg-gray-100'>
              {
                dummyData.length > 0 && (
                  <>
                    <CompanySelector2 companyData={dummyData} setData={setJsonData} />
                  </>
                )
              }
            </div>
            <div className='text-end'>
              <button className="btn btn-primary my-3" onClick={compare}>Learn</button>
              <dialog id="my_modal_3" className="modal text-start">
                <div className="modal-box bg-white border-4 border-green-500 text-black mx-h-[60vh] overflow-y-scroll scroll-hide">
                  <button
                  onClick={generatePDF}
                  className='bg-green-400 px-3 rounded-md ml-auto py-2 -mt-4 mr-6 block text-white text-sm' >PDF</button>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle border-black btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg">Your Result</h3>
                  <div className="py-4 ">
                    {summary.map((line, index) => {
                      if (line === "") return null
                      return (
                        <div key={index} className="flex justify-start my-3 items-center">
                          <input type="checkbox" className="checkbox checkbox-primary" name={"feature-" + index}
                            onChange={(e) => setSelectedFeaturesWithData(e.target.value)}
                            value={line} />
                          <label className="text-[14px] text-black ml-2">{line}</label>
                        </div>)
                    }
                    )}
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

