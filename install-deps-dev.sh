npm install -g yarn
services=("frontend-service" "question-service" "users-service" "matchmaking-service" "collaboration-service" "video-service")
for service in "${services[@]}"; do
  echo "Installing dependencies for $service..." &&
  cd "$service" && yarn install --frozen-lockfile --production=false &&
  cd ..
done
