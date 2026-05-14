import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
// Services page removed per request
import { Offers } from "./pages/Offers";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Auth } from "./pages/Auth";
import { Booking } from "./pages/Booking";
import { Destination } from "./pages/Destination";
import { OurServices } from "./pages/OurServices";
import { Tours } from "./pages/Tours";
import { FAQ } from "./pages/FAQ";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  { path: "/admin", Component: AdminDashboard },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "offers", Component: Offers },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "destinations", Component: Destination },
      { path: "our-services", Component: OurServices },
      { path: "tours", Component: Tours },
      { path: "faq", Component: FAQ },
      { path: "auth", Component: Auth },
      { path: "booking", Component: Booking },
      { path: "booking/:offerId", Component: Booking },
    ],
  },
]);
