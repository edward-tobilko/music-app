import { AiOutlineHome } from "react-icons/ai";
import { GiMedallist } from "react-icons/gi";
import { HiOutlineUserGroup, HiOutlineHashtag } from "react-icons/hi";

//? Genres of the Discover component
export const genres = [
  { title: "Pop", value: "POP" },
  { title: "Hip-Hop/Rap", value: "HIP_HOP_RAP" },
  { title: "Dance", value: "DANCE" },
  { title: "Electronic", value: "ELECTRONIC" },
  { title: "Soul/RnB", value: "SOUL_RNB" },
  { title: "Alternative", value: "ALTERNATIVE" },
  { title: "Rock", value: "ROCK" },
  { title: "Latin", value: "LATIN" },
  { title: "Film Tv", value: "FILM_TV" },
  { title: "Country", value: "COUNTRY" },
  { title: "Worldwide", value: "WORLDWIDE" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "K_POP" },
  { title: "French-Pop", value: "FRENCH_POP" },
  { title: "Singer/Songwriter", value: "SINGER_SONGWRITER" },
  { title: "Reg", value: "REG_MEXICO" },
];

//? Links of the Sidebar component
export const links = [
  { name: "Home", to: "/", icon: <AiOutlineHome /> },
  { name: "Around You", to: "/around-you", icon: <GiMedallist /> },
  { name: "Top Artists", to: "/top-artists", icon: <HiOutlineUserGroup /> },
  { name: "Top Charts", to: "/top-charts", icon: <HiOutlineHashtag /> },
];
