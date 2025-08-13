import { useState, useEffect } from "react";
import axios from "axios";

export default function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/characters")
      .then(res => {

        if (Array.isArray(res.data.characters)) {
          setCharacters(res.data.characters);
        } else {
          setCharacters([]);
          setError("Format de données invalide");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les personnages");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {characters.map((char) => (
        <div key={char.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">{char.name}</h2>
          <p className="text-gray-400">Nom réel : {char.realName}</p>
          <p className="text-gray-400">Univers : {char.universe}</p>
        </div>
      ))}
    </div>
  );
}
