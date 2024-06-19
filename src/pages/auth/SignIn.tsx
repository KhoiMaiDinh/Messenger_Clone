import React, { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
} from "@nextui-org/react";
import { auth } from "@/firebaseConfig.ts";
import firebase from "firebase/compat/app";

import Sidebar from "@/components/bars/Sidebar";
import MessageListBar from "@/components/bars/MessageListBar";
import MessageContent from "@/components/contents/MessageContent";
import NavigationBar from "@/components/bars/NavigationBar.tsx";
import { IC_Google } from "@/assets/icons/index.ts";
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user != null) navigate("/");
    }, [user]);
    return (
        <div className=" w-screen flex-1 p-4 h-screen flex flex-col gap-4 bg-[#f5f5f5]">
            <NavigationBar />
            <div className="max-w-full pt-[100px] px-32 flex flex-row">
                <div className="flex flex-1 pr-[10rem] flex-col">
                    <h1 className="text-[90px] text-transparent bg-clip-text bg-gradient-to-r from-[#0088FF] via-[#A033FF] to-[#FF5C87] break-words">
                        Tụ họp mọi lúc, mọi nơi
                    </h1>
                    <p className="text-left break-words text-[20px] mt-5">
                        Với Messenger, việc kết nối với những người thân yêu
                        thật đơn giản và thú vị.
                    </p>
                    <div className="relative group h-12 items-center w-max mt-5">
                        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                        <Button
                            title="Get quote now"
                            className="relative inline-flex items-center justify-center px-5 gap-3 py-2 text-lg font-bold text-white transition-all duration-200 bg-white font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            role="button"
                            onClick={() =>
                                auth.signInWithRedirect(
                                    new firebase.auth.GoogleAuthProvider()
                                )
                            }
                        >
                            <IC_Google />
                            <a className="text-[#4c54e5]" href="#">
                                Sign in with Google
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-1">
                    <img src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.8562-6/120973513_338186077283942_8148888802958728934_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=elmiq7p9JCAQ7kNvgHC1m9w&_nc_ht=scontent.fsgn5-8.fna&oh=00_AYBAN5c7hj-J-5BLMEP_y_Dbpw5jGOQuJf_ndWR71tiuQw&oe=667461E7" />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
