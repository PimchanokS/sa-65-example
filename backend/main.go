package main

import (
	"github.com/PimchanokS/sa-64-example/controller"
	"github.com/PimchanokS/sa-64-example/entity"
	"github.com/PimchanokS/sa-64-example/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			protected.POST("/createroom", controller.CreateRoom) //สร้าง Room
			protected.GET("/room", controller.ListRoom) //ดึง Room

			protected.GET("/type", controller.ListType) //ดึง Type

			protected.GET("/employee/:id", controller.GetEmployee) //ดึง Employee ด้วย id
			protected.GET("/employee", controller.ListEmployee) //ดึง Employee

			protected.GET("/building", controller.ListBuilding) //ดึง Building

			protected.GET("/serviceday", controller.ListServiceDay) //ดึง ServiceDay

			protected.GET("/period", controller.ListPeriod) //ดึง Period

		}
	}
	// Authentication Routes
	r.POST("/login", controller.Login)
	// Run the server
	r.Run()
}
func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}

}
