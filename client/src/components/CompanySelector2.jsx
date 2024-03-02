import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";


export default function CompanySelector2({ companyData,setData  }) {
  const [filteredCompanies, setFilteredCompanies] = useState(companyData);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [show, setShow] = React.useState(false);

  function Show() {
    setShow(!show);
  }

  function filterCompanies(value) {
    if (value === "") {
      setFilteredCompanies(companyData);
      return;
    }
    const filtered = filteredCompanies.filter((item) => {
      return item.platform.toLowerCase().startsWith(value.toLowerCase());
    });
    setFilteredCompanies(filtered);
    setShow(true);
  }


  const handleCompanySelect = (platform) => {
    setSelectedCompany(platform);
    setData((prev) => ({ ...prev, targetPlatform: platform.platform_name }))
    Show();
  };

  React.useEffect(() => { }, [companyData]);

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
          defaultValue={selectedCompany.platform_name}
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
                  <p className="text-[black] ml-2 text-[14px]">
                    {data.platform_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

