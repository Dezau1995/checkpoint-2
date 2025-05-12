import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

const CountryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div>
        <p>Country not found</p>
        <button onClick={() => navigate("/")}>Back to country list</button>
      </div>
    );
  }

  if (!data?.country) {
    return (
      <div>
        <p>No country found with code {code}</p>
        <button onClick={() => navigate("/")}>Back to country list</button>
      </div>
    );
  }

  const { name, code: countryCode, emoji, continent } = data.country;

  return (
    <div>
      <h1>
        {name} {emoji}
      </h1>
      <p>Code: {countryCode}</p>
      {continent && <p>Continent: {continent.name}</p>}
      <button onClick={() => navigate("/")}>Back to country list</button>
    </div>
  );
};

export default CountryDetail;
