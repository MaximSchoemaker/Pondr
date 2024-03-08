function my_garden() {
	my_fractal()
}

function my_fractal() {
	stem_bend = 2 * (0.5 - mouse_x) * (f - 1 / 2)
	grow_depth = 10 * mouse_y

	stem_length = 0.25 * (1 + grow_depth - depth)
	stem()

	bud_offset = 2
	bud_size = 1 / 10
	fork_angle = 1 / 3
	fork_count = 2
	fork(bud)

	fork_angle = 0
	fork_count = 2
	fork(my_fractal)
}