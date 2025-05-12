import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COUNTRIES } from "../api/query";

interface Country {
  code: string;
  name: string;
  emoji: string;
}

interface CountriesData {
  countries: Country[];
}

export default function Home() {
  const { data, loading, error } = useQuery<CountriesData>(GET_COUNTRIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des pays.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des pays</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.countries.map((country) => (
          <Link
            key={country.code}
            to={`/country/${country.code}`}
            className="border p-4 rounded shadow hover:shadow-md"
          >
            <p className="text-xl">
              {country.emoji} {country.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
