import { screen, waitFor } from "@testing-library/react";
import Navbar from "../UserInterface/NavBar";
import "@testing-library/jest-dom";

import { renderWithContext } from "./AppProvider";

describe("Component renders properly with given user object", () => {
  test("Navbar shows the words Home, Products", async () => {
    renderWithContext(Navbar);
    // const result = renderWithContext(Navbar);
    expect(screen).toBeDefined();
    await waitFor(() => expect(screen.getByText("Home")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText("Products")).toBeInTheDocument()
    );
    // await waitFor(() => result.baseElement.childNodes[0]!.hasChildNodes());
    // const home = screen.getByText("Home");
    // expect(home).toBeInTheDocument();
    // const products = screen.getByText("Products");
    // expect(products).toBeInTheDocument();
  });

  test("Navbar does not show Admin area and log in", async () => {
    renderWithContext(Navbar);
    // const result = renderWithContext(Navbar);
    expect(screen).toBeDefined();
    await waitFor(() =>
      expect(screen.queryByText("Admin Area")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText("Log in")).not.toBeInTheDocument()
    );
    // const result = renderWithContext(Navbar);
    // await waitFor(() => result.baseElement.childNodes[0]!.hasChildNodes());
    // const adminArea = screen.queryByText("Admin Area");
    // expect(adminArea).not.toBeInTheDocument();
    // const logIn = screen.queryByText("Log in");
    // expect(logIn).not.toBeInTheDocument();
  });

  test("Navbar shows logout button", async () => {
    renderWithContext(Navbar);
    // const result = renderWithContext(Navbar);
    expect(screen).toBeDefined();
    await waitFor(() => expect(screen.getByRole("button")).toBeInTheDocument());
    // const result = renderWithContext(Navbar);
    // await waitFor(() => result.baseElement.childNodes[0]!.hasChildNodes());
    // const loginButton = screen.getByRole("button");
    // expect(loginButton).toBeInTheDocument();
  });
});
