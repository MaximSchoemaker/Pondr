function my_garden() {
	stem_color = "PaleGreen"
	stem_length = 3
	stem_bend = - 1 / 5
	turn(1 / 20)
	stem()

	petal_color = "orchid"

	ring_count = 11
	ring(petal)

	bud_color = "PeachPuff"
	bud_size = 2 / 3
	branch(bud)

	bud_color = "SlateBlue"
	bud_size = 1 / 7

	ring_count = 13
	ring_radius = 1 / 3
	ring(bud)
}
