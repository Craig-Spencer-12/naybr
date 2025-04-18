package router

import "github.com/gin-gonic/gin"

func RunRouter() {
	engine := gin.Default()

	engine.GET("/books", GetAllBooks)
	engine.GET("/books/:id", GetBookById)
	engine.POST("/books", CreateBook)
	engine.PATCH("/checkout", CheckoutBook)
	engine.PATCH("/return", ReturnBook)

	engine.POST("/image", UploadImage)
	engine.GET("/image/:filename", GetImage)

	engine.Run(":8080")
}
