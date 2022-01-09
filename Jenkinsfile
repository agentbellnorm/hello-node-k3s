pipeline {
    environment {
        REGISTRY_URL = 'docker-registry-service.docker-registry.svc.cluster.local:5000'
        REGISTRY_CREDS = credentials('docker-registry-private')
        IMAGE_NAME='test/hello-node-k3s'
    }
    agent {
        kubernetes {
            defaultContainer 'jnlp'
        }
    }
    stages {
        // stage('Install') {
        //     steps {
        //         sh 'npm install'
        //     }
        // }
        // stage('Build Image') {
        //     steps {
        //         sh 'podman build --tag $IMAGE_NAME -f ./Dockerfile'
        //         sh 'podman push $IMAGE_NAME $REGISTRY_URL/$IMAGE_NAME:latest --creds=$REGISTRY_CREDS --tls-verify=false'
        //     }
        // }
        stage('Deploy') {
            steps{
                kubernetesDeploy configs: '.kubernetes/02-deployment.yml', kubeConfig: [path: ''], kubeconfigId: 'rpile-kubeconfig', secretName: 'docker-registry-htpasswd', secretNamespace: 'docker-registry', ssh: [sshCredentialsId: '*', sshServer: ''], textCredentials: [certificateAuthorityData: '', clientCertificateData: '', clientKeyData: '', serverUrl: 'https://']
            }
        }
    }
}