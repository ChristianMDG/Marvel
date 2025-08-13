import React, { useState, useEffect } from "react";
import { getCharacters, createCharacter, updateCharacter, deleteCharacter } from "./services/api";
import CharactersList from "./components/CharactersList";
import CharacterForm from "./components/CharacterForm";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);

  const fetchCharacters = async () => {
    const data = await getCharacters();
    setCharacters(data);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleCreate = async (character) => {
    if (editingCharacter) {
      await updateCharacter(editingCharacter.id, character);
      setEditingCharacter(null);
    } else {
      await createCharacter(character);
    }
    fetchCharacters();
  };

  const handleEdit = (character) => setEditingCharacter(character);
  const handleDelete = async (id) => {
    await deleteCharacter(id);
    fetchCharacters();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Marvel Characters CRUD</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Formulaire */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {editingCharacter ? "Modifier un personnage" : "Ajouter un personnage"}
          </h2>
          <CharacterForm onSubmit={handleCreate} editingCharacter={editingCharacter} />
        </div>

        {/* Liste */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Liste des personnages</h2>
          <CharactersList characters={characters} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default App;
