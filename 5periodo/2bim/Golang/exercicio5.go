package main

import "fmt"

func main() {
	numero := 5
	
	for i:= numero-1 ; i >= 1; i--{
		numero = numero  * i
	}
	fmt.Println(numero)
}