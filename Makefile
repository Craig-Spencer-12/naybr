supabase:
	docker compose -f docker-compose.supabase.yml -f docker-compose.s3.yml -f docker-compose.api.yml -p supabase up --build -d

kube:
	minikube delete
	minikube start

	kubectl apply -f k8s/postgres-pv.yml
	kubectl apply -f k8s/postgres-deployment.yml
	kubectl apply -f k8s/postgres-service.yml
	kubectl apply -f k8s/api-deployment.yml
	kubectl apply -f k8s/api-service.yml

	minikube service golang-api

# kubectl get services
# kubectl get pods
# minikube status

kube-test:
	curl http://$$(minikube ip):30080/books

# psql 'postgres://postgres.your-tenant-id:your-super-secret-and-long-postgres-password@localhost:5432/postgres' 