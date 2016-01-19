require 'test_helper'

class StaffTest < ActiveSupport::TestCase
  test "should not save staff without a name" do
    staff = Staff.new
    assert_not staff.save
  end
end
