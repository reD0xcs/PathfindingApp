import { MinBinaryHeap } from './binaryHeap';

/**
 * Execută algoritmul Dijkstra pentru a găsi cel mai scurt drum într-un grid.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @param {object} startNode - Nodul de start.
 * @param {object} finishNode - Nodul de destinație.
 * @returns {Array<object>} - Nodurile vizitate în ordinea parcurgerii.
 */
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const minHeap = new MinBinaryHeap();
    startNode.distance = 0;
    minHeap.enqueue(startNode, 0);

    while (!minHeap.isEmpty()) {
        const { element: closestNode } = minHeap.dequeue();
        if (closestNode.isVisited) continue;
        if (closestNode.isWall) continue;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) {
            return visitedNodesInOrder;
        }

        updateUnvisitedNeighbors(closestNode, grid, minHeap);
    }

    return visitedNodesInOrder;
}

/**
 * Actualizează vecinii nevizitați ai unui nod și îi adaugă în heap-ul minim.
 * @param {object} node - Nodul pentru care se actualizează vecinii.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @param {MinBinaryHeap} minHeap - Heap minim utilizat pentru priorități.
 */
function updateUnvisitedNeighbors(node, grid, minHeap) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const newDistance = node.distance + 1;
        if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.previousNode = node;
            minHeap.enqueue(neighbor, newDistance);
        }
    }
}

/**
 * Sortează un array de noduri în funcție de distanța lor.
 * @param {Array<object>} unvisitedNodes - Nodurile care urmează să fie sortate.
 */
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
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
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

/**
 * Returnează toate nodurile din grid.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @returns {Array<object>} - Toate nodurile din grid.
 */
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

/**
 * Reconstruiește și returnează drumul cel mai scurt în ordine inversă.
 * @param {object} finishNode - Nodul de destinație.
 * @returns {Array<object>} - Nodurile în ordinea inversă a drumului cel mai scurt.
 */
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
