pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node-container
      image: arm64v8/node:17-bullseye-slim
      command:
        - sleep
        args:
        - 99d
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
                container('node-container') {
                    sh 'npm install'
                }
            }
        }
        stage('Build Image') {
            steps {
                container('node-container') {
                    sh 'node buildContainer.js'
                }
            }
        }
    }
}