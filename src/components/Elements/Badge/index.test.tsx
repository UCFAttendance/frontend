import { Badge } from "./index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Badge", () => {
  it("should render children", () => {
    render(<Badge color="red">Hello World</Badge>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should render red badge", () => {
    render(<Badge color="red">Hello World</Badge>);
    expect(screen.getByText("Hello World")).toHaveClass(
      "bg-red-100 text-red-700"
    );
  });

  it("should render green badge", () => {
    render(<Badge color="green">Hello World</Badge>);
    expect(screen.getByText("Hello World")).toHaveClass(
      "bg-green-100 text-green-700"
    );
  });

  it("should render blue badge", () => {
    render(<Badge color="blue">Hello World</Badge>);
    expect(screen.getByText("Hello World")).toHaveClass(
      "bg-blue-100 text-blue-700"
    );
  });

  it("should render yellow badge", () => {
    render(<Badge color="yellow">Hello World</Badge>);
    expect(screen.getByText("Hello World")).toHaveClass(
      "bg-yellow-100 text-yellow-800"
    );
  });

  it ("should render non exist badge", () => {
    // @ts-expect-error color is not exist
    render(<Badge color="not-support">Hello World</Badge>);
    expect(screen.getByText("Hello World")).not.toHaveClass("bg-yellow-100");
  })
});
