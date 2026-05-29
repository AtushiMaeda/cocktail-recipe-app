# ログ出力時に機微情報をマスクするユーティリティ
# 将来デバッグログを追加する際は必ず LogFilter.scrub(hash) を経由すること
module LogFilter
  SENSITIVE_KEYS = %w[password password_confirmation token jwt authorization].freeze
  FILTERED = "[FILTERED]"

  # ハッシュ（ネスト含む）・配列から機微情報をマスクして返す
  def self.scrub(obj)
    case obj
    when Hash
      obj.each_with_object({}) do |(k, v), acc|
        acc[k] = SENSITIVE_KEYS.include?(k.to_s.downcase) ? FILTERED : scrub(v)
      end
    when Array
      obj.map { |e| scrub(e) }
    else
      obj
    end
  end
end
