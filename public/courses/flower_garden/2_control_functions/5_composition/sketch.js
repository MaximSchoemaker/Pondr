function my_garden() {
	my_flower()
}

function my_flower() {
	my_leaves()
	my_stem()
	my_bud()
}


function my_leaves() {
	petal_color = "green"
	fork_angle = 3 / 4
	fork(petal)
}


function my_stem() {
	stem_length = 2
	stem_bend = 1 / 5
	stem()

	stem_bend = -1 / 5
	stem()
}


function my_bud() {
	petal_color = "white"
	ring_count = 11
	ring(petal)

	bud_size = 1 / 2
	bud()
}