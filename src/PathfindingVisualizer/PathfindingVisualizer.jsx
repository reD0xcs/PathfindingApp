import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { bfs } from '../algorithms/bfs';
import './PathfindingVisualizer.css';

/**
 * Componenta principală pentru vizualizarea algoritmilor de căutare a căilor într-un grid.
 * @class
 */
export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            stats: {
                distance: 0,
                nodesVisited: 0,
                timeTaken: 0,
            },
            selectedAlgorithm: 'dijkstra',
        };
    }

    componentDidMount() {
        this.resetGrid();
    }

    /**
     * Resetează grid-ul la configurația inițială.
     */
    resetGrid() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    /**
     * Manipulează evenimentul de apăsare a click-ului.
     * @param {number} row - Rândul nodului.
     * @param {number} col - Coloana nodului.
     */
    handleMouseDown(row, col) {
        const { startNodePressed, finishNodePressed, grid } = this.state;

        if (startNodePressed) {
            const newGrid = updateStartNode(grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true, startNodePressed: false });
        } else if (finishNodePressed) {
            const newGrid = updateFinishNode(grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true, finishNodePressed: false });
        } else {
            const newGrid = getNewGridWithWallToggled(grid, row, col);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }

    /**
     * Manipulează evenimentul de mișcare a mouse-ului deasupra nodului.
     * @param {number} row - Rândul nodului.
     * @param {number} col - Coloana nodului.
     */
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;

        const { startNodePressed, finishNodePressed, grid } = this.state;

        if (startNodePressed) {
            const newGrid = updateStartNode(grid, row, col);
            this.setState({ grid: newGrid });
        } else if (finishNodePressed) {
            const newGrid = updateFinishNode(grid, row, col);
            this.setState({ grid: newGrid });
        } else {
            const newGrid = getNewGridWithWallToggled(grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    /**
     * Manipulează evenimentul de ridicare a click-ului.
     */
    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    /**
     * Manipulează selectarea unui tip de nod (start sau finish).
     * @param {string} type - Tipul nodului (start sau finish).
     */
    handleNodeSelection(type) {
        if (type === 'start') {
            this.setState({ startNodePressed: true, finishNodePressed: false });
        } else if (type === 'finish') {
            this.setState({ startNodePressed: false, finishNodePressed: true });
        }
    }

    /**
     * Vizualizează un algoritm de căutare a căii selectat.
     * @param {string} algorithm - Numele algoritmului (dijkstra sau bfs).
     */
    visualizeAlgorithm = (algorithm) => {
        const { grid } = this.state;
        const startNode = getStartNode(grid);
        const finishNode = getFinishNode(grid);

        const startTime = performance.now(); // Start măsurarea timpului

        let visitedNodesInOrder;
        if (algorithm === 'dijkstra') {
            visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        } else if (algorithm === 'bfs') {
            visitedNodesInOrder = bfs(grid, startNode, finishNode);
        }

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

        const endTime = performance.now(); // Stop măsurarea timpului
        const timeTaken = endTime - startTime;

        this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

        this.setState({
            stats: {
                distance: finishNode.distance,
                nodesVisited: visitedNodesInOrder.length,
                timeTaken: timeTaken.toFixed(2),
            },
        });
    };

    /**
     * Animează nodurile vizitate și nodurile din cel mai scurt drum.
     * @param {Array<object>} visitedNodesInOrder - Nodurile vizitate în ordinea parcurgerii.
     * @param {Array<object>} nodesInShortestPathOrder - Nodurile din cel mai scurt drum.
     */
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
        console.log('Animating Algorithm...');
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                console.log(`Visiting node at row ${node.row}, col ${node.col}`);
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    /**
     * Animează cel mai scurt drum.
     * @param {Array<object>} nodesInShortestPathOrder - Nodurile din cel mai scurt drum.
     */
    animateShortestPath(nodesInShortestPathOrder) {
        console.log('Animating Shortest Path...');
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                console.log(`Animating shortest path at row ${node.row}, col ${node.col}`);
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    /**
     * Randarea componentei.
     * @returns {JSX.Element} - Elementul React pentru randarea componentei.
     */
    render() {
        const { grid, mouseIsPressed, stats, selectedAlgorithm } = this.state;

        return (
            <>
                <div>
                    <button onClick={() => this.visualizeAlgorithm('dijkstra')}>
                        Visualize Dijkstra's Algorithm
                    </button>
                    <button onClick={() => this.visualizeAlgorithm('bfs')}>
                        Visualize BFS Algorithm
                    </button>
                    <button onClick={() => this.handleNodeSelection('start')}>
                        Select Start Node
                    </button>
                    <button onClick={() => this.handleNodeSelection('finish')}>
                        Select Finish Node
                    </button>
                    <p>Distance: {stats.distance}</p>
                    <p>Nodes Visited: {stats.nodesVisited}</p>
                    <p>Time Taken: {stats.timeTaken} ms</p>
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

/**
 * Actualizează nodul de start în grid.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @param {number} row - Rândul nodului de start.
 * @param {number} col - Coloana nodului de start.
 * @returns {Array<Array<object>>} - Grid-ul actualizat.
 */
function updateStartNode(grid, row, col) {
    const newGrid = grid.slice();
    const oldStartNode = getStartNode(newGrid);
    const newStartNode = newGrid[row][col];
    newStartNode.isStart = true;
    oldStartNode.isStart = false;
    return newGrid;
}

/**
 * Actualizează nodul de destinație în grid.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @param {number} row - Rândul nodului de destinație.
 * @param {number} col - Coloana nodului de destinație.
 * @returns {Array<Array<object>>} - Grid-ul actualizat.
 */
function updateFinishNode(grid, row, col) {
    const newGrid = grid.slice();
    const oldFinishNode = getFinishNode(newGrid);
    const newFinishNode = newGrid[row][col];
    newFinishNode.isFinish = true;
    oldFinishNode.isFinish = false;
    return newGrid;
}

/**
 * Creează un grid inițial cu noduri.
 * @returns {Array<Array<object>>} - Grid-ul inițial.
 */
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

/**
 * Creează un nod cu anumite coordonate.
 * @param {number} col - Coloana nodului.
 * @param {number} row - Rândul nodului.
 * @returns {object} - Nodul creat.
 */
const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === 1 && col === 1,
        isFinish: row === 10 && col === 10,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

/**
 * Obține un nou grid cu un perete activat sau dezactivat într-un anumit nod.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @param {number} row - Rândul nodului.
 * @param {number} col - Coloana nodului.
 * @returns {Array<Array<object>>} - Grid-ul actualizat.
 */
const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

/**
 * Obține nodul de start din grid.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @returns {object|null} - Nodul de start sau null dacă nu este găsit.
 */
function getStartNode(grid) {
    for (const row of grid) {
        for (const node of row) {
            if (node.isStart) {
                return node;
            }
        }
    }
    return null;
}

/**
 * Obține nodul de destinație din grid.
 * @param {Array<Array<object>>} grid - Grid-ul de noduri.
 * @returns {object|null} - Nodul de destinație sau null dacă nu este găsit.
 */
function getFinishNode(grid) {
    for (const row of grid) {
        for (const node of row) {
            if (node.isFinish) {
                return node;
            }
        }
    }
    return null;
}
