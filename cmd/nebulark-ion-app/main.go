package main

import (
	"github.com/maxence-charriere/go-app/v7/pkg/app"
	"github.com/pojntfx/nebulark/pkg/components"
)

func main() {
	app.Route("/", &components.AppComponent{
		JSONGoCalculatorInput: `{"firstAddend": 1, "secondAddend": 2}`,
	})

	app.Run()
}
