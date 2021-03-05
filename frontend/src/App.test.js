import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders no data stream", () => {
  render(<App />);
  const linkElement = screen.getByText(/No data stream/i);
  expect(linkElement).toBeInTheDocument();
});
