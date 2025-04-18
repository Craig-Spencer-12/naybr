package main

import (
	"example/golang-api/database"
	"example/golang-api/models"
	"example/golang-api/router"

	_ "github.com/lib/pq"
)

func main() {

	database.InitMinIO()

	// database.UploadImageQuery("test", "example.png", "./assets/example.png", "image/png")

	database.InitDatabase()

	for _, book := range models.ExampleBooks {
		database.CreateBookQuery(book)
	}

	router.RunRouter()
}
