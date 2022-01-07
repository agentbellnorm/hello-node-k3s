pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
        }
    }
    stages {
        stage('Install') {
            steps {
                container('arm64v8/node:17-bullseye-slim') {
                    sh 'npm install'
                }
            }
        }
        stage('Build Image') {
            steps {
                container('arm64v8/node:17-bullseye-slim') {
                    sh 'node buildContainer.js'
                }
            }
        }
    }
}