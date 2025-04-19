compose:
# eval $(minikube docker-env -u)
	docker compose up --build

run:
	docker run --rm -it -p 8080:8080/tcp golang-api:latest

build: 
	docker build -t golang-api .

shell:
	docker run --rm -it -p 8080:8080/tcp golang-api:latest sh

get:
	curl localhost:8080/books

publish:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 510151261560.dkr.ecr.us-east-1.amazonaws.com
	docker tag golang-api:latest 510151261560.dkr.ecr.us-east-1.amazonaws.com/golang-api:latest
	docker push 510151261560.dkr.ecr.us-east-1.amazonaws.com/golang-api:latest

# aws ecs create-cluster --cluster-name golang-cluster --region us-east-1
# aws ecs register-task-definition --cli-input-json file://task-def.json --region us-east-1

# aws ec2 create-security-group --group-name golang-api-sg --description "Allow HTTP access on port 8080" --vpc-id vpc-07ac4f76dd4f4b829
# aws ec2 authorize-security-group-ingress --group-id sg-0533a3478952dec4a --protocol tcp --port 8080 --cidr 0.0.0.0/0
# aws iam create-service-linked-role --aws-service-name ecs.amazonaws.com

# aws ecs create-service \
  --cluster golang-cluster \
  --service-name golang-api-service \
  --task-definition golang-api-task \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-0a8471bca683b04a6],securityGroups=[sg-0533a3478952dec4a],assignPublicIp=ENABLED}" \
  --region us-east-1

# aws ecs describe-tasks --cluster golang-cluster --tasks <task-id> --region <your-region>


# psql -U user -d mydb
# \dt
# SELECT * FROM books;

# curl localhost:8080/users --include --header "Content-Type: application/json" -d @exampleProfile.json --request "POST"
# curl localhost:8080/users/:name=Zach

# curl -X POST -F "image=@/home/craig/Desktop/3.png" http://localhost:8080/image




