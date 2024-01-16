document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");

    // Define the initial configuration (customize this array as needed)
    const initialConfiguration = [1, 2, 3, 4, 5, 6, 7, "",8 ];

    // Create puzzle pieces
    for (let i = 0; i < initialConfiguration.length; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.innerText = initialConfiguration[i];
        tile.addEventListener("click", () => handleTileClick(tile));
        puzzleContainer.appendChild(tile);
    }

    // Shuffle puzzle pieces (optional - remove this line if you want to use the initial configuration as is)
    shuffleTiles(initialConfiguration);
});

function shuffleTiles(configuration) {
    const puzzleContainer = document.getElementById("puzzle-container");
    const tiles = Array.from(puzzleContainer.children);

    if (configuration) {
        // Use the provided configuration
        configuration.forEach((value, index) => {
            tiles[index].innerText = value;
        });
    } else {
        // Shuffle the tiles randomly
        tiles.sort(() => Math.random() - 0.5);
    }

    tiles.forEach((tile) => puzzleContainer.appendChild(tile));
}

function handleTileClick(tile) {
    const puzzleContainer = document.getElementById("puzzle-container");
    const tiles = Array.from(puzzleContainer.children);
    const emptyTile = tiles.find((t) => t.innerText === "");

    if (isAdjacent(tile, emptyTile)) {
        // Swap positions
        const tileIndex = tiles.indexOf(tile);
        const emptyIndex = tiles.indexOf(emptyTile);
        tiles[tileIndex] = emptyTile;
        tiles[emptyIndex] = tile;

        // Update the DOM
        puzzleContainer.innerHTML = "";
        tiles.forEach((t) => puzzleContainer.appendChild(t));

        // Check if the puzzle is solved
        if (isPuzzleSolved(tiles)) {
            alert("Congratulations! You solved the puzzle!");
            shuffleTiles();
        }
    }
}

function isAdjacent(tile1, tile2) {
    const tile1Index = Array.from(tile1.parentNode.children).indexOf(tile1);
    const tile2Index = Array.from(tile2.parentNode.children).indexOf(tile2);

    return (
        Math.abs(tile1Index - tile2Index) === 1 ||
        Math.abs(tile1Index - tile2Index) === 3
    );
}

function isPuzzleSolved(tiles) {
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i].innerText !== "" && parseInt(tiles[i].innerText) !== i + 1) {
            return false;
        }
    }
    return true;
}
