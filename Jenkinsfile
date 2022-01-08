pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
        }
    }
    podTemplate(containers: [
        containerTemplate(name: 'node', image: 'arm64v8/node:17-bullseye-slim', command: 'sleep', args: '99d'),
        containerTemplate(name: 'jnlp', image: 'pi4k8s/inbound-agent:4.3', command: 'sleep', args: '99d')
    ]) {
        node(POD_LABEL) {
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
}