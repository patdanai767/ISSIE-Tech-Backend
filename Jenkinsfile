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
                    npm install
                    ls -la
                '''
            }
        }
    }
}