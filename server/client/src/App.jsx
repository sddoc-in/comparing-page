import React from 'react';

import axios from 'axios';
import { BASE_API_URL } from './constants/data';
import CompanySelector from './components/CompanySelector';
import CompanySelector2 from './components/CompanySelector2';
import Loading from './components/Loader';



export default function App() {

  const [dummyData, setDummyData] = React.useState([])
  const [jsonData, setJsonData] = React.useState({})
  const [summary, setSummary] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  const getPlatforms = React.useRef(() => { })

  getPlatforms.current = async function () {
    const { data } = await axios.get(BASE_API_URL + "api/get-platform")
    setDummyData(data.data)
  }

  async function compare() {
    try {
      if(jsonData.corePlatform === undefined || jsonData.targetPlatform === undefined){
        alert('Please select both platforms')
        return
      }

      if(jsonData.corePlatform.platformName === jsonData.targetPlatform){
        alert('Please select different platforms')
        return
      }

      if(jsonData.corePlatform.features.length === 0 ){
        alert('Please select features for core platform')
        return
      }
      setLoading(true)
      const { data } = await axios.post(BASE_API_URL + "api/summarize", {
        data: jsonData
      })
      if (data.message === "success") {
        setSummary(data.data)
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

  React.useEffect(() => {
    getPlatforms.current()
  }, [])

  return (
    <>
      <div className='bg-[#D4D3DD] w-full m-auto py-12 '>
        <div className='flex justify-around items-start w-11/12 md:w-10/12 mx-auto flex-col md:flex-row'>
          <div className='p-10 w-full md:w-[40%] border rounded-2xl bg-gray-100'>
            {
              dummyData.length > 0 &&
              <CompanySelector companyData={dummyData} setData={setJsonData} data={jsonData} />
            }
          </div>
          <div className='flex flex-col justify-center items-center'>
            <button className="btn btn-primary" onClick={compare}>Learn</button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box bg-white border-4 border-green-500 text-black mx-h-[60vh] overflow-y-scroll scroll-hide">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle border-black btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Your Result</h3>
                <div className="py-4 ">
                  {summary.split('\n').map((line, index) => (
                    <p key={index} className='my-2'>{line}</p>
                  ))}
                </div>
              </div>
            </dialog>
          </div>
          <div className='p-10 w-full md:w-[40%] border rounded-2xl bg-gray-100'>
            {
              dummyData.length > 0 &&
              <CompanySelector2 companyData={dummyData} setData={setJsonData} />
            }
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};
