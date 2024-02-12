import axios from 'axios';
import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BASE_API_URL } from './constants/data';

const CompanySelector = ({ companyData }) => {
  const [filteredCompanies, setFilteredCompanies] = useState(companyData);
  const [selectedCompany, setSelectedCompany] = useState('');
 const [featuresdata,setFeaturesData] = React.useState({})

  const [show, setShow] = React.useState(false)


  function Show() {
    setShow(!show);
  }

  function filterCompanies(value) {
    if (value === "") {
      setFilteredCompanies(companyData)
      return
    }
    const filtered = filteredCompanies.filter((item) => {
      return item.platform.toLowerCase().startsWith(value.toLowerCase())
    }
    );
    setFilteredCompanies(filtered);
    setShow(true)
  };

  async function getfeatures (platform_id) {
    const { data } = await axios.get(BASE_API_URL + "api/get-features?id="+selectedCompany.id)
    setFeaturesData(data.data)
  }


  const handleCompanySelect = (platform) => {
    setSelectedCompany(platform);
    Show()
    getfeatures(platform.id)
  };


  React.useEffect(() => { }, [companyData])


  return (
    <>


      <div className="relative w-full">
        <div
          className="absolute right-4"
          onClick={Show}
          style={{ top: "13.5px" }}
        >
          {show ? (
            <IoMdArrowDropup className="text-[#777E91] text-[20px] cursor-pointer" />
          ) : (
            <IoMdArrowDropdown className="text-[#777E91] text-[20px] cursor-pointer" />
          )}
        </div>
        <input
          type="text"
          name={"company-name"}
          defaultValue={selectedCompany.platform}
          onChange={(e) => filterCompanies(e.target.value)}
          placeholder={"Type a Platform"}
          className={
            "input w-full rounded-lg text-[14px] text-black font-medium disabled:bg-white disabled:text-black placeholder:font-normal placeholder:text-[#000] bg-white "
          }
          style={{ borderColor: "rgb(189, 189, 189)" }}
        />
        {show && (
          <div className="absolute z-30 mt-2 top-full left-0 w-full bg-white rounded-lg shadow-md border border-gray-200 h-fit  max-h-[300px] overflow-y-scroll scroll-hide">
            {filteredCompanies.map((data, i) => (
              <div
                key={i}
                onClick={() => handleCompanySelect(data)}
                className="flex items-center justify-between px-4 transition hover:bg-green-500 py-2 border-b border-gray-200 cursor-pointer"
              >
                <div className="flex items-center">
                  <p className="text-[black] ml-2 text-[14px]">{data.platform}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <br />
      {/* {productDescription && (
        <textarea className='textarea textarea-accent bg-white text-xl text-black font-semibold mt-6 w-80 h-72 flex pt-14' value={productDescription} readOnly defaultChecked='false' />
      )} */}
    </>
  );
};

export default CompanySelector;

