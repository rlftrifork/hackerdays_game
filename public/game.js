const gridElement = document.querySelector(".grid-container")
const gridSize = 10

let grid = [];

let cells = Object.freeze([{name:"wall", img:"bricks.png" }])

function createGrid(){
    for (let i = 0; i < gridSize; i++) {
        grid[i] = []
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = "wall"
        }
    }
}
createGrid()
console.table(grid)
console.log(gridElement)

grid.forEach((row, x) =>{

    row.forEach((cell, y)=>{
        // console.log(x,y, row, cell)
        let newCell = new Image(100,100)
        newCell.src = 'bricks.js'
        newCell.classList.add("grid-item")
        newCell.classList.add("wall")
        newCell.innerHTML = cell

        gridElement.appendChild(newCell)
    })
})

