const getTime = (iso_string: string) => {
    if (iso_string) {
        const time: Date = new Date(iso_string);
        const now: Date = new Date();
        const distance = (now.getTime() - time.getTime()) / 1000;
        if (distance < 60) return "Bây giờ";
        else if (distance < 60 * 60) return `${Math.round(distance / 60)} phút`;
        else if (distance < 60 * 60 * 24)
            return `${Math.round(distance / (60 * 60))} giờ`;
        else if (distance < 60 * 60 * 24 * 7)
            return `${Math.round(distance / (60 * 60 * 24))} ngày`;
        else return `${Math.round(distance / (60 * 60 * 24 * 7))} tuần`;
    } else {
        return "";
    }
};

export { getTime };
