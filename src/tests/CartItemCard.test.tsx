import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { renderWithContext } from "./AppProvider";
import CardItemCart from "../UserInterface/CartItemCard";
import user from "@testing-library/user-event";

const cart = {
  data: {
    dateCreated: "2024-08-11T11:39:27.530493",
    isPurchasePaid: false,
    datePurchasePaid: null,
    userName: "FernandoSilva",
    cartItems: [
      {
        itemId: "fb75f63e-8279-47de-cf7f-08dcba180e6e",
        itemName:
          "HP 15.6in HD Business Laptop, Intel Pentium N200 Processor, 16GB RAM, 128GB SSD",
        quantity: 3,
        subTotal: 489,
        imageUrl:
          "https://i5.walmartimages.com/asr/e30bffdb-feed-4507-9992-81f6bbb0d597.63751803b15eb3b68dcda668ccc54e2e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
        price: 489,
      },
      {
        itemId: "88fc128e-e39a-448f-cf81-08dcba180e6e",
        itemName:
          "ASUS VivoBook 14 X415 Thin and Light Laptop, 14in FHD Display, Intel Core i3-1115G4 Processor",
        quantity: 2,
        subTotal: 1019.98,
        imageUrl:
          "https://m.media-amazon.com/images/I/41lval8GR5L._AC_SX425_.jpg",
        price: 509.99,
      },
      {
        itemId: "001868f2-46f7-416f-c9df-08dcba52c72a",
        itemName:
          "HP 15.6in FHD Laptop, Intel Core i3-1215U Processor, 16GB RAM",
        quantity: 4,
        subTotal: 2516,
        imageUrl:
          "https://m.media-amazon.com/images/I/61gpcrBxRKL._AC_SL1500_.jpg",
        price: 629,
      },
    ],
    total: 4024.98,
  },
  success: true,
  message: "",
};

describe("Component renders correctly", () => {
  function renderComponent() {
    renderWithContext(() => <CardItemCart item={cart.data.cartItems[0]} />);
  }
  test("Increment is called", async () => {
    user.setup();
    const setState = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(() => [0, setState]);
    renderComponent();
    expect(screen).toBeDefined();
    const button = screen.getByRole("button", { name: "+" });
    await user.click(button);
    expect(setState).toHaveBeenCalledTimes(1);
  });
  test("Decrement is called", async () => {
    user.setup();
    const setState = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(() => [0, setState]);
    renderComponent();
    expect(screen).toBeDefined();
    const button = screen.getByRole("button", { name: "-" });
    await user.click(button);
    expect(setState).toHaveBeenCalledTimes(1);
  });
  test("Component renders quantity, item name", async () => {
    const setState = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(() => [0, setState]);
    renderComponent();
    expect(screen).toBeDefined();
    await waitFor(() => expect(screen.getByTestId("test")).not.toBeNull());
    await waitFor(() => expect(screen.getByRole("heading")).not.toBeNull());
  });
});
