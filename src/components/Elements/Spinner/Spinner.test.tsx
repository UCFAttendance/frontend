import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Spinner } from "./Spinner";

describe("Spinner Component", () => {
  it("renders the Spinner component with default props", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("loading");

    // Check if the spinner is in the document
    expect(spinner).toBeInTheDocument();

    // Check the default size and variant classes
    expect(spinner).toHaveClass("animate-spin h-8 w-8 text-blue-600");
  });

  it("applies the correct size based on the 'size' prop", () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByTestId("loading");

    // Check if the spinner has the correct size class
    expect(spinner).toHaveClass("h-16 w-16");
  });

  it("applies the correct variant based on the 'variant' prop", () => {
    render(<Spinner variant="light" />);
    const spinner = screen.getByTestId("loading");

    // Check if the spinner has the correct variant class
    expect(spinner).toHaveClass("text-white");
  });

  it("applies additional classes passed via the 'className' prop", () => {
    render(<Spinner className="extra-class" />);
    const spinner = screen.getByTestId("loading");

    // Check if the spinner includes the additional class
    expect(spinner).toHaveClass("extra-class");
  });

  it("renders an accessible 'Loading' message for screen readers", () => {
    render(<Spinner />);
    const loadingText = screen.getByText(/loading/i);

    // Check if the screen reader text is in the document
    expect(loadingText).toBeInTheDocument();

    // Check if the screen reader text is visually hidden
    expect(loadingText).toHaveClass("sr-only");
  });
});
