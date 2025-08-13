import CharactersList from "./components/CharactersList";



export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Marvel Characters
      </h1>
      <CharactersList />
    </div>
  );
}
