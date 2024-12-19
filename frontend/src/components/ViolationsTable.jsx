import React, { useState } from "react";
import ViolationAddPopup from "./ViolationAddPopup";

function ViolationsTable() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [violations, setViolations] = useState([]);

  const addViolation = (violation) => {
    setViolations([...violations, violation]);
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-[#F2F4F3] text-[#0A0908] p-8 rounded-lg shadow-lg min-h-screen">
      <h1 className="text-center text-3xl font-semibold mb-6">Hak İhlali Tablosu</h1>

      <div className="flex justify-end mb-6">
        {/* "Violation Ekle" Butonu */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-[#22333B] hover:bg-[#5E503F] text-[#F2F4F3] font-semibold py-2 px-6 rounded-md shadow-md transition-all"
        >
          + Violation Ekle
        </button>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr>
              <th className="p-3 border-b text-lg font-medium text-[#0A0908]">Dosya Numarası</th>
              <th className="p-3 border-b text-lg font-medium text-[#0A0908]">Mağdur Kişi</th>
            </tr>
          </thead>
          <tbody>
            {violations.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-3 text-center text-[#A9927D]">
                  Henüz ihlaller eklenmedi.
                </td>
              </tr>
            ) : (
              violations.map((violation, index) => (
                <tr key={index} className="hover:bg-[#A9927D]">
                  <td className="p-3">{violation.fileNumber}</td>
                  <td className="p-3">{violation.victim}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <ViolationAddPopup
          onClose={() => setIsPopupOpen(false)}
          onSave={addViolation}
        />
      )}
    </div>
  );
}

export default ViolationsTable;
