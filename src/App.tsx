import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/Home.page";
import { Items } from "./pages/Items/Items";
import { Contact } from "./pages/Contact/Contact";
import { About } from "./pages/About/About";
import { ItemDetails } from "./pages/Item Details/ItemDetails";
import { SearchProvider } from "./context/SearchContext";
import { Footer } from "./components/Footer/Footer";
import "./index.css";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <SearchProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<Items />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </SearchProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}
