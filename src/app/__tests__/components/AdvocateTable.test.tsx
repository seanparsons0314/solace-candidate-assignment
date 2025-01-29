import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AdvocateTable from "../../components/AdvocateTable";
import { Advocate } from "../../types";

const mockAdvocates: Advocate[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "JD",
    specialties: ["Family Law", "Criminal Law"],
    yearsOfExperience: 10,
    phoneNumber: "1234567890",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    city: "Los Angeles",
    degree: "LLB",
    specialties: ["Corporate Law", "Tax Law"],
    yearsOfExperience: 8,
    phoneNumber: "9876543210",
  },
];

describe("AdvocateTable", () => {
  it("renders advocates", () => {
    const { getByText } = render(
      <AdvocateTable
        advocates={mockAdvocates}
        totalItems={2}
        currentPage={1}
        itemsPerPage={10}
        onPageChange={jest.fn()}
        onPageSizeChange={jest.fn()}
      />
    );

    expect(getByText("John")).toBeDefined()
    expect(getByText("Jane")).toBeDefined();
  });

  it("calls onPageChange when a page button is clicked", () => {
    const onPageChange = jest.fn();
    const { getByText } = render(
      <AdvocateTable
        advocates={mockAdvocates}
        totalItems={2}
        currentPage={1}
        itemsPerPage={10}
        onPageChange={onPageChange}
        onPageSizeChange={jest.fn()}
      />
    );

    const pageButton = getByText("1");
    fireEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageSizeChange when page size is changed", () => {
    const onPageSizeChange = jest.fn();
    const { getByLabelText } = render(
      <AdvocateTable
        advocates={mockAdvocates}
        totalItems={2}
        currentPage={1}
        itemsPerPage={10}
        onPageChange={jest.fn()}
        onPageSizeChange={onPageSizeChange}
      />
    );

    const select = getByLabelText("Items per page:");
    fireEvent.change(select, { target: { value: "20" } });

    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });
});
