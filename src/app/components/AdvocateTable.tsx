import React from "react";
import { Advocate } from "../types";

interface AdvocateTableProps {
  advocates: Advocate[];
}

const AdvocateTable: React.FC<AdvocateTableProps> = ({ advocates }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate: Advocate) => (
          <tr key={`advocate-${advocate.id}`}>
            <td>{advocate.firstName}</td>
            <td>{advocate.lastName}</td>
            <td>{advocate.city}</td>
            <td>{advocate.degree}</td>
            <td>
              {advocate.specialties.map((s) => (
                <div key={s}>{s}</div>
              ))}
            </td>
            <td>{advocate.yearsOfExperience}</td>
            <td>{advocate.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdvocateTable;
