import React from 'react';
import CompanySelector from './CompanySelector'; 
const dummyData = {
  "ABC Inc.": {
    "electronics": "Cutting-edge electronic devices including smartphones, laptops, smart home appliances, and gaming consoles.",
    "apparel": "Trendy clothing lines for men, women, and children suitable for all occasions.",
    "home_goods": "A diverse selection of home goods ranging from furniture, kitchenware, bedding, to home decor items."
  },
  "DEF Enterprises": {
    "electronics": "Innovative electronic gadgets and devices designed to enhance everyday living.",
    "sports_equipment": "Top-quality sports equipment for various activities such as basketball, soccer, tennis, and cycling.",
    "outdoor_gear": "Outdoor gear and accessories for camping, hiking, mountaineering, and adventure sports enthusiasts."
  },
  "GHI Corporation": {
    "health_wellness": "Health and wellness products including vitamins, supplements, personal care items, and fitness equipment.",
    "home_appliances": "Energy-efficient home appliances designed to simplify household tasks such as cooking, cleaning, and laundry.",
    "office_supplies": "Office supplies, stationery, and organizational solutions for home and business environments"
  },
  "JKL Group": {
    "automotive": "Automotive parts, accessories, and maintenance products for cars, trucks, and motorcycles.",
    "toys_games": "An extensive collection of toys and games for children of all ages, including educational toys and board games.",
    "pet_supplies": "Pet care products including food, treats, toys, grooming supplies, and accessories for dogs, cats, and other pets."
  }
};

const App = () => {
  return (
    <div className='bg-gradient-to-r from-green-500 via-white to-green-500 h-screen w-full m-auto py-12 border-4 border-black border-dotted'> 
 <div className='flex justify-center items-center'>
 <div className='p-10 border rounded-2xl h-[40rem] bg-gray-100'>
      <CompanySelector companyData={dummyData} />
 </div>
 <div className='flex flex-col justify-center items-center'>
 <h1 className='text-black text-4xl font-bold font-[poppins] px-16'>VS</h1>
 <button className="btn mt-9 bg-green-500 text-black text-xl hover:text-white" onClick={()=>document.getElementById('my_modal_3').showModal()}>Compare</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box bg-white border-4 border-green-500 text-black">
    <form method="dialog ">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle border-black btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Your Result</h3>
    <p className="py-4"></p>
  </div>
</dialog>
 </div> 
 <div className='p-10 border rounded-2xl h-[40rem]  bg-gray-100'>
      <CompanySelector companyData={dummyData} />
 </div>
 </div>
    </div>
  );
};

export default App;
