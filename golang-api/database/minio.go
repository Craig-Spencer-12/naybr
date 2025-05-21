package database

import (
	"context"
	"log"
	"os"
	"strings"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var minioClient *minio.Client
var minioBucket string

func InitMinIO() {
	endpoint := os.Getenv("MINIO_ENDPOINT")
	endpoint = strings.TrimPrefix(endpoint, "http://")
	accessKey := os.Getenv("MINIO_ROOT_USER")
	secretKey := os.Getenv("MINIO_ROOT_PASSWORD")
	minioBucket = os.Getenv("MINIO_BUCKET")

	var err error
	minioClient, err = minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: false, // No TLS for local
	})

	if err != nil {
		log.Fatal(err)
	}
}

func UploadImageQuery(name string, path string, contentType string) error {

	_, err := minioClient.FPutObject(context.Background(), minioBucket, name, path, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		return err
	}

	log.Printf("Successfully uploaded %s", name)
	return nil
}

func GetImageQuery(name string) (*minio.Object, error) {
	object, err := minioClient.GetObject(context.Background(), minioBucket, name, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}

	return object, nil
}
