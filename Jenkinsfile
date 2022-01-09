pipeline {
    environment {
        REGISTRY_URL = 'docker-registry-service.docker-registry.svc.cluster.local:5000'
        REGISTRY_CREDS = credentials('docker-registry-private')
        IMAGE_NAME='test/hello-node-k3s'
        GIT_SHORT_HASH = "${GIT_COMMIT[0..7]}"
        DEPLOY_MANIFEST=".kubernetes/02-deployment.yml"
    }
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
                sh 'podman build --tag $IMAGE_NAME -f ./Dockerfile'
                sh 'podman push $IMAGE_NAME $REGISTRY_URL/$IMAGE_NAME:$GIT_SHORT_HASH --creds=$REGISTRY_CREDS --tls-verify=false'
            }
        }
        stage('Deploy') {
            steps{
                withKubeConfig([credentialsId: 'rpile-kubeconfig']) {
                    // in the deployment yaml file, replace the image tag with the current git hash
                    sh """#!/bin/bash
                          cat "${DEPLOY_MANIFEST}" | grep image
                          sed -i 's|${IMAGE_NAME}:latest|${IMAGE_NAME}:${GIT_SHORT_HASH}|' "${DEPLOY_MANIFEST}"
                          cat "${DEPLOY_MANIFEST}" | grep image
   """
                    
                    // apply the new deployment
                    sh 'kubectl apply -f $DEPLOY_MANIFEST'
                }
            }
        }
    }
}
