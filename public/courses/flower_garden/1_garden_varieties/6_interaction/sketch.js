function my_garden() {
	stem_bend = mouse_x - 1 / 2
	stem_size = mouse_y
	stem()
	stem()
	stem()

	bud_offset = mouse_y

	bud()
	bud()

	petal_turn = 1 / 2 - mouse_x

	petal_size = mouse_y
	petal_offset = mouse_y
	petal()
	petal()
	petal()
	petal()
	petal()
}