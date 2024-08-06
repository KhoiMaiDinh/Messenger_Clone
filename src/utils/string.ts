import { iconRegex } from "@/const/regex";

function convertIconInString(oldString: string, size = 16) {
    if (oldString == undefined) return "";
    const arrOfString = Array.from(oldString).map((char) => {
        if (char.match(iconRegex))
            return `<em-emoji native="${char}" size="${size}" set="facebook"></em-emoji>`;

        return char;
    });
    return arrOfString.join("");
}

export { convertIconInString };
