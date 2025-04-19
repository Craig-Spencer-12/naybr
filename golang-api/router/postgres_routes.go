package router

import (
	"example/golang-api/database"
	"example/golang-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// func GetAllBooks(c *gin.Context) {
// 	books, err := database.GetAllBooksQuery()
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get all books"})
// 	}

// 	c.IndentedJSON(http.StatusOK, books)
// }

func GetUserByName(c *gin.Context) {
	name := c.Param("name")
	user, err := database.GetUserQuery(name)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, user)
}

func CreateUser(c *gin.Context) {
	var newUser models.User

	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to bind json to object"})
		return
	}

	if err := database.CreateUserQuery(newUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create book"})
		return
	}

	c.IndentedJSON(http.StatusCreated, newUser)
}

// func CheckoutBook(c *gin.Context) {
// 	id, ok := c.GetQuery("id")

// 	if !ok {
// 		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Missing id query parameter"})
// 		return
// 	}

// 	err := database.ChangeBookQuantityQuery(id, -1)

// 	if err != nil {
// 		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
// 		return
// 	}

// 	book, _ := database.GetBookQuery(id)
// 	c.IndentedJSON(http.StatusOK, book)
// }

// func ReturnBook(c *gin.Context) {
// 	id, ok := c.GetQuery("id")

// 	if !ok {
// 		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Missing id query parameter"})
// 		return
// 	}

// 	err := database.ChangeBookQuantityQuery(id, 1)

// 	if err != nil {
// 		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
// 		return
// 	}

// 	book, _ := database.GetBookQuery(id)
// 	c.IndentedJSON(http.StatusOK, book)
// }
