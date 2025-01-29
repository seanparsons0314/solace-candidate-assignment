import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

describe("SearchBar", () => {
  it("calls onSearch when input changes", () => {
    const onSearch = jest.fn();
    const onReset = jest.fn();
    const { getByRole } = render(<SearchBar onSearch={onSearch} onReset={onReset} />);

    const input = getByRole("textbox");
    act(() => {
      fireEvent.change(input, { target: { value: "test" } });
    });

    expect(onSearch).toHaveBeenCalledWith("test");
  });

  it("calls onSearch when Enter key is pressed", () => {
    const onSearch = jest.fn();
    const onReset = jest.fn();
    const { getByRole } = render(<SearchBar onSearch={onSearch} onReset={onReset} />);

    const input = getByRole("textbox");
    act(() => {
      fireEvent.keyPress(input, { key: "Enter", charCode: 13 });
    });

    expect(onSearch).toHaveBeenCalled();
  });

  it("calls onReset when reset button is clicked", () => {
    const onSearch = jest.fn();
    const onReset = jest.fn();
    const { getByRole } = render(<SearchBar onSearch={onSearch} onReset={onReset} />);

    const button = getByRole("button");
    act(() => {
      fireEvent.click(button);
    });

    expect(onReset).toHaveBeenCalled();
  });
});
