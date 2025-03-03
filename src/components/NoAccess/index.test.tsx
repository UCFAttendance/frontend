import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Provides custom matchers
import { NoAccess } from "./index";
import { useAuth } from "@/stores/useAuth";
import { vi, Mock } from "vitest"; // Import Vitest mocking utility

// Mock the `useAuth` hook
vi.mock("@/stores/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("NoAccess Component", () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    // Mock the `useAuth` hook to return the mockLogout function
    (useAuth as unknown as Mock).mockReturnValue({
      logout: mockLogout,
    });
  });

  it("renders the NoAccess page with correct text", () => {
    render(<NoAccess />);

    // Check for heading, subheading, and error message
    expect(screen.getByText("400")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /no access/i })).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, you don't have access to this page.")
    ).toBeInTheDocument();
  });

  it("renders the Sign out button and Contact support link", () => {
    render(<NoAccess />);

    // Check for the Sign out button
    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();

    // Check for the Contact support link
    const contactSupportLink = screen.getByRole("link", { name: /contact support/i });
    expect(contactSupportLink).toBeInTheDocument();
  });

  it("calls auth.logout() when the Sign out button is clicked", () => {
    render(<NoAccess />);

    // Click the Sign out button
    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(signOutButton);

    // Ensure logout was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("ensures the Sign out button has proper focus and hover attributes", () => {
    render(<NoAccess />);

    const signOutButton = screen.getByRole("button", { name: /sign out/i });

    // Check for hover and focus styles (class presence)
    expect(signOutButton).toHaveClass(
      "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    );
  });
});
