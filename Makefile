
node_modules:
	@cd src && yarn

run: node_modules
	@cd src && node index.js

docker:
	@docker build -t ferimer/webhookbackendsample:latest .

publish: docker
	@docker push ferimer/webhookbackendsample:latest
