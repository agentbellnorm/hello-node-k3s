pipeline {
    environment {
        GIT_REPO_URL = 'https://github.com/bbende/cloud-native-examples.git'
        GIT_REPO_BRANCH = 'main'
        REGISTRY_URL = 'docker-registry-service.docker-registry.svc.cluster.local:5000'
        REGISTRY_CREDENTIAL = credentials('docker-registry-private')
    }
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: arm64v8/node:17-bullseye-slim
      command: ["tail", "-f", "/dev/null"]
      imagePullPolicy: IfNotPresent
      resources:
        requests:
          memory: "1Gi"
          cpu: "500m"
        limits:
          memory: "1Gi"
"""
        }
    }
    stages {
        stage('Install') {
            steps {
                container('node') {
                    sh 'npm install'
                }
            }
        }
        stage('Build Image') {
            steps {
                container('node') {
                    sh 'node buildContainer.js'
                }
            }
        }
    }
}