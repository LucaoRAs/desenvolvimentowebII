package main

import "fmt"

func main() {
	bill := 1850
	jeff := 1650
	anos := 0

	for jeff < bill{
		bill = bill + 20
		jeff = jeff + 28
		anos ++
	}
	fmt.Println("Vai demorar ", anos, " anos para o Jeff ficar mais rico que o Bill")

}