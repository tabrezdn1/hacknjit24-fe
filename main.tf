# Define the variable for Vercel token
variable "vercel_token" {
  description = "The API token for Vercel authentication"
  type        = string
  sensitive   = true
}
# Generate a random ID for a unique project name suffix
resource "random_id" "project_suffix" {
  byte_length = 4
}
# Configure the Vercel provider
terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"  # Correct source for the Vercel provider
      version = "~> 1.0"         # Specify the version you want to use
    }
    random = {
      source = "hashicorp/random"
    }
  }
}
# # Configure the Vercel provider
provider "vercel" {
  api_token = var.vercel_token  # Use `api_token` as required by the provider
}

# Define the Vercel project with git_repository as an attribute
resource "vercel_project" "tabrezdn1s-projects" {
  name      = "hacknjit24-fe-${random_id.project_suffix.hex}"         # Project name on Vercel
  framework = "vite"                 # Specify the framework, e.g., 'nextjs' if using Next.js, or 'other' for custom Docker

  # GitHub repository details as a map, not a block
  git_repository = {
    type   = "github"
    repo   = "tabrezdn1/hacknjit24-fe"   # Replace with your GitHub repo name
    branch = "main"                   # Specify the branch to deploy
  }
}

