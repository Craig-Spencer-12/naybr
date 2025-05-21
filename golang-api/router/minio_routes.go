package router

import (
	"example/golang-api/database"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func UploadImage(c *gin.Context) {

	folder := c.Request.FormValue("folder")
	file, fileHeader, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	defer file.Close()
	fileName := fmt.Sprintf("%s/%s", folder, fileHeader.Filename)

	tmpFile, err := os.CreateTemp("", "uploaded-*")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create temporary file"})
		return
	}
	defer tmpFile.Close()

	_, err = io.Copy(tmpFile, file)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save uploaded file"})
		return
	}

	err = database.UploadImageQuery(fileName, tmpFile.Name(), "image/jpeg")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload file to MinIO"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": fmt.Sprintf("File uploaded successfully: %s", fileHeader.Filename)})
}

func GetImage(c *gin.Context) {

	userId := c.Param("userId")
	fileName := c.Param("filename")
	path := fmt.Sprintf("%s/%s", userId, fileName)

	imageObject, err := database.GetImageQuery(path)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get the file from MinIO"})
	}
	defer imageObject.Close()

	c.Header("Content-Type", "image/png")

	_, err = io.Copy(c.Writer, imageObject)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to stream the image"})
		return
	}
}
