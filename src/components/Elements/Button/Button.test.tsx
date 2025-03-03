import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";
import { vi } from "vitest";

describe("Button Component", () => {
  it("renders the button with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-600 text-white"); // Default variant
  });

  it("applies the correct variant styles", () => {
    render(<Button variant="inverse">Inverse</Button>);
    const button = screen.getByRole("button", { name: /inverse/i });
    expect(button).toHaveClass("bg-white text-blue-600");
  });

  it("applies the correct size styles", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("py-3 px-8 text-lg");
  });

  it("renders a loading spinner when isLoading is true", () => {
    render(<Button isLoading>Loading</Button>);
    const spinner = screen.getByTestId("loading");
    expect(spinner).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "disabled:cursor-not-allowed disabled:opacity-70"
    );
  });

  it("renders the start icon correctly", () => {
    render(
      <Button startIcon={<span data-testid="start-icon">★</span>}>
        With Icon
      </Button>
    );
    const startIcon = screen.getByTestId("start-icon");
    expect(startIcon).toBeInTheDocument();
  });

  it("renders the end icon correctly", () => {
    render(
      <Button endIcon={<span data-testid="end-icon">★</span>}>With Icon</Button>
    );
    const endIcon = screen.getByTestId("end-icon");
    expect(endIcon).toBeInTheDocument();
  });

  it("triggers onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when disabled is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:opacity-70 disabled:cursor-not-allowed"
    );
  });
});
