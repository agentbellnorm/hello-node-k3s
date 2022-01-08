pipeline {
    agent {
        kubernetes {
            defaultContainer 'node'
            yaml """
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsUser: 1000 # default UID of jenkins user in agent image
  containers:
    - name: node
      image: arm64v8/node:17-bullseye
      command:
      - cat
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