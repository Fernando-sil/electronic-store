import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../UserInterface/ReusableComponents/ProductCard";

const product = {
  id: "fb75f63e-8279-47de-cf7f-08dcba180e6e",
  itemName:
    "HP 15.6in HD Business Laptop, Intel Pentium N200 Processor, 16GB RAM, 128GB SSD",
  imageUrl:
    "https://i5.walmartimages.com/asr/e30bffdb-feed-4507-9992-81f6bbb0d597.63751803b15eb3b68dcda668ccc54e2e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  price: 489,
  score: 4.7,
  categoryName: "",
};

describe("Component renders properly", () => {
  test("CustomCard is rendered", () => {
    render(<ProductCard product={product} />);
    const customCard = screen.getByTestId("customCard");
    expect(customCard).toBeInTheDocument();
  });
  test("Price information is rendered", () => {
    render(<ProductCard product={product} />);
    const price = screen.getByText("$489");
    expect(price).toBeInTheDocument();
  });
});
