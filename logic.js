function initializeRandom(x, y){
	for(var i = 0; i < xcount; ++i){
		for(var j = 0; j < ycount; ++j){
			var randomValue = Math.random(new Date())
			cellsModel.append({ "alive": (randomValue < 0.3)})
		}
	}
}

function lifeCycle(){
	for(var j = 1; j < xcount - 1; ++j){
		for(var i = 1; i < ycount - 1; ++i){
			var neighboursAlive = cellsModel.get((i  - 1) * xcount + (j - 1)).alive
					+ cellsModel.get(i * xcount + (j - 1)).alive
					+ cellsModel.get((i + 1) * xcount + (j - 1)).alive
					+ cellsModel.get((i - 1) * xcount + j).alive
					+ cellsModel.get((i + 1) + j).alive
					+ cellsModel.get((i - 1) * xcount + (j + 1)).alive
					+ cellsModel.get(i * xcount + (j + 1)).alive
					+ cellsModel.get((i + 1) * xcount + (j + 1)).alive

			cellsModel.setProperty(i * xcount + j,"alive", ((neighboursAlive > 2) && (neighboursAlive < 4)))
		}
	}
}
