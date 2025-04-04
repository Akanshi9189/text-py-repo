import React, { useState } from "react";
import "./MedicineSchedule.css";

const MedicineSchedule = ({ medicines, onAddMedicine, onHealthTips, onAppFeedback }) => {
  const [medicineStatus, setMedicineStatus] = useState(
    medicines.map(() => ({ morning: false, noon: false, night: false }))
  );

  const handleCheckboxChange = (index, time) => {
    const updatedStatus = [...medicineStatus];
    updatedStatus[index][time] = !updatedStatus[index][time];
    setMedicineStatus(updatedStatus);
  };

  return (
    <div className="schedule-container">
      <h2>Your Medicine Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Morning</th>
            <th>Morning Time</th>
            <th>Noon</th>
            <th>Noon Time</th>
            <th>Night</th>
            <th>Night Time</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={medicineStatus[index].morning}
                  onChange={() => handleCheckboxChange(index, "morning")}
                />
              </td>
              <td>{medicine.morningTime || "-"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={medicineStatus[index].noon}
                  onChange={() => handleCheckboxChange(index, "noon")}
                />
              </td>
              <td>{medicine.noonTime || "-"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={medicineStatus[index].night}
                  onChange={() => handleCheckboxChange(index, "night")}
                />
              </td>
              <td>{medicine.nightTime || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Centered Add More Medicines Button */}
      <div className="button-group">
        <button className="add-btn" onClick={onAddMedicine}>
          + Add More Medicines
        </button>
      </div>

      {/* Health Tips & App Feedback Navigation Buttons */}
      <div className="feedback-buttons">
        <button className="health-tips-box" onClick={onHealthTips}>  {/* ✅ Works Now */}
          Health Tips
        </button>
        <button className="app-feedback-box" onClick={onAppFeedback}>  {/* ✅ Works Now */}
          App Feedback
        </button>
      </div>
    </div>
  );
};

export default MedicineSchedule;
