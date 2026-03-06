variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "domain_name" {
  description = "Root domain name (e.g. cocktail-app.com)"
  type        = string
}

variable "app_name" {
  description = "Application name prefix"
  type        = string
  default     = "cocktail"
}

variable "db_username" {
  description = "RDS master username"
  type        = string
  default     = "cocktail"
}

variable "db_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "rails_master_key" {
  description = "Rails MASTER_KEY (content of config/master.key)"
  type        = string
  sensitive   = true
}
