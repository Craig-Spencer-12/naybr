package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

type book struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Author   string `json:"author"`
	Quantity int    `json:"quantity"`
}

var books = []book{
	{ID: "4", Title: "In Search of Lost Time", Author: "Marcel Proust", Quantity: 2},
	{ID: "5", Title: "The Great Gatsby", Author: "F. Scott Fitzgerald", Quantity: 5},
	{ID: "6", Title: "War and Peace", Author: "Leo Tolstoy", Quantity: 6},
}

func main() {

	initDatabase()

	for _, book := range books {
		createBookQuery(book)
	}

	//Router
	router := gin.Default()
	router.GET("/books", getAllBooks)
	router.GET("/books/:id", getBookById)
	router.POST("/books", createBook)
	router.PATCH("/checkout", checkoutBook)
	router.PATCH("/return", returnBook)
	router.Run(":8080")
}
