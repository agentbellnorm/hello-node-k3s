pipeline {
    agent {
        kubernetes {
            defaultContainer 'node'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: arm64v8/node:17-bullseye-slim
      command: ["sleep", "infinity"]
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
                sh 'npm install'
            }
        }
        stage('Build Image') {
            steps {
                sh 'node buildContainer.js'
            }
        }
    }
}