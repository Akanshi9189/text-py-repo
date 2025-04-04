import React, { useState } from "react";
import "./Questionnaire.css";

const Questionnaire = ({ medicines, onSubmit, onLogout }) => {
  const [medicineList, setMedicineList] = useState(medicines || []);

  const handleAddMedicine = () => {
    setMedicineList([
      ...medicineList,
      { name: "", morning: false, noon: false, night: false, morningTime: "", noonTime: "", nightTime: "" }
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedMedicines = [...medicineList];
    updatedMedicines[index][field] = value;
    setMedicineList(updatedMedicines);
  };

  return (
    <div className="questionnaire-container">
      <h2>Medicine Questionnaire</h2>
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Morning</th>
            <th>Time</th>
            <th>Noon</th>
            <th>Time</th>
            <th>Night</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {medicineList.map((medicine, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={medicine.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={medicine.morning}
                  onChange={(e) => handleChange(index, "morning", e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={medicine.morningTime}
                  onChange={(e) => handleChange(index, "morningTime", e.target.value)}
                  disabled={!medicine.morning}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={medicine.noon}
                  onChange={(e) => handleChange(index, "noon", e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={medicine.noonTime}
                  onChange={(e) => handleChange(index, "noonTime", e.target.value)}
                  disabled={!medicine.noon}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={medicine.night}
                  onChange={(e) => handleChange(index, "night", e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={medicine.nightTime}
                  onChange={(e) => handleChange(index, "nightTime", e.target.value)}
                  disabled={!medicine.night}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button className="btn add-btn" onClick={handleAddMedicine}>Add Medicine</button>
        <button className="btn save-btn" onClick={() => onSubmit(medicineList)}>Save & Proceed</button>
        <button className="btn logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Questionnaire;
