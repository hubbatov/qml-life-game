var appWindow

var size = 100
var n = size * size
var matrix = new Array(n)

function initializeRandom(){
	var i = 0
	while(i < n){
		matrix[i] = (Math.random(new Date()) < 0.4) ? 1 : 0
		i++
	}
}

function isAlive(m, x, y){
	if(x >= size || x < 0) return 0
	if(y >= size || y < 0) return 0
	return m[x * size + y]
}

function setAlive(m, x, y, isAlive){
	m[x * size + y] = isAlive
}

function printMatrix(m){
	console.log("=================")
	for(var i = 0; i < size; ++i){
		var s = []
		for(var j = 0; j < size; ++j)
			s.push(isAlive(m, i, j))
		console.log(s)
	}
}

function lifeCycle(){

	var newMatrix = JSON.parse(JSON.stringify(matrix))

	for(var j = 0; j < size; ++j){
		for(var i = 0; i < size; ++i){
			var neighboursAlive = 0

			neighboursAlive += isAlive(matrix, i - 1, j - 1)
			neighboursAlive += isAlive(matrix, i, j - 1)
			neighboursAlive += isAlive(matrix, i + 1, j - 1)
			neighboursAlive += isAlive(matrix, i - 1, j)
			neighboursAlive += isAlive(matrix, i + 1, j)
			neighboursAlive += isAlive(matrix, i - 1, j + 1)
			neighboursAlive += isAlive(matrix, i, j + 1)
			neighboursAlive += isAlive(matrix, i + 1, j + 1)

			setAlive(newMatrix, i, j, neighboursAlive === 3 ? 1 : 0)
		}
	}

	matrix = newMatrix

	if(!!appWindow)
		appWindow.update()
}
