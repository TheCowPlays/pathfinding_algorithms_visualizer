export function dijkstra(grid, startNode, endNode){
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes);

        const closestNode = unvisitedNodes.shift();

        //if there is a wall, skip it
        if(closestNode.isWall) continue;
        // if distance is infinity, we are trapped and should stop
        if(closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode === endNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid){
    const unvisitedNeighbors = getUnvisidedNeighbors(node, grid);
    for(const neighbor of unvisitedNeighbors){
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisidedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col - 1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid){
    const nodes = [];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

// backtracks from the endNode to find the shortest path
export function getNodesInShortestPathOrder(endNode){
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while(currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}