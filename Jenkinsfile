pipeline {
    agent any

    stages {
        stage('Dependencies') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }
    }
}