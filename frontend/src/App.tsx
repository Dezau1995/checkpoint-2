import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import Home from "./pages/Home";
import CountryDetails from "./components/CountryDetail";
import AddCountry from "./components/AddCountry";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <nav className="bg-gray-100 p-4 flex gap-4">
          <Link to="/">Accueil</Link>
          <Link to="/add">Ajouter un pays</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="/add" element={<AddCountry />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
