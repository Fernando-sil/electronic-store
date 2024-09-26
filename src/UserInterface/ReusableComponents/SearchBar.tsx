import { IconContext } from "react-icons";
import { MdCancel } from "react-icons/md";
import CustomInput from "./CustomInput";
import { CustomButton } from "./CutomButton";

type TSearchBar = {
  name: string | undefined;
  handleSearch?: () => void;
  setSearch: (search: string) => void;
  search: string;
  handleClearSearch?: () => void;
};

function Searchbar({
  name,
  handleClearSearch,
  setSearch,
  search,
  handleSearch,
}: TSearchBar) {
  return (
    <section className="flex gap-4 items-center relative">
      {name !== undefined && (
        <IconContext.Provider
          value={{
            className:
              "absolute top-[18%] left-[82%] text-red-500 cursor-pointer",
            size: "30",
          }}
        >
          <MdCancel onClick={handleClearSearch} />
        </IconContext.Provider>
      )}
      <CustomInput
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <CustomButton
        size="medium"
        onClick={handleSearch}
        disabled={search === ""}
      >
        Search
      </CustomButton>
    </section>
  );
}

export default Searchbar;
