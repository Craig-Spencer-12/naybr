package router

import (
	"example/golang-api/database"
	"example/golang-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRandomUserId(c *gin.Context) {
	id, err := database.GetRandomUserIdQuery()

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, id)
}

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
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	c.IndentedJSON(http.StatusCreated, newUser)
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var updatedUser map[string]string

	if err := c.BindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to bind json to object"})
		return
	}

	if err := database.UpdateUserQuery(id, updatedUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.IndentedJSON(http.StatusCreated, updatedUser)
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

func GetLikeList(c *gin.Context) {
	id := c.Param("id")
	list, err := database.GetViewableLikeListQuery(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, list)
}
