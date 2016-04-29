.pragma library

var model = []
var tempModel = []
var xDimension = 1
var yDimension = 1

function initializeRandom(x, y){
	xDimension = x
	yDimension = y

	for(var i = 0; i < xDimension; ++i){
		var stroke = []
		var tempStroke = []
		for(var j = 0; j < yDimension; ++j){
			var randomValue = Math.random(new Date()) % 10
			stroke.push((randomValue < 0.3))
		}
		model[i] = stroke
	}
}

function lifeCycle(){
	for(var i = 1; i < xDimension - 1; ++i){
		for(var j = 1; j < yDimension - 1; ++j){
			var neighboursAlive = model[i - 1][j - 1] + model[i][j - 1] + model[i + 1][j - 1] + model[i - 1][j] + model[i + 1][j] + model[i - 1][j + 1] + model[i][j + 1] + model[i + 1][j + 1]
			model[i][j] = ((neighboursAlive > 1) && (neighboursAlive < 3))
		}
	}
}
