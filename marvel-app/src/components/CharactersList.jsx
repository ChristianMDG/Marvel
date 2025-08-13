// import React from "react";

// const CharactersList = ({ characters, onEdit, onDelete }) => {
//   return (
//     <div className="space-y-4">
//       {characters.map((c) => (
//         <div key={c.id} className="p-4 border rounded flex justify-between items-center">
//           <div>
//             <h2 className="font-bold">{c.name}</h2>
//             <p>{c.realName} | {c.universe}</p>
//           </div>
//           <div className="space-x-2">
//             <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => onEdit(c)}>Modifier</button>
//             <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(c.id)}>Supprimer</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CharactersList;


import React from "react";

const CharactersList = ({ characters, onEdit, onDelete }) => {
  if (!characters.length) return <p className="text-gray-500">Aucun personnage trouvé.</p>;

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto">
      {characters.map((c) => (
        <div key={c.id} className="flex justify-between items-center p-4 bg-purple-50 rounded-lg shadow-sm">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{c.name}</h3>
            <p className="text-gray-600">{c.realName} | {c.universe}</p>
          </div>
          <div className="space-x-2">
            <button
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
              onClick={() => onEdit(c)}
            >
              Modifier
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={() => onDelete(c.id)}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharactersList;
