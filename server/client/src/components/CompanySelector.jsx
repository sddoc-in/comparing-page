import axios from "axios";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BASE_API_URL } from "../constants/data";


export default function CompanySelector({ companyData, setData, data }) {
  const [filteredCompanies, setFilteredCompanies] = useState(companyData);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [featuresData, setFeaturesData] = React.useState([]);
  const [platformType, setPlatformtype] = useState('');
  const [platformBlurb, setPlatformBlurb] = useState('');
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

  async function getfeatures(platform_id) {
    const { data } = await axios.get(
      BASE_API_URL + "api/get-features?id=" + platform_id
    );
    setFeaturesData(data.data);
    setPlatformBlurb(data["data"]["platform"]["platform_blurb"]);
    setPlatformtype(data["data"]["platform"]["platform_type"]);
    setFeaturesData(data["data"]["features"]);
    setData((prev) => ({
      ...prev, corePlatform: {
        platformName: data["data"]["platform"]["platform_name"],
        platformType: data["data"]["platform"]["platform_type"],
        platformBlurd: data["data"]["platform"]["platform_blurb"],
        features: []
      }
    }));
  }

  const handleCompanySelect = (platform) => {
    setSelectedCompany(platform);
    setData((prev) => ({ ...prev, corePlatform: { platformName: platform.platform } }));
    Show();
    getfeatures(platform.id);
  };

  function setSelectedFeaturesWithData(desc) {
    let coreData = data.corePlatform;
    let features = coreData.features;
    let selectedFeatures = features;
    let index = selectedFeatures.indexOf(desc);
    if (index === -1) {
      selectedFeatures.push(desc);
    } else {
      selectedFeatures.splice(index, 1);
    }
    coreData.features = selectedFeatures;
    setData((prev) => ({ ...prev, corePlatform: coreData }));
  }

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
                  <p className="text-[black] ml-2 text-[14px]">
                    {data.platform}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <br />
      <label className="text-xl text-black font-semibold">Core Database Platform</label>
      <p
        className="input w-full rounded-lg text-black  bg-white flex items-center"
        style={{ borderColor: "rgb(189, 189, 189)" }}
      >{platformType}</p>
      <br />
      <label className="text-xl text-black font-semibold">Platform Description</label>
      <p
        className="input min-h-[3rem] h-[auto] w-full rounded-lg py-2 text-black bg-white flex items-center"
        style={{ borderColor: "rgb(189, 189, 189)" }}
      >{platformBlurb}</p>
      <br />
      <div className="input h-auto mt-4 p-6 rounded-lg shadow-lg bg-white max-h-[300px] overflow-y-scroll scroll-hide">
        <h2 className="text-2xl font-semibold text-black py-2">Features:</h2>
        {featuresData.map((feature, index) => (
          <div key={index} className="flex justify-start my-3 items-center">
            <input type="checkbox" className="checkbox checkbox-primary" name={"feature-" + index}
              onChange={(e) => setSelectedFeaturesWithData(e.target.value)}
              value={feature.feature_descr} />
            <label className="text-[14px] text-black ml-2">{feature.feature_descr}</label>
          </div>
        ))}
      </div>
      <br />
    </>
  );
};

