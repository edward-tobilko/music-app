import { useState } from "react";
import "./search.scss";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <form className="search" autoComplete="off" onSubmit={handleChangeInput}>
        <label htmlFor="search-field" style={{ opacity: 0 }}>
          Search all files
        </label>
        <div className="search-term">
          <input
            className="search-term-input"
            id="search-field"
            name="search-field"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoComplete="off"
            type="search"
            placeholder="Search..."
          />
          <BsSearch className="search-term-icon" aria-hidden="true" />
        </div>
      </form>
    </>
  );
};

export default Search;
