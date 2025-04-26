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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.IndentedJSON(http.StatusCreated, newUser)
}

func GetViewableProfile(c *gin.Context) {
	id := c.Param("id")
	profile, err := database.GetViewableProfileQuery(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, profile)
}

func CreateActivity(c *gin.Context) {
	var newActivity models.Activity

	if err := c.BindJSON(&newActivity); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Message": "Failed to bind json to object", "Error": err})
		return
	}

	if err := database.CreateActivityQuery(newActivity); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Message": "Failed to create activity", "Error": err})
		return
	}

	c.IndentedJSON(http.StatusCreated, newActivity)
}

func SendLike(c *gin.Context) {
	var newLike models.Like

	if err := c.BindJSON(&newLike); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Message": "Failed to bind json to object", "Error": err})
		return
	}

	if err := database.SendLikeQuery(newLike); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Message": "Failed to send like", "Error": err})
		return
	}

	c.IndentedJSON(http.StatusCreated, newLike)
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
