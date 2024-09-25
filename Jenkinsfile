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
            agentContainer 'jnlp'
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: nodejs
                image: node:18-bullseye-slim    # Use the appropriate Node.js version here
                tty: true
              - name: podman
                image: mgoltzsche/podman:minimal
                tty: true
            """
        }
    }
    stages {
        stage('install') {
            steps {
                container('nodejs') {
                    sh 'npm ci'
                }
            }
        }
        stage('build image') {
            steps {
                container('podman') {
                    sh 'podman -v'
                    sh 'podman build --previleged --tag $IMAGE_NAME -f ./Dockerfile'
                }
            }
        }
    }
}
