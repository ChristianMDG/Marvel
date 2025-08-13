const express = require('express');
const app = express();
const fs = require('fs').promises;
const cors = require('cors');
const path = require('path');

const PORT = 8080;
const DATA_FILE = path.join(__dirname, 'characters.json');

app.use(cors());
app.use(express.json());

// Fonction utilitaire pour s'assurer que le fichier existe
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE);
        const content = await fs.readFile(DATA_FILE, 'utf8');
        JSON.parse(content); 
    } catch {
        await fs.writeFile(DATA_FILE, '[]', 'utf8');
    }
}

// Lire les personnages
async function readCharacters() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Écrire les personnages
async function writeCharacters(chars) {
    await fs.writeFile(DATA_FILE, JSON.stringify(chars, null, 2));
}

// GET : Accueil
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// GET : Tous les personnages
app.get('/characters', async (req, res) => {
    const characters = await readCharacters();
    res.json(characters);
});

// GET : Personnage par ID
app.get('/characters/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const characters = await readCharacters();
    const found = characters.find(c => c.id === id);
    if (!found) return res.status(404).json({ message: 'Personnage non trouvé' });
    res.json(found);
});

// POST : Ajouter un personnage
app.post('/characters', async (req, res) => {
    const { name, realName, universe } = req.body;
    if (!name || !realName || !universe) {
        return res.status(400).json({ message: 'Champs manquants' });
    }
    const characters = await readCharacters();
    const newCharacter = {
        id: characters.length ? Math.max(...characters.map(c => c.id)) + 1 : 1,
        name,
        realName,
        universe
    };
    characters.push(newCharacter);
    await writeCharacters(characters);
    res.status(201).json(newCharacter);
});

// PUT : Modifier un personnage
app.put('/characters/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, realName, universe } = req.body;
    const characters = await readCharacters();
    const index = characters.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Personnage introuvable' });
    characters[index] = { ...characters[index], name, realName, universe };
    await writeCharacters(characters);
    res.json(characters[index]);
});

// DELETE : Supprimer un personnage
app.delete('/characters/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const characters = await readCharacters();
    const index = characters.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'Personnage introuvable' });
    const deleted = characters.splice(index, 1);
    await writeCharacters(characters);
    res.json({ message: 'Personnage supprimé', deleted: deleted[0] });
});

// Lancer le serveur
ensureDataFile().then(() => {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
});

