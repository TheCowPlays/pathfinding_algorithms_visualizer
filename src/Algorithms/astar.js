import { PriorityQueue } from './priority_queue.js';

export function astar(grid, startNode, endNode) {
    const openList = new PriorityQueue((a, b) => a.f - b.f);
    const closedList = new Set();
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.h = heuristic(startNode, endNode);
    startNode.f = startNode.h;
    openList.enqueue(startNode);
    while (!openList.isEmpty()) {
        const currentNode = openList.dequeue();
        closedList.add(currentNode);
        visitedNodesInOrder.push(currentNode);
        if (currentNode === endNode) {
            return visitedNodesInOrder;
        }
        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (closedList.has(neighbor) || neighbor.isWall) continue;
            const gScore = currentNode.distance + 1;
            const hScore = neighbor.h || heuristic(neighbor, endNode);
            neighbor.h = hScore;
            if (!openList.contains(neighbor)) {
                openList.enqueue(neighbor);
                neighbor.distance = gScore;
                neighbor.f = gScore + hScore;
                neighbor.previousNode = currentNode;
            } else if (gScore < neighbor.distance) {
                neighbor.distance = gScore;
                neighbor.f = gScore + hScore;
                neighbor.previousNode = currentNode;
                openList.decreaseKey(neighbor, neighbor.f);
            }
        }
    }
    return visitedNodesInOrder;
}

function heuristic(node, endNode) {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
