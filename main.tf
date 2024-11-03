# Define the variable for Vercel token
variable "vercel_token" {
  description = "The API token for Vercel authentication"
  type        = string
  sensitive   = true
}
# Configure the Vercel provider
terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"  # Correct source for the Vercel provider
      version = "~> 1.0"         # Specify the version you want to use
    }
  }
}
# # Configure the Vercel provider
provider "vercel" {
  api_token = "kMtMcvxFVpxCHrfFRT3bG7pc"  # Use `api_token` as required by the provider
}

# Define the Vercel project with git_repository as an attribute
resource "vercel_project" "tabrezdn1s-projects" {
  name      = "njithack24-fe"         # Project name on Vercel
  framework = "create-react-app"                 # Specify the framework, e.g., 'nextjs' if using Next.js, or 'other' for custom Docker

  # GitHub repository details as a map, not a block
  git_repository = {
    type   = "github"
    repo   = "tabrezdn1/njithack24-fe"   # Replace with your GitHub repo name
    branch = "main"                   # Specify the branch to deploy
  }
}

