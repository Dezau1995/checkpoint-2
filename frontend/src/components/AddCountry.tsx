import { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COUNTRY } from "../api/mutation";
import { GET_COUNTRIES } from "../api/query";

export enum Continent {
  Europe = "EU",
  Asia = "AS",
  Africa = "AF",
  NorthAmerica = "NA",
  SouthAmerica = "SA",
  Oceania = "OC",
}

interface CountryFormState {
  name: string;
  code: string;
  emoji: string;
  continent?: Continent;
}

export default function AddCountry() {
  const [form, setForm] = useState<CountryFormState>({
    name: "",
    code: "",
    emoji: "",
    continent: undefined,
  });

  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.code || !form.emoji || !form.continent) {
      console.error("Tous les champs doivent être remplis.");
      return;
    }

    try {
      await addCountry({ variables: form });
      setForm({ name: "", code: "", emoji: "", continent: undefined });
    } catch (err) {
      console.error("Erreur lors de l'ajout du pays", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ajouter un pays</h2>

      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Code"
        value={form.code}
        onChange={(e) =>
          setForm({ ...form, code: e.target.value.toUpperCase() })
        }
        required
      />
      <input
        className="w-full p-2 mb-2 border rounded"
        placeholder="Emoji"
        value={form.emoji}
        onChange={(e) => setForm({ ...form, emoji: e.target.value })}
        required
      />

      <select
        className="w-full p-2 mb-4 border rounded"
        value={form.continent}
        onChange={(e) => setForm({ ...form, continent: e.target.value as Continent })}
      >
        <option value="">-- Sélectionner un continent --</option>
        <option value={Continent.Europe}>Europe</option>
        <option value={Continent.Asia}>Asie</option>
        <option value={Continent.Africa}>Afrique</option>
        <option value={Continent.NorthAmerica}>Amérique du Nord</option>
        <option value={Continent.SouthAmerica}>Amérique du Sud</option>
        <option value={Continent.Oceania}>Océanie</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ajouter
      </button>
    </form>
  );
}
