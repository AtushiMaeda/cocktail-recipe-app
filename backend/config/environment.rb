require "bundler/setup"

# development/test環境では.envファイルを読み込む
if %w[development test].include?(ENV.fetch("RACK_ENV", "development"))
  require "dotenv"
  Dotenv.load(File.expand_path("../.env", __dir__))
end

require "sinatra/base"
require "sinatra/activerecord"  # rake db:migrate 等のタスクを提供し、DB接続も管理する
require "bcrypt"
require "jwt"
require "json"
require "rack/cors"

# Shrine (画像アップロード)
require "shrine"
require "shrine/storage/file_system"

if ENV["S3_BUCKET_NAME"].to_s != ""
  require "aws-sdk-s3"
  require "shrine/storage/s3"

  s3_opts = {
    bucket: ENV["S3_BUCKET_NAME"],
    region: ENV.fetch("AWS_REGION", "ap-northeast-1")
  }
  Shrine.storages = {
    cache: Shrine::Storage::S3.new(prefix: "cache", **s3_opts),
    store: Shrine::Storage::S3.new(**s3_opts)
  }
else
  # ローカル開発用（public/uploadsに保存）
  uploads_dir = File.expand_path("../public", __dir__)
  FileUtils.mkdir_p("#{uploads_dir}/uploads/cache")
  FileUtils.mkdir_p("#{uploads_dir}/uploads")
  Shrine.storages = {
    cache: Shrine::Storage::FileSystem.new(uploads_dir, prefix: "uploads/cache"),
    store: Shrine::Storage::FileSystem.new(uploads_dir, prefix: "uploads")
  }
end

Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data
Shrine.plugin :restore_cached_data

# ヘルパー・モデル・シリアライザー・アップローダー・ルートの読み込み
base = File.expand_path("..", __dir__)
require "#{base}/app/uploaders/image_uploader"
require "#{base}/app/models/user"
require "#{base}/app/models/cocktail"
require "#{base}/app/serializers/cocktail_serializer"
require "#{base}/app/helpers/auth_helper"
require "#{base}/app/helpers/pagination_helper"
require "#{base}/app/routes/auth_routes"
require "#{base}/app/routes/cocktail_routes"
