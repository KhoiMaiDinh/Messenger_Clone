import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/main/Home";
import { NextUIProvider } from "@nextui-org/react";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
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
            <RouterProvider router={router} />
        </NextUIProvider>
    );
}

export default App;
