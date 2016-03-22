.pragma library

var model = null
var xDimension = 1
var yDimension = 1

function initialize(someModel, x, y){
	model = someModel
	xDimension = x
	yDimension = y

	for(var i = 0; i < xDimension * yDimension; ++i){
		var randomValue = Math.random(new Date()) % 10
		var cell = { "alive":  (randomValue > 0.8) }
		model.append(cell)
	}
}

function lifeCycle(){

	for(var k = 0; k < model.count; ++k){

		var _currentCell = model.get(k)
		if(!_currentCell.alive) continue

		var cellX = k % xDimension
		var cellY = k / yDimension

		var neighboursAlive = 0
		for(var i = Math.max(0, cellX - 1); i < Math.min(xDimension - 1, cellX + 1); ++i){
			for(var j = Math.max(0, cellY - 1); j < Math.min(yDimension - 1, cellY + 1); ++j){
				var targetIndex = (j * (yDimension - 1)) + i
				neighboursAlive += model.get(targetIndex).alive ? 1 : 0
			}
		}

		var isAlive = (neighboursAlive >= 1 && neighboursAlive <= 2)
		var cellIndex = (yDimension - 1) * cellY + cellX
		model.set(cellIndex, {"alive" : isAlive})
	}
}
