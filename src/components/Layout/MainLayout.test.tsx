import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { MainLayout } from "./MainLayout";
import { useAuth } from "@/stores/useAuth";
import { vi } from "vitest"; // Import Vitest mocking utility

// Mock the `useAuth` hook
vi.mock("@/stores/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("MainLayout Component", () => {
  const mockLogout = vi.fn(); // Replace `jest.fn()` with `vi.fn()`
  const mockUser = { name: "Test User" };

  beforeEach(() => {
    // Mock `useAuth` to return test data
    (useAuth as vi.Mock).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });
  });

  it("renders the MainLayout component with navigation links", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </MemoryRouter>
    );

    // Check if navigation links are rendered
    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    const coursesLink = screen.getByRole("link", { name: /courses/i });
    const reportsLink = screen.getByRole("link", { name: /reports/i });

    expect(dashboardLink).toBeInTheDocument();
    expect(coursesLink).toBeInTheDocument();
    expect(reportsLink).toBeInTheDocument();
  });

  it("toggles the sidebar when open and close buttons are clicked", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </MemoryRouter>
    );

    // Open sidebar
    const openButton = screen.getByRole("button", { name: /open sidebar/i });
    fireEvent.click(openButton);

    const closeButton = screen.getByRole("button", { name: /close sidebar/i });
    expect(closeButton).toBeInTheDocument();

    // Close sidebar
    fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  it("renders the user profile with correct name", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </MemoryRouter>
    );

    // Check if user profile is rendered
    const userName = screen.getByText(mockUser.name);
    expect(userName).toBeInTheDocument();
  });

  it("calls logout when the logout button is clicked", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </MemoryRouter>
    );

    // Trigger logout
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("renders children inside the main content area", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </MemoryRouter>
    );

    // Check if children are rendered
    const content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();
  });
});
