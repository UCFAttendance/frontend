import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, vi, expect } from "vitest";
import { BreadCrumb } from "./index";
import { useNavigate } from "react-router-dom";

// Mock the useNavigate function
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("BreadCrumb", () => {
  it("renders the Home button and breadcrumb links", () => {
    const pages = [
      { name: "Page 1", href: "/page1", current: false },
      { name: "Page 2", href: "/page2", current: true },
    ];

    render(<BreadCrumb pages={pages} />);

    // Check if Home button is rendered
    expect(screen.getByRole("button", { name: /home/i })).not.toBeNull();

    // Check if breadcrumb links are rendered
    expect(screen.getByRole("button", { name: "Page 1" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "Page 2" })).not.toBeNull();
  });

  it("navigates to the correct page when a button is clicked", () => {
    const pages = [
      { name: "Page 1", href: "/page1", current: false },
      { name: "Page 2", href: "/page2", current: true },
    ];

    const navigateMock = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<BreadCrumb pages={pages} />);

    // Click the Home button
    fireEvent.click(screen.getByRole("button", { name: /home/i }));
    expect(navigateMock).toHaveBeenCalledWith("/");

    // Click the first page link
    fireEvent.click(screen.getByRole("button", { name: "Page 1" }));
    expect(navigateMock).toHaveBeenCalledWith("/page1");

    // Click the second page link
    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(navigateMock).toHaveBeenCalledWith("/page2");
  });
});
