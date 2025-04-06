pipeline {
    agent any

    stages {
        stage('Dependencies') {
            steps {
                script {
                    // Install dependencies
                    sh 'npm install'
                }
            }
        }
    }
}