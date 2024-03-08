function my_garden() {

	stem_length = 2
	bud_size = 1
	petal_width = 1 / 2
	stem_bend = 1 / 10

	my_flower()

	stem_length = 3
	bud_size = 1
	petal_width = 1
	stem_bend = - 2 / 10

	my_flower()

	stem_length = 1
	bud_size = 1 / 2
	petal_width = 2
	stem_bend = 3 / 10

	my_flower()
}


function my_flower() {
	stem()
	bud()
	petal()
}