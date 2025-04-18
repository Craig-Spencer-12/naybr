FROM golang:latest AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/app .
COPY ./assets ./assets
RUN chmod +x ./app
EXPOSE 8080
CMD ["./app"]

