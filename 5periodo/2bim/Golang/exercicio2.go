package main

import "fmt"

func main() {
	altura := 1.62
	peso := 70.0
	imc := peso / (altura*altura)

	if (imc < 25){
		fmt.Println("Peso correto com IMC ", imc)
	}else{
		fmt.Println("Peso incorreto com IMC ", imc)
	}
}