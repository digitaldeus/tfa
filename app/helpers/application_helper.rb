module ApplicationHelper
  def google_js_key
    ENV['GOOGLE_JS_AUTOCOMPLETE']
  end
end
