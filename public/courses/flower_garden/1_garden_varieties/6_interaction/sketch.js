function my_garden() {
	stem_bend = mouse_x - 1 / 2
	stem_size = mouse_y
	stem()
	stem()
	stem()

	bud_offset = mouse_y
	bud_size = mouse_y + 1 / 2
	bud()
	bud_size = 1 - mouse_y * 1 / 2
	bud()

	petal_size = mouse_y
	petal_offset = mouse_y
	petal_turn = 1 / 2 - mouse_x
	petal()
	petal()
	petal()
	petal()
	petal()
}