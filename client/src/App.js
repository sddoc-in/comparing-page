import React from 'react';
import CompanySelector from './CompanySelector';
import axios from 'axios';
import { BASE_API_URL } from './constants/data';



export default function App() {

  const [dummyData, setDummyData] = React.useState([])

  const getPlatforms = React.useRef(() => { })

  getPlatforms.current = async function () {
    const { data } = await axios.get(BASE_API_URL + "api/get-platform")
    setDummyData(data.data)
  }

  React.useEffect(() => {
    getPlatforms.current()
  }, [])

  return (
    <div className='bg-gradient-to-r from-green-500 via-white to-green-500 w-full m-auto py-12 border-4 border-black border-dotted'>
      <div className='flex justify-around items-center w-11/12 md:w-10/12 mx-auto flex-col md:flex-row'>
        <div className='p-10 w-full h-[55rem] md:w-[40%] border rounded-2xl bg-gray-100'>
          {
            dummyData.length > 0 &&
            <CompanySelector companyData={dummyData} />
          }
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-black text-4xl font-bold font-[poppins] px-16'>VS</h1>
          <button className="btn mt-9 bg-green-500 text-black text-xl hover:text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Compare</button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box bg-white border-4 border-green-500 text-black">
              <form method="dialog ">


                <button className="btn btn-sm btn-circle border-black btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">Your Result</h3>
              <p className="py-4"></p>
            </div>
          </dialog>
        </div>
        <div className='p-10 w-full h-[55rem] md:w-[40%] border rounded-2xl bg-gray-100'>
          {
            dummyData.length > 0 &&
            <CompanySelector companyData={dummyData} />
          }
        </div>
      </div>
    </div>
  );
};

