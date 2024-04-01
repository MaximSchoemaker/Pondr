function my_garden() {
	depth_max = 4
	my_fractal()
}

function my_fractal() {
	stem_length = 1
	stem()
	fork(my_fractal)
}