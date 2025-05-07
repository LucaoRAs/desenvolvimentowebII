package main

import "fmt"

func main() {
	distancia := 100.0
	precoetanol := 3.99
	precogasolina := 5.99

	gastoetanol := distancia / 9.0 * precoetanol
	gastogasolina := distancia / 11.0 * precogasolina

	fmt.Println("Gasto com etanol: ", gastoetanol)
	fmt.Println("Gasto com gasolina: ", gastogasolina)

	if (gastoetanol < gastogasolina) {
		fmt.Println("Compensa abastecer com etanol")
	} else if (gastoetanol > gastogasolina) {
		fmt.Println("Compensa abastecer com gasolina")
	} else {
		fmt.Println("tanto faz")
	}
}