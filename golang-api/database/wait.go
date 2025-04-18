package database

import (
	"fmt"
	"log"
	"net"
	"time"
)

func WaitForService(name, host string, port int, maxRetries int, delay time.Duration) {
	address := net.JoinHostPort(host, fmt.Sprintf("%d", port))

	for i := 1; i <= maxRetries; i++ {
		conn, err := net.DialTimeout("tcp", address, 2*time.Second)
		if err == nil {
			conn.Close()
			log.Printf("%s is ready on %s\n", name, address)
			return
		}

		log.Printf("Waiting for %s (%s)... attempt %d/%d", name, address, i, maxRetries)
		time.Sleep(delay)
	}

	log.Printf("ERROR: timed out waiting for %s at %s", name, address)
}
