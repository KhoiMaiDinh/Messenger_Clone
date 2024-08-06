import {
    Navigate,
    Outlet,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";

import { store } from "@/app/store";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/main/Home";
import SignIn from "@/pages/auth/SignIn";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import api from "@/api/apiInstance";
import useDidMountEffect from "@/hooks/useDidMountEffect";

const PrivateRoutes = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const getFile = async (url: string, userUID: string) => {
        const response = await fetch(url);
        let data = await response.blob();
        let file = new File([data], `user_Photo.jpg`, {
            type: data.type,
        });
        return file;
    };

    useEffect(() => {
        if (!user || user === null) {
            navigate("sign-in");
            return;
        }

        api.get("/users/me/", {
            headers: {
                "project-id": import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            },
        })
            .then(() => console.log("User existed"))
            .catch((e) => {
                console.log("Sign in error: ", e.response);
                let formdata = new FormData();
                user.email && formdata.append("email", user.email);
                user.email && formdata.append("username", user.email);
                user.uid && formdata.append("secret", user.uid);
                user.displayName &&
                    formdata.append("first_name", user.displayName);

                user.photoURL &&
                    getFile(user.photoURL, user.uid).then((avatar) => {
                        formdata.append("avatar", avatar, avatar.name);

                        api.post("users/", formdata, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                            .then(() =>
                                console.log("Register new user success")
                            )
                            .catch((e) => console.log("e", e));
                    });
            });
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }, [user]);
    // if (user == null) return <Navigate to="/sign-in" replace />;
    return <Outlet />;
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route element={<PrivateRoutes />}>
                <Route index element={<Home />} />
                <Route
                    path=":id"
                    element={<Home />}
                    // element={<CareerDetails />}
                    // loader={careerDetailsLoader}
                />
            </Route>
            {/* <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact/>} action={contactAction} />
      </Route>
      <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
        <Route 
          index 
          element={<Careers />} 
          loader={careersLoader}
          // errorElement={<CareersError />}
        />
        <Route 
          path=":id" 
          element={<CareerDetails />}
          loader={careerDetailsLoader}
        />
      </Route>

      <Route path="*" element={<NotFound />} /> */}
        </Route>
    )
);

function App() {
    return (
        <NextUIProvider>
            <Provider store={store}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </Provider>
        </NextUIProvider>
    );
}

export default App;
