function my_garden() {
	ring_count = 30
	ring_radius = 1 / 2
	ring(my_petal)
}

function my_petal() {
	wave_min = 0
	wave_max = 1
	petal_size = wave(f * 3)
	petal()
}