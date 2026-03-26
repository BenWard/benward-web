/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { Cover } from "./Cover";

describe("Cover", () => {
  it("renders h-card microformat", () => {
    const { container } = render(<Cover />);
    expect(container.querySelector(".h-card")).toBeTruthy();
  });

  it("includes p-name link", () => {
    const { container } = render(<Cover />);
    const nameLink = container.querySelector(".p-name.u-url");
    expect(nameLink).toBeTruthy();
    expect(nameLink?.textContent).toBe("Ben Ward");
  });

  it("has about link", () => {
    const { container } = render(<Cover />);
    const aboutLink = container.querySelector('a[href="/about"]');
    expect(aboutLink).toBeTruthy();
  });
});
