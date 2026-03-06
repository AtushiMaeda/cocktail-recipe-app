terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # terraform init 時に -backend-config で渡す
    # bucket = "your-terraform-state-bucket"
    # key    = "cocktail-app/terraform.tfstate"
    # region = "ap-northeast-1"
  }
}

provider "aws" {
  region = var.aws_region
}

# ACM (CloudFront用) は us-east-1 が必須
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

locals {
  name_prefix = var.app_name
  tags = {
    Project     = var.app_name
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
