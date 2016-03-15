require 'test_helper'

class SocialLinkTest < ActiveSupport::TestCase
  setup do
    @sl = social_links(:one)
  end

  test "Should respond to all social links" do
    assert_respond_to @sl, :facebook
    assert_respond_to @sl, :youtube
    assert_respond_to @sl, :instagram
    assert_respond_to @sl, :google_plus
    assert_respond_to @sl, :twitter
    assert_respond_to @sl, :linkedin
    assert_respond_to @sl, :yelp
  end
end
