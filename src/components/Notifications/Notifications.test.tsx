import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

import { Notifications } from "./Notifications";
import { useNotificationStore } from "@/stores/notifications";

// Mock the notification store
vi.mock("@/stores/notifications", () => ({
  useNotificationStore: vi.fn(),
}));

describe("Notifications Component", () => {
  it("renders notifications from the store", () => {
    // Mock store state
    const mockNotifications = [
      { id: "1", type: "success", title: "Success", message: "It worked!" },
      { id: "2", type: "error", title: "Error", message: "Something went wrong!" },
    ];
    const mockDismissNotification = vi.fn();

    // Mock the hook implementation
    (useNotificationStore as jest.Mock).mockReturnValue({
      notifications: mockNotifications,
      dismissNotification: mockDismissNotification,
    });

    // Render component
    render(<Notifications />);

    // Check if notifications are rendered
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("It worked!")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("calls dismissNotification when a notification is dismissed", () => {
    const mockNotifications = [
      { id: "1", type: "success", title: "Success", message: "It worked!" },
    ];
    const mockDismissNotification = vi.fn();

    (useNotificationStore as jest.Mock).mockReturnValue({
      notifications: mockNotifications,
      dismissNotification: mockDismissNotification,
    });

    render(<Notifications />);

    // Simulate dismissing the notification
    const dismissButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(dismissButton);

    // Ensure dismissNotification is called with the correct ID
    expect(mockDismissNotification).toHaveBeenCalledWith("1");
  });

  it("renders correctly with no notifications", () => {
    (useNotificationStore as jest.Mock).mockReturnValue({
      notifications: [],
      dismissNotification: vi.fn(),
    });

    render(<Notifications />);

    // Check that nothing is rendered
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
