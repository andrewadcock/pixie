resource "google_cloudbuild_trigger" "react-trigger" {
  //Source section
  trigger_template {
    branch_name = "main"
    repo_name   = "pixie"
  }

  ignored_files = [".gitignore"]
//Configuration section
 // build config file
 filename = "./cloudbuild.yaml"
 // build config inline yaml
 #build {
 #    step {
 #    name       = "node" 
 #    entrypoint = "npm"
 #    args       = ["install"]
 #    }
 #    step{...}
 #    ...
 #  }
  //Advanced section
#   substitutions = {
#     <key1>= "<value1>"
#     <key2> = "<value2>"
#   }
}