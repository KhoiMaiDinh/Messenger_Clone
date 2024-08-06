import { ThemeState } from "./themeSlice";

const DEFAULT_THEME: ThemeState = {
    key: "DEFAULT_THEME",
    name: "Mặc định",
    startColor: "#9F03F5",
    middleColor: "#503FF5",
    endColor: "#0478F5",
    backgroundImage: `bg-white`,
    isTextWhite: false,
};

const SPACE_THEME: ThemeState = {
    key: "SPACE_THEME",
    name: "Không gian",
    startColor: "#FFBCD1",
    middleColor: "#BD95EB",
    endColor: "#10DDFF",
    backgroundImage: `bg-[url("@/assets/images/background_1st.jpg")]`,
    isTextWhite: true,
};

const LEMON_THEME: ThemeState = {
    key: "LEMON_THEME",
    name: "Cam chanh",
    startColor: "#F1D400",
    middleColor: "#6CDF05",
    endColor: "#0ADFA9",
    backgroundImage: `bg-[url("@/assets/images/background_2nd.jpg")]`,
    isTextWhite: true,
};

const ThemeSets = { DEFAULT_THEME, SPACE_THEME, LEMON_THEME };
export default ThemeSets;
