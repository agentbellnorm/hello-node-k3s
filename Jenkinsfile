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
                sh 'podman build --tag test/hello-node-k3s -f ./Dockerfil'
            }
        }
    }
}