package router

import "github.com/gin-gonic/gin"

func RunRouter() {
	engine := gin.Default()

	engine.GET("/user/random", GetRandomUserId)
	engine.GET("/users/:name", GetUserByName)
	engine.POST("/user", CreateUser)
	engine.GET("/profile/:id", GetViewableProfile)

	engine.POST("/activities", CreateActivity)

	engine.POST("/image", UploadImage)
	engine.GET("/image/:filename", GetImage)

	engine.POST("/like", SendLike)

	engine.PUT("/user/:id", UpdateUser)

	engine.Run(":8080")
}
