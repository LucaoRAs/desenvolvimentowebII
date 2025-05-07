package main

import "fmt"

func main(){
	preco := 100.0
	var quantidade float64
	quantidade = 5

	total := preco * quantidade
	if (quantidade >=5) {
		total = total - (total * 10 /100)
	}

	fmt.Println("O total é: ", total)
}