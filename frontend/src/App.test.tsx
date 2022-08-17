import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

test("Renders main page correctly", async () => {
  render(<App />);

  const buttonCount = await screen.findByRole("button");
  const codeCount = screen.queryByText(/The count is now:/);

  expect(buttonCount.innerHTML).toBe("count is 0");
  expect(codeCount).toBeNull();

  await user.click(buttonCount);
  await user.click(buttonCount);

  expect(buttonCount.innerHTML).toBe("count is 2");
  expect(screen.queryByText(/The count is now:/)).toBeTruthy();
});
