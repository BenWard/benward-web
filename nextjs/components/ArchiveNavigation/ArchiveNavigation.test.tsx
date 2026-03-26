/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react";
import { ArchiveNavigation } from "./ArchiveNavigation";
import type { ArchiveNavigation as ArchiveNav } from "@/lib/archives";

describe("ArchiveNavigation", () => {
  const nav: ArchiveNav = {
    period: { year: 2022, month: 6 },
    previousPeriod: { year: 2022, month: 3 },
    nextPeriod: { year: 2022, month: 12 },
    firstPeriod: { year: 2020, month: 1 },
    lastPeriod: { year: 2022, month: 12 },
  };

  it("renders previous and next links", () => {
    const { container } = render(<ArchiveNavigation navigation={nav} />);
    const links = container.querySelectorAll("a");
    const prevLink = Array.from(links).find((l) => l.rel === "prev");
    const nextLink = Array.from(links).find((l) => l.rel === "next");
    expect(prevLink?.getAttribute("href")).toBe("/2022/03");
    expect(nextLink?.getAttribute("href")).toBe("/2022/12");
  });

  it("renders parent link for monthly archives", () => {
    const { container } = render(<ArchiveNavigation navigation={nav} />);
    const parentLink = container.querySelector('a[rel="parent"]');
    expect(parentLink?.getAttribute("href")).toBe("/2022");
  });

  it("shows last period when no previous", () => {
    const firstNav: ArchiveNav = {
      ...nav,
      previousPeriod: null,
    };
    const { container } = render(<ArchiveNavigation navigation={firstNav} />);
    const lastLink = container.querySelector('a[rel="last"]');
    expect(lastLink).toBeTruthy();
  });

  it("shows first period when no next", () => {
    const lastNav: ArchiveNav = {
      ...nav,
      nextPeriod: null,
    };
    const { container } = render(<ArchiveNavigation navigation={lastNav} />);
    const firstLink = container.querySelector('a[rel="first"]');
    expect(firstLink).toBeTruthy();
  });
});
