package router

import "github.com/gin-gonic/gin"

func RunRouter() {
	engine := gin.Default()

	engine.POST("/user", CreateUser)
	engine.GET("/user/:id", GetViewableProfile)
	engine.PUT("/user/:id", UpdateUser)
	engine.GET("/user/random", GetRandomUserId)

	engine.POST("/activities", CreateActivity)
	engine.DELETE("/activities/:id", DeleteActivity)

	engine.POST("/likes", SendLike)
	engine.GET("/likes/:userId", GetLikeList)
	engine.DELETE("/likes/:id", RejectLike)
	engine.POST("/likes/:id/accept", AcceptLike)

	engine.GET("/matches/:userId", GetMatchList)

	engine.POST("/image", UploadImage)
	engine.GET("/image/:userId/:filename", GetImage)

	engine.Run(":8080")
}
