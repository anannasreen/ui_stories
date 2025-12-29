import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Title from ".";

vi.mock("react-helmet", () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="helmet">{children}</div>
  ),
}));

describe("Title", () => {
  it("should render title and heading", () => {
    render(<Title>Test Title</Title>);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Title");

    const helmet = screen.getByTestId("helmet");
    expect(helmet).toHaveTextContent("Test Title | library AI");
  });

  it("should not render heading when headless is true", () => {
    render(<Title headless>Test Title</Title>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();

    const helmet = screen.getByTestId("helmet");
    expect(helmet).toHaveTextContent("Test Title | library AI");
  });

  it("should pass additional props to heading", () => {
    render(
      <Title className="custom-class" data-testid="custom-title">
        Test Title
      </Title>
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveClass("custom-class");
    expect(heading).toHaveAttribute("data-testid", "custom-title");
  });

  it("should handle long titles", () => {
    const longTitle =
      "This is a very long title that should still work properly without any issues";
    render(<Title>{longTitle}</Title>);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(longTitle);

    const helmet = screen.getByTestId("helmet");
    expect(helmet).toHaveTextContent(`${longTitle} | library AI`);
  });

  it("should handle special characters in title", () => {
    const titleWithSpecialChars = 'Test & Title — With Special "Characters"';
    render(<Title>{titleWithSpecialChars}</Title>);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(titleWithSpecialChars);

    const helmet = screen.getByTestId("helmet");
    expect(helmet).toHaveTextContent(`${titleWithSpecialChars} | library AI`);
  });
});
