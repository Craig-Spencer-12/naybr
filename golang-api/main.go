package main

import (
	"example/golang-api/database"
	"example/golang-api/models"
	"example/golang-api/router"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {

	database.InitDatabase()

	for _, book := range models.ExampleBooks {
		database.CreateBookQuery(book)
	}

	engine := gin.Default()
	engine.GET("/books", router.GetAllBooks)
	engine.GET("/books/:id", router.GetBookById)
	engine.POST("/books", router.CreateBook)
	engine.PATCH("/checkout", router.CheckoutBook)
	engine.PATCH("/return", router.ReturnBook)

	engine.Run(":8080")
}
