package database

import (
	"context"
	"log"
	"os"
	"strings"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var minioClient *minio.Client

func InitMinIO() {
	endpoint := os.Getenv("S3_ENDPOINT")
	endpoint = strings.TrimPrefix(endpoint, "http://")
	accessKey := os.Getenv("S3_ACCESS_KEY")
	secretKey := os.Getenv("S3_SECRET_KEY")

	log.Println("Sleeping for 5 seconds to let MinIO wake up...")
	time.Sleep(5 * time.Second)
	// database.WaitForService("MinIO", "minio")

	var err error
	minioClient, err = minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: false, // No TLS for local
	})

	if err != nil {
		log.Fatal(err)
	}
}

func UploadImageQuery(bucket string, name string, path string) error {

	contentType := "image/png"

	_, err := minioClient.FPutObject(context.Background(), bucket, name, path, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		return err
	}

	log.Printf("Successfully uploaded %s", name)
	return nil
}

func GetImageQuery(bucket string, name string) (*minio.Object, error) {
	object, err := minioClient.GetObject(context.Background(), bucket, name, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}

	return object, nil
}
