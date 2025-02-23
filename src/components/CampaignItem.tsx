import React from "react";

const transactions = [
  {
    id: 17,
    date: "NOV 26, 2023",
    customer: "Maulana",
    serviceType: "Delivery",
    itemName: "American Style Burger",
    qty: 1,
    status: "NEW",
    total: 75.0,
  },
  {
    id: 18,
    date: "NOV 25, 2023",
    customer: "Hanifa",
    serviceType: "Take Away",
    itemName: "Sushi Platter",
    qty: 2,
    status: "NEW",
    total: 175.0,
  },
  {
    id: 19,
    date: "NOV 24, 2023",
    customer: "Annisa",
    serviceType: "Delivery",
    itemName: "Chicken Curry Katsu",
    qty: 4,
    status: "ON PROCESS",
    total: 375.0,
  },
  {
    id: 20,
    date: "NOV 23, 2023",
    customer: "Iwan",
    serviceType: "Take Away",
    itemName: "American Style Burger",
    qty: 1,
    status: "DONE",
    total: 85.0,
  },
  {
    id: 1,
    date: "NOV 22, 2023",
    customer: "Dwi",
    serviceType: "Take Away",
    itemName: "Sushi Platter",
    qty: 4,
    status: "NEW",
    total: 125.0,
  },
];

const CampaignItem = (campaigns) => {
  console.log("print campaigns", campaigns.campaigns);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">List</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Date & Time
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Categorie</th>
            <th className="px-4 py-2">Nom boutique</th>
            <th className="px-4 py-2">% Comission</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Montant</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-3">{campaign.id}</td>
              <td className="px-4 py-3">{campaign.createdAt}</td>
              <td className="px-4 py-3">{campaign.category}</td>
              <td className="px-4 py-3">{campaign.businessId?.storeName}</td>
              <td className="px-4 py-3">
                {campaign.commissionPercentage.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    campaign.status === "NEW"
                      ? "bg-blue-200 text-blue-700"
                      : campaign.status === "ON PROCESS"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {campaign.status}
                </span>
              </td>
              <td className="px-4 py-3">${campaign.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignItem;
