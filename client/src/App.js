import React from 'react';
import CompanySelector from './CompanySelector';
import axios from 'axios';
import { BASE_API_URL } from './constants/data';



export default function App() {

  const [dummyData, setDummyData] = React.useState([])
  const [compareData, setCompareData] = React.useState({})
  const [compareData1, setCompareData1] = React.useState({})
  const [summary, setSummary] = React.useState([])

  const getPlatforms = React.useRef(() => { })

  getPlatforms.current = async function () {
    const { data } = await axios.get(BASE_API_URL + "api/get-platform")
    setDummyData(data.data)
  }


  async function compare() {
    try{
    const { data } = await axios.post(BASE_API_URL + "api/summarize", {
      data: "Please compare " + compareData + " and " + compareData1 + " and tell me the best platform for me."
    })
    console.log(data)
    if (data.message === "success") {
      setSummary(data.data)
      document.getElementById('my_modal_3').showModal()
    }
    else {
      alert('Error')
    }
  }catch(error){
    console.log(error)
  }
  }

  React.useEffect(() => {
    getPlatforms.current()
  }, [])

  return (
    <div className='bg-gradient-to-r from-green-500 via-white to-green-500 w-full m-auto py-12 border-4 border-black border-dotted'>
      <div className='flex justify-around items-center w-11/12 md:w-10/12 mx-auto flex-col md:flex-row'>
        <div className='p-10 w-full md:w-[40%] border rounded-2xl bg-gray-100'>
          {
            dummyData.length > 0 &&
            <CompanySelector companyData={dummyData} setData={setCompareData} />
          }
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-black text-4xl font-bold font-[poppins] px-16'>VS</h1>
          <button className="btn mt-9 bg-green-500 text-black text-xl hover:text-white" onClick={compare}>Compare</button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box bg-white border-4 border-green-500 text-black">
              <form method="dialog ">
                <button className="btn btn-sm btn-circle border-black btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">Your Result</h3>
              <p className="py-4">{summary}</p>
            </div>
          </dialog>
        </div>
        <div className='p-10 w-full md:w-[40%] border rounded-2xl bg-gray-100'>
          {
            dummyData.length > 0 &&
            <CompanySelector companyData={dummyData} setData={setCompareData1} />
          }
        </div>
      </div>
    </div>
  );
};

