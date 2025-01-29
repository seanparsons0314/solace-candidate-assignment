import { renderHook } from "@testing-library/react-hooks";
import useAdvocates from "../../hooks/useAdvocates";

describe("useAdvocates", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => {
      const params = new URLSearchParams(url.split('?')[1]);
      const search = params.get('search') || '';
      const page = parseInt(params.get('page') || '1', 10);
      const itemsPerPage = parseInt(params.get('itemsPerPage') || '10', 10);

      const advocates = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          city: "New York",
          degree: "JD",
          specialties: ["Family Law", "Criminal Law"],
          yearsOfExperience: 10,
          phoneNumber: "123-456-7890",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          city: "Los Angeles",
          degree: "LLB",
          specialties: ["Corporate Law", "Tax Law"],
          yearsOfExperience: 8,
          phoneNumber: "987-654-3210",
        },
      ];

      const filteredAdvocates = advocates.filter((advocate) =>
        advocate.firstName.includes(search) ||
        advocate.lastName.includes(search) ||
        advocate.city.includes(search) ||
        advocate.degree.includes(search) ||
        advocate.specialties.includes(search) ||
        advocate.phoneNumber.includes(search)
      );

      const paginatedAdvocates = filteredAdvocates.slice((page - 1) * itemsPerPage, page * itemsPerPage);

      return Promise.resolve({
        json: () => Promise.resolve({
          data: paginatedAdvocates,
          totalItems: filteredAdvocates.length,
        }),
      });
    });
  });

  it("fetches advocates", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAdvocates({ keyword: "", page: 1, itemsPerPage: 10 })
    );

    await waitForNextUpdate();

    expect(result.current.advocates).toHaveLength(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.loading).toBe(false);
  });

  it("fetches advocates with search keyword", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAdvocates({ keyword: "John", page: 1, itemsPerPage: 10 })
    );

    await waitForNextUpdate();

    expect(result.current.advocates).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.loading).toBe(false);
  });
});
