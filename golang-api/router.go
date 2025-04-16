package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func getAllBooks(c *gin.Context) {
	books, err := getAllBooksQuery()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get all books"})
	}

	c.IndentedJSON(http.StatusOK, books)
}

func getBookById(c *gin.Context) {
	id := c.Param("id")
	book, err := getBookQuery(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, book)
}

func createBook(c *gin.Context) {
	var newBook book

	if err := c.BindJSON(&newBook); err != nil {
		return
	}

	if err := createBookQuery(newBook); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create book"})
	}

	c.IndentedJSON(http.StatusCreated, newBook)
}

func checkoutBook(c *gin.Context) {
	id, ok := c.GetQuery("id")

	if !ok {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Missing id query parameter"})
		return
	}

	err := changeBookQuantityQuery(id, -1)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	book, _ := getBookQuery(id)
	c.IndentedJSON(http.StatusOK, book)
}

func returnBook(c *gin.Context) {
	id, ok := c.GetQuery("id")

	if !ok {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Missing id query parameter"})
		return
	}

	err := changeBookQuantityQuery(id, 1)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	book, _ := getBookQuery(id)
	c.IndentedJSON(http.StatusOK, book)
}
