require 'test_helper'

class SocialLinkTest < ActiveSupport::TestCase
  setup do
    @sl = social_links(:one)

    @social = [
      'facebook',
      'twitter',
      'instagram',
      'google_plus',
      'twitter',
      'linkedin',
      'yelp'
    ]
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
  
  test "should return false if no social set" do
    sl = SocialLink.new

    assert_not sl.has_social
  end

  test "should return true if any social links are set" do
    for link in @social do
      sl = SocialLink.new
      sl[link] = "http://testing"
      assert sl.has_social, "Had social link for #{link} but has_social return false"
    end
  end

  test "social links should be valid with proper url" do
    for link in @social do
      sl = SocialLink.new
      urlpiece = link

      if link == "google_plus" then
        urlpiece = "plus.google"
      end

      url = "http://#{urlpiece}.com/test"
      sl[link] = url
      assert sl.valid?, "#{url} wasn't valid and should have been"

      url = "https://#{urlpiece}.com/test"
      sl[link] = url
      assert sl.valid?, "#{url} wasn't valid and should have been"

      url = "https://#{urlpiece}.com/test"
      sl[link] = url
      assert sl.valid?, "#{url} wasn't valid and should have been"

      url = "#{urlpiece}.com/test"
      sl[link] = url
      assert sl.valid?, "#{url} wasn't valid and should have been"

      unless link == "google_plus"
        url = "www.#{urlpiece}.com/test"
        sl[link] = url
        assert sl.valid?, "#{url} wasn't valid and should have been"

        url = "http://www.#{urlpiece}.com/test"
        sl[link] = url
        assert sl.valid?, "#{url} wasn't valid and should have been"

        url = "https://www.#{urlpiece}.com/test"
        sl[link] = url
        assert sl.valid?, "#{url} wasn't valid and should have been"
      end
    end
  end

  test "social links should be invalid without proper url" do
    for link in @social do
      sl = SocialLink.new
      sl[link] = "yadadadadadada"
      assert_not sl.valid?, "#{link} doesn't validate url properly for social links"
    end
  end

end
