package router

import "github.com/gin-gonic/gin"

func RunRouter() {
	engine := gin.Default()

	engine.POST("/user", CreateUser)
	engine.GET("/user/:id", GetViewableProfile)
	engine.PUT("/user/:id", UpdateUser)
	engine.GET("/user/random", GetRandomUserId)

	engine.POST("/activities", CreateActivity)

	engine.POST("/like", SendLike)
	engine.GET("/likes/:id", GetLikeList)

	engine.POST("/image", UploadImage)
	engine.GET("/image/:userId/:filename", GetImage)

	engine.Run(":8080")
}
