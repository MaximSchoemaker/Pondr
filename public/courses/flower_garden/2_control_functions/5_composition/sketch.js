function my_garden() {
	my_flower()
}

function my_flower() {
	stem_length = 2
	stem_bend = 2 / 10
	stem()

	branch(my_leaves)

	stem_bend = -2 / 10
	stem()

	branch(my_bud)
}

function my_leaves() {
	petal_color = "green"
	fork_angle = 3 / 4
	fork(petal)
}

function my_bud() {
	ring_count = 11
	ring(petal)

	bud_size = 1 / 2
	bud()
}