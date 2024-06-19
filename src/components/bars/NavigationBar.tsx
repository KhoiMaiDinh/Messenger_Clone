import React, { useEffect, useState } from "react";
import AvatarComponent from "@/components/others/Avatar";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import ColorLogo from "@/assets/images/color_logo.png";

const NavigationBar = () => {
    const [isTop, setIsTop] = useState(true);
    useEffect(() => {
        window.onscroll = () => setIsTop(window.scrollY === 0);

        // return () => (window.onscroll = null);
    });
    return (
        <Navbar
            className="absolute px-20 h-[100px]"
            maxWidth="full"
            isBordered={!isTop}
        >
            <NavbarBrand>
                <img
                    src={ColorLogo}
                    alt="Messenger Inc. logo"
                    className=" w-10 h-10"
                />
                {/* <p className="font-bold text-inherit">ACME</p> */}
            </NavbarBrand>
            <NavbarContent
                className="hidden sm:flex gap-4 text-md font-medium"
                justify="center"
            >
                <NavbarItem className="mr-4 group">
                    <Link color="foreground" href="/features">
                        Tính năng
                    </Link>
                    <div className="w-full group-hover:rounded-[1.5px] h-[3px] group-hover:bg-[#0a7cff] mt-[2px]"></div>
                </NavbarItem>
                <NavbarItem className="mx-4 group">
                    <Link color="foreground" href="/desktop">
                        Ứng dụng dành cho máy tính
                    </Link>
                    <div className="mr-4 w-full group-hover:rounded-[1.5px] h-[3px] group-hover:bg-[#0a7cff] mt-[2px]"></div>
                </NavbarItem>
                <NavbarItem className="ml-4 group">
                    <Link color="foreground" href="/privacy">
                        Quyền riêng tư & an toàn
                    </Link>
                    <div className="mr-4 w-full group-hover:rounded-[1.5px] h-[3px] group-hover:bg-[#0a7cff] mt-[2px]"></div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        // <div className="flex flex-row w-full h-[100px] border-b-1 border-[rgba(0, 0, 0, .1)] border-solid"></div>
    );
};

export default NavigationBar;
