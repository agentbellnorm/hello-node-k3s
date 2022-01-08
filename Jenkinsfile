pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
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