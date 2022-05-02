const gridElement = document.querySelector(".grid-container")
const gridSize = 10

let grid = [];

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
        console.log(x,y, row, cell)
        let newCell = document.createElement('div')
        newCell.classList.add("grid-item")
        newCell.classList.add("wall")
        newCell.innerHTML = cell

        gridElement.appendChild(newCell)
    })
})

