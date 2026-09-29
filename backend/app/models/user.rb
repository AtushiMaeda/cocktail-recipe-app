class User < ActiveRecord::Base
  has_many :cocktails, dependent: :destroy

  validates :email,    presence: true, uniqueness: { case_sensitive: false }
  validates :name,     presence: true
  validates :password, presence: true, length: { minimum: 8 }, if: :password_required?
  validate :password_complexity, if: :password_required?

  # バーチャル属性（DBには保存しない）
  attr_accessor :password

  before_save :encrypt_password, if: :password_required?
  before_create { self.jti = SecureRandom.uuid }

  # パスワードが正しいか確認する
  def valid_password?(plain_password)
    BCrypt::Password.new(encrypted_password) == plain_password
  end

  # サインアウト時にJTIを更新してトークンを無効化する
  def invalidate_jwt!
    update!(jti: SecureRandom.uuid)
  end

  private

  def password_complexity
    return if password.blank?

    unless password.match?(/[A-Za-z]/) && password.match?(/\d/)
      errors.add(:password, "must include at least one letter and one number")
    end
  end

  def encrypt_password
    self.encrypted_password = BCrypt::Password.create(password)
  end

  def password_required?
    encrypted_password.blank? || password.present?
  end
end
