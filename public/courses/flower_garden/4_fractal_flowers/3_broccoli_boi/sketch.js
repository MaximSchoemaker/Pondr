function my_garden() {
	my_fractal()
}

function my_fractal() {
	my_stem()

	my_eyes()

	fork_angle = 0
	fork_count = 2
	fork(my_fractal)
}

function my_stem() {
	stem_bend = 2 * (1 / 2 - mouse_x) * (f - 1 / 2)
	depth_max = 10 * mouse_y

	stem_length = 2 * depth_f
	stem()
}

function my_eyes() {
	bud_offset = 2
	bud_size = 1 / 10
	fork_angle = 1 / 3
	fork_count = 2
	fork(bud)
}