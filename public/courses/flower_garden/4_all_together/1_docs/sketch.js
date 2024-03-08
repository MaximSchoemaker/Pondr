function my_garden() {
	petal_color = "green"
	fork(petal)

	wave_min = -1 / 10
	wave_max = 1 / 10
	stem_bend = wave(t / 2)

	repeat_count = 4
	repeat(stem)

	branch(bud)

	bud_size = 1 / 10
	ring_count = 30
	ring_radius = 1 / 2
	ring(bud, my_petal)
}

function my_petal() {
	petal_color = "white"
	wave_min = 1 / 2
	wave_max = 1
	petal_size = wave(f * 5 + t)
	petal()
}