import React, { useState, useEffect } from "react";

const CharacterForm = ({ onSubmit, editingCharacter }) => {
  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");
  const [universe, setUniverse] = useState("");

  useEffect(() => {
    if (editingCharacter) {
      setName(editingCharacter.name);
      setRealName(editingCharacter.realName);
      setUniverse(editingCharacter.universe);
    }
  }, [editingCharacter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !realName || !universe) return;
    onSubmit({ name, realName, universe });
    setName(""); setRealName(""); setUniverse("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded border-gray-100">
      <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="border-none p-1 w-full bg-gray-100 outline-none" />
      <input type="text" placeholder="Nom réel" value={realName} onChange={(e) => setRealName(e.target.value)} className="border-none p-1 w-full bg-gray-100 outline-none" />
      <input type="text" placeholder="Univers" value={universe} onChange={(e) => setUniverse(e.target.value)} className="border-none p-1 w-full bg-gray-100 outline-none" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
    </form>
  );
};

export default CharacterForm;
