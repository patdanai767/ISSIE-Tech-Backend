pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            agent {
                docker { image 'node:20-alpine' }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    rm -rf package-lock.json
                    mkdir -p ~/.npm
                    npm config set cache ~/.npm
                    npm install --unsafe-perm
                    ls -la
                '''
            }
        }
    }
}