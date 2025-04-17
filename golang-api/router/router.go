package router

import (
	"example/golang-api/database"
	"example/golang-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllBooks(c *gin.Context) {
	books, err := database.GetAllBooksQuery()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get all books"})
	}

	c.IndentedJSON(http.StatusOK, books)
}

func GetBookById(c *gin.Context) {
	id := c.Param("id")
	book, err := database.GetBookQuery(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, book)
}

func CreateBook(c *gin.Context) {
	var newBook models.Book

	if err := c.BindJSON(&newBook); err != nil {
		return
	}

	if err := database.CreateBookQuery(newBook); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create book"})
	}

	c.IndentedJSON(http.StatusCreated, newBook)
}

func CheckoutBook(c *gin.Context) {
	id, ok := c.GetQuery("id")

	if !ok {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Missing id query parameter"})
		return
	}

	err := database.ChangeBookQuantityQuery(id, -1)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	book, _ := database.GetBookQuery(id)
	c.IndentedJSON(http.StatusOK, book)
}

func ReturnBook(c *gin.Context) {
	id, ok := c.GetQuery("id")

	if !ok {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Missing id query parameter"})
		return
	}

	err := database.ChangeBookQuantityQuery(id, 1)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	book, _ := database.GetBookQuery(id)
	c.IndentedJSON(http.StatusOK, book)
}
