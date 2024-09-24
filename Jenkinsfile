pipeline {
    environment {
        REGISTRY_URL = 'docker-registry-service.docker-registry.svc.cluster.local:5000'
        REGISTRY_CREDS = credentials('docker-registry-private')
        IMAGE_NAME='test/hello-node-k3s'
        GIT_SHORT_HASH = "${GIT_COMMIT[0..7]}"
        DEPLOY_MANIFEST=".kubernetes/02-deployment.yml"
    }
    agent {
        kubernetes {
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: nodejs
                image: node:18-bullseye-slim    # Use the appropriate Node.js version here
                tty: true
            """
        }
    }
    stages {
        stage('check') {
            steps {
                container('nodejs') {
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }
    }
}
