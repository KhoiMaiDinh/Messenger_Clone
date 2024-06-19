import React from "react";

import LogoImage from "@/assets/images/color_logo.png";
import FromMetaImage from "@/assets/images/from-meta.png";

function Splash() {
    return (
        <div className=" w-screen flex-1 flex-col items-center p-4 h-screen flex gap-4 bg-[#f5f5f5] justify-center">
            <img src={LogoImage} className="self-center w-[120px] h-[120px]" />
            <img src={FromMetaImage} className="absolute bottom-10" />
        </div>
    );
}

export default Splash;
