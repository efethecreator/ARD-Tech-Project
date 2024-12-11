import React, { useState } from "react";
import ViolationAddPopup from "./ViolationAddPopup";

function ViolationsTable() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [violations, setViolations] = useState([]); // İhlal listesi

  const addViolation = (violation) => {
    setViolations([...violations, violation]);
    setIsPopupOpen(false); // Popup kapatılır
  };

  return (
    <div className="bg-gradient-to-b from-teal-100 to-teal-300 p-5 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-4">Violation Table</h1>
      <div className="flex justify-end mb-4">
        {/* "Violation Ekle" Butonu */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Violation Ekle
        </button>
      </div>

      {/* Tablo */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-3">Dosya Numarası</th>
            <th className="border-b p-3">Mağdur Kişi</th>
          </tr>
        </thead>
        <tbody>
          {violations.map((violation, index) => (
            <tr key={index}>
              <td className="p-3">{violation.fileNumber}</td>
              <td className="p-3">{violation.victim}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
