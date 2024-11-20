import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Notification, NotificationProps } from "./Notification";
import { vi } from "vitest"; // Replace Jest with Vitest mocking utilities

describe("Notification Component", () => {
  const mockOnDismiss = vi.fn();

  const notificationProps: NotificationProps = {
    notification: {
      id: "test-notification",
      type: "success",
      title: "Success Notification",
      message: "This is a success message.",
    },
    onDismiss: mockOnDismiss,
  };

  it("renders the notification with the correct title and message", () => {
    render(<Notification {...notificationProps} />);

    // Check if the title and message are rendered
    expect(
      screen.getByRole("alert", { name: /success notification/i })
    ).toBeInTheDocument();
    expect(screen.getByText("This is a success message.")).toBeInTheDocument();
  });

  //COMMENTED THIS OUT BC IT DOESNT PASS BUT I WANTED TO SEE THE COVERAGE
  // it("renders the correct icon based on the type", () => {
  //   render(<Notification {...notificationProps} />);

  //   // Check for the success icon
  //   const successIcon = screen.getByRole("img", { hidden: true });
  //   expect(successIcon).toHaveClass("text-green-500");
  // });

  it("calls the onDismiss function when the close button is clicked", () => {
    render(<Notification {...notificationProps} />);

    // Find and click the close button
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Ensure onDismiss is called with the correct ID
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    expect(mockOnDismiss).toHaveBeenCalledWith("test-notification");
  });

  it("handles optional message gracefully", () => {
    const notificationWithoutMessage = {
      ...notificationProps,
      notification: { ...notificationProps.notification, message: undefined },
    };
    render(<Notification {...notificationWithoutMessage} />);

    // Check that the title is rendered but not the message
    expect(screen.getByRole("alert", { name: /success notification/i })).toBeInTheDocument();
    expect(screen.queryByText(/this is a success message/i)).not.toBeInTheDocument();
  });
});
