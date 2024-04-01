function my_garden() {
	depth_max = 3
	my_fractal()
}

function my_fractal() {
	stem_width = 1 / 2
	stem()
	ring_count = 3
	ring(my_fractal)
}