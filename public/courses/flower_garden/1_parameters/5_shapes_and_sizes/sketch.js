function my_garden() {
	stem_length = 2
	bud_width = 1
	petal_size = 1 / 2
	stem_bend = 1 / 10
	my_flower()

	stem_length = 1 / 2
	bud_width = 2
	petal_size = 1
	stem_bend = - 2 / 10
	my_flower()

	stem_length = 1
	bud_width = 1 / 2
	petal_size = 2
	stem_bend = 3 / 10
	my_flower()
}


function my_flower() {
	stem()
	bud()
	petal()
}