terraform {
  backend "gcs" {
    bucket  = var.bucket
    prefix  = "state"
  }  
  required_version = ">= 0.12.7"  
  required_providers { 
    google = {
      source = "hashicorp/google"
      version = "3.82.0"
    }
  }
}
provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}
