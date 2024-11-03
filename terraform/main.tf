# Define the variable for Vercel token
variable "vercel_token" {
  description = "The API token for Vercel authentication"
  type        = string
  sensitive   = true
}

# Configure the Vercel provider
provider "vercel" {
  token = var.vercel_token  # Use the variable instead of a hardcoded token
}

# Define the Vercel project
resource "vercel_project" "my_docker_app" {
  name      = "njithack24-fe"         # Project name on Vercel
  framework = "other"                 # Specify the framework, e.g., 'nextjs' if using Next.js, or 'other' for custom Docker

  # GitHub repository details for Vercel integration
  git_repository {
    type  = "github"
    repo  = "tabrezdn1/njithack24-fe"   # Replace with your GitHub repo name
    branch = "main"                   # Specify the branch to deploy
  }
}

# Define the Vercel deployment resource to deploy the Docker container
resource "vercel_deployment" "my_docker_app_deployment" {
  project_id = vercel_project.my_docker_app.id
  name       = "my-docker-app-deployment"
  alias      = ["my-docker-app.vercel.app"]  # Replace with your desired alias for the app

  # Specify Docker build details
  build {
    docker {
      image = "tabrezdn1/njithack24-fe:latest"  # Replace with your Docker image name
    }
  }
}
