package main

import (
	"example/golang-api/database"
	"example/golang-api/router"

	_ "github.com/lib/pq"
)

func main() {

	database.InitMinIO()

	// database.UploadImageQuery("test", "example.png", "./assets/example.png", "image/png")

	database.InitDatabase()

	router.RunRouter()
}
