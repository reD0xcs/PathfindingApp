import DoublyLinkedList from './DoublyLinkedList';

/**
 * Execută algoritmul Breadth-First Search (BFS) pentru a parcurge un grid.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @param {object} startNode - Nodul de start.
 * @param {object} finishNode - Nodul de destinație.
 * @returns {Array<object>} - Nodurile vizitate în ordinea parcurgerii.
 */
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const deque = new DoublyLinkedList();

    // Adaugă nodul de start în lista dublu înlănțuită
    deque.addToBack(startNode);

    while (!deque.isEmpty()) {
        // Extrage primul nod din lista dublu înlănțuită
        const currentNode = deque.removeFromFront();

        // Verifică dacă nodul a fost deja vizitat sau este un zid
        if (currentNode.isVisited) continue;
        if (currentNode.isWall) continue;

        // Marchează nodul ca vizitat
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        // Verifică dacă nodul curent este nodul de destinație
        if (currentNode === finishNode) {
            return visitedNodesInOrder;
        }

        // Obține vecinii nevizitați ai nodului curent
        const neighbors = getUnvisitedNeighbors(currentNode, grid);

        // Adaugă vecinii nevizitați în lista dublu înlănțuită și actualizează nodul anterior
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                deque.addToBack(neighbor);
                neighbor.previousNode = currentNode;
            }
        }
    }

    return visitedNodesInOrder;
}

/**
 * Returnează vecinii nevizitați ai unui nod din grid.
 * @param {object} node - Nodul pentru care se caută vecinii.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @returns {Array<object>} - Vecinii nevizitați ai nodului.
 */
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}
