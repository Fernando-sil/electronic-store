import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { TResponseWithCount, TGenericGetMultiple } from "../Types/Types";
import PopularBrands from "../UserInterface/PopularBrands";

beforeEach(cleanup);
const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: { queryClient, user: undefined!, cart: undefined! },
});

const popularBrands: TResponseWithCount<TGenericGetMultiple[]> = {
  count: 5,
  data: [
    {
      id: 1,
      name: "Apple",
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    },
    {
      id: 2,
      name: "Acer",
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2016/09/Acer-Logo-2001.png",
    },
    {
      id: 3,
      name: "Dell",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png",
    },
    {
      id: 6,
      name: "Microsoft",
      imageUrl:
        "https://cdn.prod.website-files.com/5ee732bebd9839b494ff27cd/5eef3a3260847d0d2783a76d_Microsoft-Logo-PNG-Transparent-Image.png",
    },
    {
      id: 8,
      name: "Samsung",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1024px-Samsung_Logo.svg.png",
    },
  ],
  success: true,
  message: "",
};

describe("Component renders properly", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("Component renders brands list", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          defaultComponent={() => <PopularBrands brands={popularBrands} />}
        />
      </QueryClientProvider>
    );
    expect(screen).toBeDefined();
    await waitFor(() =>
      expect(screen.getByTestId("brands")).toBeInTheDocument()
    );
  });
  test("Component renders word Popular Brands", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          defaultComponent={() => <PopularBrands brands={popularBrands} />}
        />
      </QueryClientProvider>
    );
    expect(screen).toBeDefined();
    await waitFor(() =>
      expect(screen.getByTestId("popularBrands")).toBeInTheDocument()
    );
  });
  test("Component renders word Popular Brands", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          defaultComponent={() => <PopularBrands brands={popularBrands} />}
        />
      </QueryClientProvider>
    );
    expect(screen).toBeDefined();
    await waitFor(() =>
      expect(screen.getAllByTestId("brandCard")).toHaveLength(
        popularBrands.data.length
      )
    );
  });
});
