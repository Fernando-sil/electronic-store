import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import ShopByCategories from "../UserInterface/ShopByCategories";

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: { queryClient, user: undefined!, cart: undefined! },
});

const categories = {
  count: 5,
  data: [
    {
      id: 1,
      name: "Computers",
    },
    {
      id: 2,
      name: "Laptops",
    },
    {
      id: 3,
      name: "Tablets",
    },
    {
      id: 4,
      name: "Headphones & Speakers",
    },
    {
      id: 5,
      name: "Cellphones",
    },
  ],
  success: true,
  message: "",
};

describe("Component renders properly", () => {
  test("Component renders the word Shop By Category", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          defaultComponent={() => <ShopByCategories categories={categories} />}
        />
      </QueryClientProvider>
    );
    expect(screen).toBeDefined();
    await waitFor(() =>
      expect(screen.getByTestId("categories")).toHaveTextContent(
        "Shop By Category"
      )
    );
  });

  test("Component renders list of categories", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          defaultComponent={() => <ShopByCategories categories={categories} />}
        />
      </QueryClientProvider>
    );
    expect(screen).toBeDefined();
    await waitFor(() =>
      expect(screen.getAllByTestId("categoryCard")).toHaveLength(
        categories.data.length
      )
    );
  });
});
