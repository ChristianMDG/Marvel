import axios from "axios";

const baseUrl = "http://localhost:8080/characters";

// Lire tous les personnages
export const getCharacters = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

// Créer un personnage
export const createCharacter = async (character) => {
  const res = await axios.post(baseUrl, character);
  return res.data;
};

// Modifier un personnage
export const updateCharacter = async (id, character) => {
  const res = await axios.put(`${baseUrl}/${id}`, character);
  return res.data;
};

// Supprimer un personnage
export const deleteCharacter = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  return res.data;
};
