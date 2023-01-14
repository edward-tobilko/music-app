import { useDispatch } from "react-redux";
import { setGenreItem } from "../../redux/slices/playerSlice";
import { genres } from "../../utils/utils";
import "./select.scss";

const Select = ({ genreItem }) => {
  const dispatch = useDispatch();

  const handleGenre = (event) => {
    dispatch(setGenreItem(event.target.value));
  };

  const titleGenre = genres.find(({ value }) => value === genreItem)?.title;

  return (
    <div className="select">
      <h1 className="select-title"> {genreItem ? titleGenre : "POP"} </h1>
      <select
        className="select-term"
        onChange={handleGenre}
        value={genreItem || "POP"}
      >
        {genres.map((genre) => (
          <option
            className="select-term-item"
            key={genre.value}
            value={genre.value}
          >
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
