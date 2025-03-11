import React, { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import { statusMap } from "../types";

const CampaignItem = ({ campaigns, status, handleClickSeeDetails }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });

  console.log("print status", status);
  console.log("print campaigns", campaigns);

  const sortedTransactions = useMemo(() => {
    if (!campaigns) return [];

    let sortableTransactions = [...campaigns];
    sortableTransactions.sort((a, b) => {
      if (sortConfig.key === "date") {
        return new Date(a[sortConfig.key]) - new Date(b[sortConfig.key]);
      } else if (sortConfig.key === "status") {
        return a[sortConfig.key].localeCompare(b[sortConfig.key]);
      }
      return 0;
    });

    if (sortConfig.direction === "descending") {
      sortableTransactions.reverse();
    }

    return sortableTransactions;
  }, [campaigns, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  return (
    <div className="w-full p-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Liste</h1>
          <p className="text-gray-400 font-medium">Gerer vos campagnes ici</p>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => requestSort("date")}
          >
            Date & Heure{" "}
            {sortConfig.key === "date" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-gray-400">
            <tr className="font-thin">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">DATE</th>
              <th className="px-4 py-2">CATEGORIE</th>
              <th className="px-4 py-2">NOM BOUTIQUE</th>
              <th className="px-4 py-2">% COMISSION</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">MONTANT</th>
              <th className="px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((campaign) => (
              <tr key={campaign.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{campaign.id}</td>
                <td className="px-4 py-3">{formatDate(campaign.createdAt)}</td>
                <td className="px-4 py-3">{campaign.category}</td>
                <td className="px-4 py-3">{campaign?.storeUrl}</td>
                <td className="px-4 py-3">
                  {campaign.commissionPercentage.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      statusMap[campaign.status].color
                    }`}
                  >
                    {statusMap[campaign.status].label}
                  </span>
                </td>
                <td className="px-4 py-3">${campaign.amount}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-500"
                    onClick={() => handleClickSeeDetails(campaign)}
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignItem;
