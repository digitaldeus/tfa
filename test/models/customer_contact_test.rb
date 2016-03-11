require 'test_helper'

class CustomerContactTest < ActiveSupport::TestCase
  setup do
    @cc = customer_contacts(:one)
  end

  test "should not save customer contact without first_name" do
    @cc.first_name = nil
    assert_not @cc.save, "saved customer contact without first_name"
  end

  test "should not save customer contact without last_name" do
    @cc.last_name = nil
    assert_not @cc.save, "saved customer contact without last_name"
  end

  test "should not save customer contact without email" do
    @cc.email = nil
    assert_not @cc.save, "saved customer contact without email"
  end

  test "should not save customer contact without purpose" do
    @cc.purpose = nil
    assert_not @cc.save, "saved customer contact without purpose"
  end
end
