terraform {
  required_version = ">= 1.5.0"

  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

provider "local" {}

resource "local_file" "welcome" {
  filename = "terraform-demo.txt"

  content = <<EOF
Welcome to Terraform!

This file was created by Terraform.
EOF
}