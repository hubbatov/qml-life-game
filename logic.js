Qt.include('fft-rosetta.js')

var appWindow

var size = 32
var n = size * size
var matrix = new Array(n)
var imatrix = new Array(n)

var filter = [1,1,1,1,0,1,1,1,1]
var ifilter = [0,0,0,0,0,0,0,0,0]
miniFFT(filter, ifilter)

function initializeRandom(){
	var i = 0
	while(i < n){
		matrix[i] = (Math.random(new Date()) < 0.4) ? 1 : 0
		imatrix[i] = 0
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

	console.time("lifeCycle")

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

			if(neighboursAlive < 2 || neighboursAlive > 3)
				setAlive(newMatrix, i, j, 0)
			if(isAlive(newMatrix, i, j) === 0 && neighboursAlive === 3)
				setAlive(newMatrix, i, j, 1)
		}
	}

	console.timeEnd("lifeCycle")

	matrix = newMatrix

	if(!!appWindow)
		appWindow.update()
}

/*

1. Form a summing matrix (filter), where 1 stand in the cells, the amount of which
we need to get (8 units, the remaining zeros). We provide direct conversion of the matrix
Fourier (this must be done only 1 time).

2. Perform a direct Fourier transform of the matrix with the contents of the playing field.

3. Multiplies each element of the result in the corresponding element of the "summation" matrix of point 1.

4. Perform inverse Fourier transform - and get the matrix with the desired amount of the sum of us
neighbors for each cell.
*/

function lifeCycleFFT(){
	console.time("lifeCycle")
	miniFFT(matrix, imatrix);

	for(var j = 0; j < size; ++j){
		for(var i = 0; i < size; ++i){
			setAlive(i-1,j-1, filter[0])
			setAlive(i,j-1, filter[1])
			setAlive(i+1,j-1, filter[2])
			setAlive(i-1,j, filter[3])
			setAlive(i+1,j, filter[5])
			setAlive(i-1,j+1, filter[6])
			setAlive(i,j+1, filter[7])
			setAlive(i+1,j+1, filter[8])
		}
	}
	miniIFFT(matrix, imatrix)
	console.timeEnd("lifeCycle")

	if(!!appWindow)
		appWindow.update()
}

function miniFFT(re, im) {
	var N = re.length;
	for (var i = 0; i < N; i++) {
		for(var j = 0, h = i, k = N; k >>= 1; h >>= 1)
			j = (j << 1) | (h & 1);
		if (j > i) {
			re[j] = [re[i], re[i] = re[j]][0]
			im[j] = [im[i], im[i] = im[j]][0]
		}
	}
	for(var hN = 1; hN * 2 <= N; hN *= 2)
		for (var i = 0; i < N; i += hN * 2)
			for (var j = i; j < i + hN; j++) {
				var cos = Math.cos(Math.PI * (j - i) / hN),
						sin = Math.sin(Math.PI * (j - i) / hN)
				var tre =  re[j+hN] * cos + im[j+hN] * sin,
						tim = -re[j+hN] * sin + im[j+hN] * cos;
				re[j + hN] = re[j] - tre; im[j + hN] = im[j] - tim;
				re[j] += tre; im[j] += tim;
			}
}

function miniIFFT(re, im){
	miniFFT(im, re);
	for(var i = 0, N = re.length; i < N; i++){
		im[i] /= N;
		re[i] /= N;
	}
}
