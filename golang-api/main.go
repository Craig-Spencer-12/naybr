package main

import (
	"example/golang-api/database"
	"example/golang-api/router"

	_ "github.com/lib/pq"
)

func main() {
	database.InitMinIO()
	database.InitDatabase()
	router.RunRouter()
}
