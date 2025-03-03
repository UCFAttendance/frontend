import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateCourse } from "./CreateCourse";
import { useCreateCourse } from "../api/createCourse";
import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../api/createCourse", () => ({
  useCreateCourse: vi.fn(),
}));

describe("CreateCourse Component", () => {
  const mockMutate = vi.fn();
  const mockReset = vi.fn();

  beforeEach(() => {
    (useCreateCourse as any).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });
    mockMutate.mockClear();
    mockReset.mockClear();
  });

  it("renders the Add Course button", () => {
    render(<CreateCourse />);
    const addButton = screen.getByRole("button", { name: /Add Course/i });
    expect(addButton).toBeInTheDocument();
  });

  it("opens the slide-over panel when Add Course is clicked", () => {
    render(<CreateCourse />);
    const addButton = screen.getByRole("button", { name: /add course/i });
    fireEvent.click(addButton);

    const dialogTitle = screen.getByText(/create course/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  it("closes the slide-over panel when Cancel is clicked", async () => {
    render(<CreateCourse />);
    const addButton = screen.getByRole("button", { name: /add course/i });
    fireEvent.click(addButton);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() =>
      expect(screen.queryByText(/create course/i)).not.toBeInTheDocument()
    );
  });

  //   it("displays validation error if the name field is empty", async () => {
  //     render(<CreateCourse />);
  //     const addButton = screen.getByRole("button", { name: /add course/i });
  //     fireEvent.click(addButton);

  //     const saveButton = screen.getByRole("button", { name: /save/i });
  //     fireEvent.click(saveButton);

  //     const errorMessage = await screen.findByText(/Failed to create course/i);
  //     expect(errorMessage).toBeInTheDocument();
  //   });

  it("submits the form when valid data is entered", async () => {
    render(<CreateCourse />);
    const addButton = screen.getByRole("button", { name: /add course/i });
    fireEvent.click(addButton);

    const nameInput = screen.getByPlaceholderText(/course name/i);
    fireEvent.change(nameInput, { target: { value: "Test Course" } });

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(mockMutate).toHaveBeenCalledWith(
        { name: "Test Course" },
        expect.any(Object)
      )
    );
  });

  it("displays an error message if the mutation fails", async () => {
    (useCreateCourse as any).mockReturnValue({
      mutate: (_data: any, options: any) => {
        if (options?.onError) {
          options.onError({
            response: {
              data: {
                detail: "Failed to create course",
              },
            },
          });
        }
        return Promise.resolve();
      },
      isLoading: false,
    });

    render(<CreateCourse />);
    const addButton = screen.getByRole("button", { name: /add course/i });
    fireEvent.click(addButton);

    const nameInput = screen.getByPlaceholderText(/course name/i);
    fireEvent.change(nameInput, { target: { value: "Test Course" } });

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    const errorMessage = await screen.findByText(/failed to create course/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("disables the save button when the form is loading", () => {
    (useCreateCourse as any).mockReturnValue({
      mutate: mockMutate,
      isLoading: true,
    });

    render(<CreateCourse />);
    const addButton = screen.getByRole("button", { name: /add course/i });
    fireEvent.click(addButton);

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });
});
