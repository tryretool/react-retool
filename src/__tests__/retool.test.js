import React from "react";
import { render, screen } from "@testing-library/react";
import Retool from "../components/Retool";

describe("react-retool", () => {
  it("has the correct src attribute", () => {
    render(
      <Retool url="https://support.retool.com/embedded/public/cb9e15f0-5d7c-43a7-a746-cdec870dde9a" />
    );

    const iframe = screen.getByTitle("retool");
    expect(iframe.src).toBe(
      "https://support.retool.com/embedded/public/cb9e15f0-5d7c-43a7-a746-cdec870dde9a"
    );
  });

  it("has the correct height attribute", () => {
    render(<Retool height="100%" />);

    const iframe = screen.getByTitle("retool");
    expect(iframe.height).toBe("100%");
  });

  it("has the correct width attribute", () => {
    render(<Retool width="500px" />);

    const iframe = screen.getByTitle("retool");
    expect(iframe.width).toBe("500px");
  });

  it("has the correct sandbox attribute", () => {
    render(<Retool sandbox="allow-popups" />);

    const iframe = screen.getByTitle("retool");
    expect(iframe.getAttribute("sandbox")).toBe(
      "allow-scripts allow-same-origin allow-popups"
    );
  });

  it("has the correct allow attribute", () => {
    render(<Retool allow="fullscreen" />);

    const iframe = screen.getByTitle("retool");
    expect(iframe.getAttribute("allow")).toBe("fullscreen");
  });
});
