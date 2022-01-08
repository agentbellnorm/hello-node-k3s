/**
 * This pipeline describes a multi container job, running Maven and Golang builds
 */

podTemplate(yaml: '''
              apiVersion: v1
              kind: Pod
              spec:
                securityContext:
                  runAsUser: 1000 # default UID of jenkins user in agent image
                containers:
                - name: node
                  image: arm64v8/node:17-bullseye
                  command:
                  - sleep
                  args:
                  - 99d
'''
  ) {

  node(POD_LABEL) {
    stage('Build a Maven project') {
      container('node') {
        sh '''
        echo -n hej!
        node -v
        '''
      }
    }
  }
}