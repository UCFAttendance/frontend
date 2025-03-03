import { vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ListCourse } from "./ListCourse";
import { useListCourse } from "../api/listCourse";
import { useDeleteCourse } from "../api/deleteCourse";
import { useNavigate } from "react-router-dom";

vi.mock("../api/listCourse", () => ({
  useListCourse: vi.fn(),
}));

vi.mock("../api/deleteCourse", () => ({
  useDeleteCourse: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

describe("ListCourse Component", () => {
  const mockNavigate = vi.fn();
  const mockDeleteCourse = vi.fn();

  beforeEach(() => {
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useDeleteCourse as any).mockReturnValue({
      mutate: mockDeleteCourse,
    });

    mockNavigate.mockClear();
    mockDeleteCourse.mockClear();
  });

  it("renders a table with course data", () => {
    (useListCourse as any).mockReturnValue({
      data: [
        { id: 1, name: "Course 1" },
        { id: 2, name: "Course 2" },
      ],
    });

    render(<ListCourse />);

    expect(screen.getByText("Course ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Course 1")).toBeInTheDocument();
    expect(screen.getByText("Course 2")).toBeInTheDocument();
  });

  it("navigates to the course details page when 'View' button is clicked", () => {
    (useListCourse as any).mockReturnValue({
      data: [{ id: 1, name: "Course 1" }],
    });

    render(<ListCourse />);

    const viewButton = screen.getByRole("button", { name: /view.*course 1/i });
    fireEvent.click(viewButton);

    expect(mockNavigate).toHaveBeenCalledWith("/app/courses/1");
  });

  it("calls deleteCourse mutation when 'Delete' is clicked", async () => {
    (useListCourse as any).mockReturnValue({
      data: [{ id: 1, name: "Course 1" }],
    });

    render(<ListCourse />);

    const optionsButton = screen.getByRole("button", {
      name: /open options/i,
    });
    fireEvent.click(optionsButton);

    const deleteButton = screen.getByRole("menuitem", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(mockDeleteCourse).toHaveBeenCalledWith({ courseId: 1 })
    );
  });

  it("renders no courses when the data is empty", () => {
    (useListCourse as any).mockReturnValue({
      data: [],
    });

    render(<ListCourse />);

    expect(screen.queryByText("Course 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Course 2")).not.toBeInTheDocument();
  });

  it("handles API loading state gracefully", () => {
    (useListCourse as any).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<ListCourse />);

    expect(screen.queryByText("Course 1")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
