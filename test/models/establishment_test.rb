require 'test_helper'

class EstablishmentTest < ActiveSupport::TestCase
  setup do
    @establishment = establishments(:one)
  end
  
  test 'should not save establishment without name' do
    @establishment.name = nil
    assert_not @establishment.save, 'Saved the establishment without a name'
  end

  test "should have social links method" do
    assert_respond_to @establishment, :social_link
  end

  test "should have profile image method" do
    assert_respond_to @establishment, :profile_image
  end

  test "should have banner image method" do
    assert_respond_to @establishment, :banner_image
  end
end
