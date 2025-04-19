package router

import "github.com/gin-gonic/gin"

func RunRouter() {
	engine := gin.Default()

	// engine.GET("/users", GetAllUsers)
	engine.GET("/users/:name", GetUserByName)
	engine.POST("/user", CreateUser)

	// engine.PATCH("/checkout", CheckoutBook)
	// engine.PATCH("/return", ReturnBook)

	engine.POST("/image", UploadImage)
	engine.GET("/image/:filename", GetImage)

	engine.Run(":8080")
}
