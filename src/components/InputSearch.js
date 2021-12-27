import React, { useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useHistory } from "react-router-dom";

const InputSearch = ({ search, handleInputChange }) => {
  const history = useHistory();

  useEffect(() => {
    history.replace(`/search${search.length > 2 ? "?q=" + search : ""}`);
  }, [search, history]);

  return (
    <div className="bg-white rounded-lg flex space-x-2 justify-between items-center px-2">
      <input
        type="search"
        className="rounded-lg outline-0  py-2 w-full text-xl"
        placeholder="Nombre de la pelicula"
        autoFocus
        value={search}
        name="search"
        onChange={handleInputChange}
      />
      <SearchOutlinedIcon></SearchOutlinedIcon>
    </div>
  );
};

export default InputSearch;
