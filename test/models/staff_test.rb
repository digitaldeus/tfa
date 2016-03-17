require 'test_helper'

class StaffTest < ActiveSupport::TestCase
  setup do
    @staff = staffs(:one) 
  end

  test "should not save staff without a name" do
    @staff.name = nil
    assert_not @staff.save
  end

  test "should have social links method" do
    assert_respond_to @staff, :social_link
  end
end
