CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => ENV['AWS_ACCESS_KEY_ID'] || 'AWS_ACCESS_KEY_ID',
    :aws_secret_access_key  => ENV['AWS_SECRET_ACCESS_KEY'] || 'AWS_SECRET_ACCESS_KEY',
    :region                 => ENV['AWS_REGION'] || 'AWS_REGION',
    :path_style             => true
  }
  config.fog_directory      = ENV['S3_BUCKET'] || 'S3_BUCKET'
end
