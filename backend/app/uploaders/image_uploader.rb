class ImageUploader < Shrine
  ALLOWED_TYPES = %w[image/jpeg image/png image/webp image/gif].freeze
  MAX_SIZE      = 10 * 1024 * 1024  # 10MB

  plugin :validation_helpers

  Attacher.validate do
    validate_mime_type ImageUploader::ALLOWED_TYPES
    validate_max_size ImageUploader::MAX_SIZE
  end
end
