# resource "google_cloudbuild_trigger" "react-trigger" {
#   //Source section
#   trigger_template {
#     branch_name = "main"
#     repo_name   = "pixie"
#   }

#   ignored_files = [".gitignore"]
# //Configuration section
#  // build config file
#  filename = "./cloudbuild.yaml"
#  // build config inline yaml
#  build {
#     step {
#         name       = "node" 
#         entrypoint = "npm"
#         args       = ["install"]
#     }
#     step {
#         name        = "node"
#         entrypoint  = "npm"
#         args        = ["run"] 
#     }
#   }
#   //Advanced section
# #   substitutions = {
# #     <key1>= "<value1>"
# #     <key2> = "<value2>"
# #   }
# }

# resource "google_artifact_registry_repository" "pixie-438313" {
#   location      = "us-central1"
#   repository_id = "pixie-frontend"
#   description   = "frontend docker image"
#   format        = "DOCKER"

#   docker_config {
#     immutable_tags = true
#   }
# }

# resource "google_artifact_registry_repository" "pixie-438313" {
#   location      = "us-central1"
#   repository_id = "pixie-backend"
#   description   = "backend docker image"
#   format        = "DOCKER"

#   docker_config {
#     immutable_tags = true
#   }
# }