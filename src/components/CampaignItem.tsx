import React, { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";

const statusMap = {
  new: { color: "bg-blue-200 text-blue-700", label: "nouveau" },
  active: { color: "bg-green-200 text-green-700", label: "active" },
  ended: { color: "bg-yellow-200 text-yellow-700", label: "terminée" },
  archived: { color: "bg-gray-200 text-gray-700", label: "archivée" },
  rejected: { color: "bg-red-200 text-red-700", label: "refusée" },
};

const CampaignItem = (campaigns, status) => {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "ascending",
  });

  console.log("print status", status);

  const sortedTransactions = useMemo(() => {
    if (!campaigns) return [];

    let sortableTransactions = [...campaigns.campaigns];
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
    return format(date, "MMM dd, yyyy"); // Formatage en "Feb 23, 2025"
  };

  console.log("print campaigns", campaigns.campaigns);
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
          {/* <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => requestSort("status")}
          >
            Statut
          </button> */}
        </div>
      </div>
      <table className="w-full">
        <thead className="text-gray-400">
          <tr className="font-thin" id-="table-head">
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
              <td className="px-4 py-3">{campaign.businessId?.storeName}</td>
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
                <button className="text-blue-500">Voir détails</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignItem;
