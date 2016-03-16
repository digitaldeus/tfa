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

  test "Should have a yelp_id method" do
    assert_respond_to @sl, :yelp_id
  end

  test "Should be able to get yelp id from valid url" do
    yelp_id = "test-id"
    @sl.yelp = "http://yelp.com/test-id"
    
    assert_equal @sl.yelp_id, yelp_id
  end

  test "yelp_id should return falsey value if not a valid url" do
    @sl.yelp = "Invalid Url String"
    assert_not @sl.yelp_id
  end
end
