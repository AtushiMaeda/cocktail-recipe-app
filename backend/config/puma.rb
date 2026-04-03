threads_count = ENV.fetch("PUMA_THREADS", 3).to_i
threads threads_count, threads_count

port ENV.fetch("PORT", 3000)

environment ENV.fetch("RACK_ENV", "development")
