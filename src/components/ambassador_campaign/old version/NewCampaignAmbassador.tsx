import React from "react";

const NewCampaignForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <img src="../assets/logo.jpeg" alt="Logo" className="mx-auto" />
        <h2 className="text-2xl font-bold mt-2">Let's work together</h2>
        <p className="text-gray-600 mt-2">
          We're a full-service agency dedicated to helping you go from MVP to
          industry leader. Let our team bring your goals to life.
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Team size
        </label>
        <input type="range" min="10" max="20" className="w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Budget
        </label>
        <input type="range" min="1000" max="5000" className="w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          What do you need help with?
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Web Design
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            UI/UX Design
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            App Design
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Development
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Technical SEO
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Content Writing
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Strategy
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Research
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Other
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Step 2 of 2</span>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Go back
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Let's create
        </button>
      </div>
    </div>
  );
};

export default NewCampaignForm;
