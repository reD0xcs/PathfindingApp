
# Vizualizator Pathfinding 

Acesta este o aplicație web de vizualizare a algoritmilor de pathfinding într-un grid. Aplicația este dezvoltată în React și oferă o interfață interactivă pentru a vizualiza modul în care algoritmii precum Dijkstra și BFS găsesc căile într-un grid.

## Caracteristici

- **Vizualizare Algoritm Dijkstra:** Permite utilizatorului să vadă modul în care algoritmul Dijkstra găsește cea mai scurtă cale între două puncte pe o grilă.

- **Vizualizare Algoritm BFS:** Oferă o vizualizare interactivă a modului în care algoritmul BFS traversează grila pentru a găsi cea mai scurtă cale.

- **Selectare Noduri de Start și Destinație:** Utilizatorul poate selecta noduri de start și destinație pentru a vedea cum algoritmii găsesc căile între acestea.

- **Creare și Eliminare Ziduri:** Posibilitatea de a crea și elimina ziduri în grilă pentru a testa algoritmii în condiții diferite.

## Structura Proiectului

### 1. **binaryHeap.js**

Clasa `MinBinaryHeap` implementează un heap binar minim folosit în algoritmul Dijkstra pentru gestionarea priorităților.

### 2. **bfs.js**

Modulul `bfs.js` conține implementarea algoritmului Breadth-First Search (BFS) pentru parcurgerea în lățime a grilei.

### 3. **dijkstra.js**

Modulul `dijkstra.js` conține implementarea algoritmului Dijkstra pentru găsirea celei mai scurte căi într-o grilă.

### 4. **DoublyLinkedList.js**

Clasa `DoublyLinkedList` reprezintă o listă dublu înlănțuită, utilizată în implementarea algoritmului BFS.

### 5. **PathfindingVisualizer.jsx**

Componenta `PathfindingVisualizer` este componenta principală React care adaugă interactivitate și randarea vizualizării algoritmilor.

## Cum Rulezi Aplicația

1. **Instalează Dependințele:**
   ```bash
   npm install
   ```

2. **Rulează Aplicația:**
   ```bash
   npm start
   ```

Aplicația va fi disponibilă la adresa [http://localhost:3000/](http://localhost:3000/).
