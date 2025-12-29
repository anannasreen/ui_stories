import React from "react";
import { render, screen } from "@testing-library/react";
import { ColumnHelper } from "@tanstack/react-table";
import StatusHistory from ".";

interface TestStatusItem {
  time: string;
  author: string;
  action: string;
  details: string;
}

describe("StatusHistory", () => {
  const createDefaultColumns = (columnHelper: ColumnHelper<TestStatusItem>) => [
    columnHelper.accessor("time", {
      header: "Time",
      size: 100,
    }),
    columnHelper.accessor("author", {
      header: "Author",
      size: 120,
    }),
    columnHelper.accessor("action", {
      header: "Action",
      size: 100,
    }),
    columnHelper.accessor("details", {
      header: "Details",
    }),
  ];

  const sampleData: TestStatusItem[] = [
    {
      time: "12:36:45",
      author: "Danie S.",
      action: "Open",
      details: "Escalated by library",
    },
    {
      time: "12:40:00",
      author: "John D.",
      action: "Update",
      details: "Status changed to in-progress",
    },
  ];

  it("renders header cells with correct labels", () => {
    render(
      <StatusHistory<TestStatusItem>
        columns={createDefaultColumns}
        data={sampleData}
      />
    );

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(4);

    const expectedHeaders = ["Time", "Author", "Action", "Details"];
    headers.forEach((header, index) => {
      expect(header).toHaveTextContent(expectedHeaders[index]);
    });
  });

  it("renders all rows and cells correctly", () => {
    render(
      <StatusHistory<TestStatusItem>
        columns={createDefaultColumns}
        data={sampleData}
      />
    );

    const rows = screen.getAllByRole("row");
    // +1 for header row
    expect(rows).toHaveLength(sampleData.length + 1);

    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(sampleData.length * 4); // 4 columns per row

    // Check first row content
    expect(cells[0]).toHaveTextContent(sampleData[0].time);
    expect(cells[1]).toHaveTextContent(sampleData[0].author);
    expect(cells[2]).toHaveTextContent(sampleData[0].action);
    expect(cells[3]).toHaveTextContent(sampleData[0].details);

    // Check second row content
    expect(cells[4]).toHaveTextContent(sampleData[1].time);
    expect(cells[5]).toHaveTextContent(sampleData[1].author);
    expect(cells[6]).toHaveTextContent(sampleData[1].action);
    expect(cells[7]).toHaveTextContent(sampleData[1].details);
  });

  it("adjusts table width based on grow prop", () => {
    const { rerender } = render(
      <StatusHistory<TestStatusItem>
        columns={createDefaultColumns}
        data={sampleData}
        grow={true}
      />
    );

    const table = screen.getByRole("table");
    expect(table).toHaveStyle({ width: "100%" });

    rerender(
      <StatusHistory<TestStatusItem>
        columns={createDefaultColumns}
        data={sampleData}
        grow={false}
      />
    );
    expect(table).toHaveStyle({ width: "auto" });
  });

  it("applies custom styles", () => {
    const customStyle = { width: "600px", maxHeight: "400px" };
    render(
      <StatusHistory<TestStatusItem>
        columns={createDefaultColumns}
        data={sampleData}
        style={customStyle}
      />
    );

    const table = screen.getByRole("table");
    expect(table).toHaveStyle(customStyle);
  });

  it("handles null data gracefully", () => {
    render(
      <StatusHistory<TestStatusItem>
        columns={createDefaultColumns}
        data={null}
      />
    );
    const rows = screen.queryAllByRole("row");
    // Only header row should be present
    expect(rows).toHaveLength(1);
  });

  it("renders column groups with correct widths", () => {
    render(
      <StatusHistory<TestStatusItem>
        columns={createDefaultColumns}
        data={sampleData}
      />
    );

    const colElements = screen.getByRole("table").getElementsByTagName("col");
    expect(colElements).toHaveLength(4);

    expect(colElements[0]).toHaveStyle({ width: "100px" });
    expect(colElements[1]).toHaveStyle({ width: "120px" });
    expect(colElements[2]).toHaveStyle({ width: "100px" });
    expect(colElements[3]).toHaveStyle({ width: "auto" });
  });
});
