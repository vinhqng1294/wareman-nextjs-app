def prepareEnvVars() {
  env.IMAGE_REPOSITORY="${env.CI_REGISTRY}/${env.CI_PROJECT_NAMESPACE}/${env.CI_PROJECT_NAME}"
  env.IMAGE_TAG="${env.GIT_BRANCH}_${env.GIT_COMMIT.substring(0,8)}"
  env.IMAGE_LATEST_TAG="${env.GIT_BRANCH}_latest"
  env.IMAGE_DEPS_LATEST_TAG="${env.GIT_BRANCH}_deps_latest"
  env.IMAGE_BUILDER_LATEST_TAG="${env.GIT_BRANCH}_builder_latest"
  env.IMAGE_REPOSITORY_WITH_TAG="${env.IMAGE_REPOSITORY}:${env.IMAGE_TAG}"
  env.IMAGE_REPOSITORY_WITH_LATEST_TAG="${env.IMAGE_REPOSITORY}:${env.IMAGE_LATEST_TAG}"
  env.IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG="${env.IMAGE_REPOSITORY}:${env.IMAGE_DEPS_LATEST_TAG}"
  env.IMAGE_BUILDER_REPOSITORY_WITH_LATEST_TAG="${env.IMAGE_REPOSITORY}:${env.IMAGE_BUILDER_LATEST_TAG}"
}

def prepareDeploymentEnvVars() {
  env.WEB_IMAGE_REPOSITORY="${env.IMAGE_REPOSITORY}"
  env.WEB_IMAGE_TAG="${env.IMAGE_TAG}"
}

pipeline {
  agent none

  options {
    disableConcurrentBuilds()
  }

  environment {
    CI = 'true'
    CI_REGISTRY = 'registry.gitlab.com'
    CI_PROJECT_NAMESPACE = 'wareman'
    CI_PROJECT_NAME = 'wareman-nextjs-app'
    CI_REGISTRY_CREDS = credentials('gitlab-registry-push-token')
  }
  stages {
    stage('Build') {
      agent {
        label 'jenkins-dind'
      }
      steps {
        prepareEnvVars()

        sh "docker login $CI_REGISTRY --username $CI_REGISTRY_CREDS_USR --password $CI_REGISTRY_CREDS_PSW"
        // Pull if exists & (re)build latest deps image for cached build if possible
        sh "docker pull $IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG || true"
        sh "docker build --target deps --cache-from $IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG -f Dockerfile -t $IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG ."
        // Pull if exists & (re)build latest builder image for cached build if possible
        sh "docker pull $IMAGE_BUILDER_REPOSITORY_WITH_LATEST_TAG || true"
        sh "docker build --target builder --cache-from $IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG --cache-from $IMAGE_BUILDER_REPOSITORY_WITH_LATEST_TAG -f Dockerfile -t $IMAGE_BUILDER_REPOSITORY_WITH_LATEST_TAG ."
        // Pull if exists & (re)build latest image using cached image from deps and builder
        sh "docker pull $IMAGE_REPOSITORY_WITH_LATEST_TAG || true"
        sh "docker build --target runner --cache-from $IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG --cache-from $IMAGE_BUILDER_REPOSITORY_WITH_LATEST_TAG --cache-from $IMAGE_REPOSITORY_WITH_LATEST_TAG -f Dockerfile -t $IMAGE_REPOSITORY_WITH_TAG ."
        sh "docker tag $IMAGE_REPOSITORY_WITH_TAG $IMAGE_REPOSITORY_WITH_LATEST_TAG"
        // Push images
        sh "docker push $IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG"
        sh "docker push $IMAGE_BUILDER_REPOSITORY_WITH_LATEST_TAG"
        sh "docker push $IMAGE_REPOSITORY_WITH_TAG"
        sh "docker push $IMAGE_REPOSITORY_WITH_LATEST_TAG"
        // Cleanup images
        sh "docker rmi $IMAGE_DEPS_REPOSITORY_WITH_LATEST_TAG"
        sh "docker rmi $IMAGE_BUILDER_REPOSITORY_WITH_LATEST_TAG"
        sh "docker rmi $IMAGE_REPOSITORY_WITH_TAG"
        sh "docker rmi $IMAGE_REPOSITORY_WITH_LATEST_TAG"
      }
    }

    stage('Deploy DEV') {
      when {
        expression {
          env.GIT_BRANCH == 'develop'
        }
      }
      agent {
        label 'jenkins-alpine'
      }
      environment {
        ENV = 'dev'
        NAMESPACE = 'dev'
        RANCHER_BEARER_TOKEN = credentials('rancher-admin-token')
        GIT_CREDS = credentials('gitlab-repo-pull-credentials')
        AWS_PROFILE_NAME = 'dev1star-lightsail'
        S3_BUCKET_NAME = 'dev1star'
        WEB_CHART_ENABLED = 'true'
      }
      steps {
        prepareEnvVars()
        prepareDeploymentEnvVars()

        withCredentials([file(credentialsId: 'dev1star-aws-creds', variable: 'aws_creds')]) {
          sh "cp \$aws_creds ~/.aws/credentials"
        }

        sh "git clone https://${env.GIT_CREDS_USR}:${env.GIT_CREDS_PSW}@gitlab.com/wareman/wareman-helm.git wareman_helm"
        
        dir('wareman_helm') {
            withCredentials([file(credentialsId: 'dev1star-aws-creds', variable: 'aws-creds')]) {
              script {
                sh "rancher login ${env.RANCHER_API_SERVER} --token ${env.RANCHER_BEARER_TOKEN} --context ${env.RANCHER_PROJECT_ID} --skip-verify"
                def kubeconfig = sh(script: "rancher clusters kubeconfig ${env.RKE_CLUSTER_NAME}", returnStdout: true)
                writeFile(file: 'kubeconfig', text: kubeconfig)
                sh "source init.sh && KUBECONFIG=kubeconfig ./deploy_web.sh"
              }
            }
        }
      }
    }

    stage('Deploy PROD') {
      when {
        expression {
          env.GIT_BRANCH == 'master' || env.GIT_BRANCH == 'main'
        }
      }
      agent {
        label 'jenkins-alpine'
      }
      environment {
        ENV = 'prod'
        NAMESPACE = 'prod'
        GIT_CREDS = credentials('gitlab-repo-pull-credentials')
        AWS_PROFILE_NAME = 'dev1star-lightsail'
        S3_BUCKET_NAME = 'dev1star'
        WEB_CHART_ENABLED = 'true'
      }
      steps {
        prepareEnvVars()
        prepareDeploymentEnvVars()

        withCredentials([file(credentialsId: 'dev1star-aws-creds', variable: 'aws_creds')]) {
          sh "cp \$aws_creds ~/.aws/credentials"
        }

        sh "git clone https://${env.GIT_CREDS_USR}:${env.GIT_CREDS_PSW}@gitlab.com/wareman/wareman-helm.git wareman_helm"

        dir('wareman_helm') {
            withCredentials([file(credentialsId: 'dev1star-aws-creds', variable: 'aws-creds')]) {
              sh "source init.sh && KUBECONFIG=kubeconfig ./deploy_web.sh"
            }
        }
      }
    }
  }
}
