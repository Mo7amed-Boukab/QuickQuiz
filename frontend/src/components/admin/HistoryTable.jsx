import { useState } from "react";

export default function HistoryTable() {
  const historyData = [
    {
      id: 1,
      user: "admin",
      email: "admin@gmail.com",
      score: 80,
      theme: "JavaScript Basics",
      date: "01/10/2025 11:14:24",
    },
    {
      id: 2,
      user: "bob",
      email: "bob@gmail.com",
      score: 60,
      theme: "JavaScript Basics",
      date: "01/10/2025 11:14:24",
    },
    {
      id: 3,
      user: "bob",
      email: "bob@gmail.com",
      score: 90,
      theme: "Database MySQL",
      date: "01/10/2025 11:14:24",
    },
    {
      id: 4,
      user: "charlie",
      email: "charlie@gmail.com",
      score: 20,
      theme: "Algorithm Complexity",
      date: "01/10/2025 11:14:24",
    },
    {
      id: 5,
      user: "xilywy",
      email: "qarusyrih@mailinator.com",
      score: 0,
      theme: "Algorithm Complexity",
      date: "05/10/2025 23:12:01",
    },
  ];

  return (
    <div className="bg-white border border-[#e5e5e5] rounded overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f9fafb]">
            <tr className="border-b border-[#e5e5e5]">
              <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                Utilisateur
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                Email
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-24">
                Score
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#737373]">
                Thème
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#737373] w-48">
                Date de jeu
              </th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#e5e5e5] last:border-0 hover:bg-[rgba(0,0,0,0.02)] transition-colors"
              >
                <td className="py-3 px-4 text-sm">{item.user}</td>
                <td className="py-3 px-4 text-sm text-[#737373]">
                  {item.email}
                </td>
                <td className="py-3 px-4 text-sm">{item.score}</td>
                <td className="py-3 px-4 text-sm">{item.theme}</td>
                <td className="py-3 px-4 text-sm text-[#737373]">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
