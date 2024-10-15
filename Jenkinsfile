pipeline {
    environment {
        REGISTRY_URL = 'docker-registry-service.docker-registry.svc.cluster.local:5000'
        REGISTRY_CREDS = credentials('docker-registry-private')
        IMAGE_NAME='test/hello-node-k3s'
        GIT_SHORT_HASH = "${GIT_COMMIT[0..7]}"
        DEPLOYMENT_MANIFEST=".kubernetes/02-deployment.yml"
    }
    agent {
        kubernetes {
            agentContainer 'jnlp'
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              securityContext:
                runAsUser: 1000
              containers:
              - name: nodejs
                image: node:18-bullseye-slim    # Use the appropriate Node.js version here
                tty: true
              - name: yq
                image: mikefarah/yq:4.44.1
                command: 
                  - /bin/sh
                tty: true
              - name: podman
                image: quay.io/containers/podman:v5.2.3
                tty: true
                securityContext:
                  privileged: true  # Required for using the overlay driver
                env:
                  - name: STORAGE_DRIVER
                    value: overlay
            """
        }
    }
    stages {
        stage('install') {
            steps {
                container('nodejs') {
                    sh 'npm ci'
                }
            }
        }
        stage('build image') {
            steps {
                container('podman') {
                    sh 'podman -v'
                    sh 'podman build --tag $IMAGE_NAME -f ./Dockerfile'
                    sh 'podman push $IMAGE_NAME $REGISTRY_URL/$IMAGE_NAME:$GIT_SHORT_HASH --creds=$REGISTRY_CREDS --tls-verify=false'
                }
            }
        }
        stage('update k8s deployment') {
            steps {
                container('yq') {
                    sh 'cat $DEPLOYMENT_MANIFEST'
                    sh 'yq -i ".spec.template.spec.containers[0].image |= sub(\\\":[^:]+$\\\", \\\":$GIT_SHORT_HASH\\\")" $DEPLOYMENT_MANIFEST'
                    sh 'cat $DEPLOYMENT_MANIFEST'
                },
                sshagent(['github-ssh-key']) {
                    sh 'git config --global user.name "Jenkins"'
                    sh 'git config --global user.email "jenkins@raspberrypile.com"'
                    sh 'git add $DEPLOYMENT_MANIFEST'
                    sh 'git commit -m "Update container image tag in k8s deployment"'
                }
            }
        }
    }
}
