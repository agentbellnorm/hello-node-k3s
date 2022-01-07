pipeline {
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