import React, { useState } from 'react';

const CompanySelector = ({ companyData }) => {
  const [inputText, setInputText] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const filterCompanies = (text) => {
    const filtered = Object.keys(companyData).filter(company =>
      company.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    filterCompanies(text);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setSelectedProductType('');
    setProductDescription('');
  };

  const handleProductTypeSelect = (type) => {
    setSelectedProductType(type);
    if (companyData[selectedCompany]) {
      setProductDescription(companyData[selectedCompany][type]);
    }
  };

  return (
  <>
    <input type="text" value={inputText} placeholder="Type a company name" onChange={handleInputChange} class="input input-bordered input-accent w-full max-w-xs bg-white text-black text-xl" />
      {/* <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type a company name"
      /> */}
      <ul>
        {filteredCompanies.map(company => (
          <li key={company} class="dropdown-content z-[1] menu font-semibold text-lg border shadow cursor-pointer w-full max-w-xs bg-slate-100 hover:bg-black hover:text-white" onClick={() => handleCompanySelect(company)}>
            {company}
          </li>
        ))}
      </ul>
      {selectedCompany && companyData[selectedCompany] && (
        <select className='select select-success w-full max-w-xs mt-6 bg-white text-black text-xl text-semibold' value={selectedProductType} onChange={(e) => handleProductTypeSelect(e.target.value)}>
          <option value="">Select a product type</option>
          {Object.keys(companyData[selectedCompany]).map(type => (
            <option className='cursor-pointer' key={type} value={type}>{type}</option>
          ))}
        </select> 
        )}
        
        <br />
           {productDescription && (
        <textarea className='textarea textarea-accent bg-white text-xl text-black font-semibold mt-6 w-80 h-72 flex pt-14' value={productDescription} readOnly  defaultChecked='false'/>
      )}
    </>
  );
};

export default CompanySelector;

