provider "vercel" {
  token = var.vercel_token
}

resource "vercel_project" "my_docker_app" {
  name = "my-docker-app"
  framework = "other"  # Specify the framework if applicable
  git_repository {
    type = "github"
    repo = "tabrezdn1/hacknjit24-fe"  # Replace with your GitHub repo
    branch = "main"
  }
}

resource "vercel_deployment" "my_docker_app_deployment" {
  project_id = vercel_project.my_docker_app.id
  name       = "my-docker-app-deployment"
  alias      = ["my-docker-app.vercel.app"]  # Replace with your desired alias

  build {
    docker {
      image = "your-docker-image"  # Replace with your Docker image
    }
  }
}
