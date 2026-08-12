import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";
import Templates from "./pages/Templates/Templates";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/builder"
                    element={<Builder />}
                />

                <Route
                    path="/templates"
                    element={<Templates />}
                />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}