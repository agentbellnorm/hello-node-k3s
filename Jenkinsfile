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
      image: arm64v8/node:17-bullseye
      command:
      - sleep
      args:
      - 99d
      securityContext:
      runAsUser: 0
      tty: true
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
        stage('check version') {
            steps {
                sh 'node -v'
            }
        }
    }
}