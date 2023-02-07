import React from "react";
import { render } from "@testing-library/react";
import Retool from "../components/Retool";

describe("react-retool", () => {
  it("has the correct src attribute", () => {
    const { getByTitle } = render(
      <Retool url="https://support.retool.com/embedded/public/cb9e15f0-5d7c-43a7-a746-cdec870dde9a" />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const iframe = getByTitle("retool");
    expect(iframe.src).toBe(
      "https://support.retool.com/embedded/public/cb9e15f0-5d7c-43a7-a746-cdec870dde9a"
    );
  });

  it("has the correct height attribute", () => {
    const { getByTitle } = render(<Retool height="100%" />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const iframe = getByTitle("retool");
    expect(iframe.height).toBe("100%");
  });

  it("has the correct width attribute", () => {
    const { getByTitle } = render(<Retool width="500px" />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const iframe = getByTitle("retool");
    expect(iframe.width).toBe("500px");
  });

  it("has the correct sandbox attribute", () => {
    const { getByTitle } = render(<Retool sandbox="allow-popups" />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const iframe = getByTitle("retool");
    expect(iframe.getAttribute("sandbox")).toBe(
      "allow-scripts allow-same-origin allow-popups"
    );
  });

  it("has the correct allow attribute", () => {
    const { getByTitle } = render(<Retool allow="fullscreen" />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const iframe = getByTitle("retool");
    expect(iframe.getAttribute("allow")).toBe("fullscreen");
  });
});
