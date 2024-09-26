import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../UserInterface/Login";
import { renderWithContext } from "./AppProvider";

describe("Component renders properly", () => {
  //   beforeEach(() => {
  //     document.body.innerHTML = "";
  //   });
  test("Componet renders words Welcome back, log into your account forgot password and dont have an account", async () => {
    renderWithContext(() => <Login />);
    expect(screen).toBeDefined();
    await waitFor(() =>
      expect(
        screen
          .getAllByRole("heading")
          .find((p) => p.textContent === "Welcome back!")
      ).toHaveTextContent("Welcome back!")
    );
  });
});
