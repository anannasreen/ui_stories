import React from "react";
import { render, screen } from "@testing-library/react";
import Time from "./index";
import styles from "./Time.module.scss";
import { formatTime } from "@library/ui/utils/format";
import { vi } from "vitest";

// Mock the formatTime function to control output
vi.mock("@library/ui/utils/format", () => ({
  formatTime: vi.fn().mockReturnValue("12:36 PM"),
}));

describe("Time Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders time correctly", () => {
    const timestamp = "2025-02-06T12:36:43";
    const formattedTime = "12:36 PM";

    render(<Time timestamp={timestamp} />);
    expect(screen.getByText(formattedTime)).toBeInTheDocument();
  });

  it("renders with default props", () => {
    render(<Time timestamp="2025-02-06T12:36:43" />);
    const container = screen.getByTestId("time-container");
    const wrapper = screen.getByTestId("time-wrapper");

    expect(container).toHaveClass(styles.dark);
    expect(wrapper).toBeInTheDocument();
  });

  it("applies dark variant by default", () => {
    render(<Time timestamp="2025-02-06T12:36:43" />);
    const container = screen.getByTestId("time-container");
    expect(container).toHaveClass(styles.dark);
  });

  it("applies light variant correctly", () => {
    render(<Time timestamp="2025-02-06T12:36:43" variant="light" />);
    const container = screen.getByTestId("time-container");
    expect(container).toHaveClass(styles.light);
  });

  it("applies muted variant correctly", () => {
    render(<Time timestamp="2025-02-06T12:36:43" variant="muted" />);
    const container = screen.getByTestId("time-container");
    expect(container).toHaveClass(styles.muted);
  });

  it("passes className to container", () => {
    const customClass = "custom-class";
    render(<Time timestamp="2025-02-06T12:36:43" className={customClass} />);
    const container = screen.getByTestId("time-container");
    expect(container).toHaveClass(customClass);
  });

  it("calls formatTime with correct timestamp", () => {
    const timestamp = "2025-02-06T12:36:43";
    render(<Time timestamp={timestamp} />);
    expect(formatTime).toHaveBeenCalledWith(timestamp, { hideTz: true });
  });
});
