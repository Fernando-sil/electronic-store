import { useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import Searchbar from "./SearchBar";

function SearchItemBar({ urlReference }: { urlReference: string }) {
  const [search, setSearch] = useState<string>("");
  const { search: searchParam } = useLocation();
  const navigate = useNavigate({ from: urlReference });

  function HandleSearch() {
    if (search === "") {
      navigate({
        to: urlReference,
      });
    } else {
      navigate({
        to: urlReference,
        search: { name: search },
      });
    }
  }
  function handleClearSearch() {
    if (searchParam.name !== undefined) {
      navigate({
        to: urlReference,
        search: { name: undefined },
      });
    }
    setSearch("");
  }

  return (
    <Searchbar
      search={search}
      setSearch={setSearch}
      handleClearSearch={handleClearSearch}
      handleSearch={HandleSearch}
      name={searchParam.name}
    />
  );
}

export default SearchItemBar;
