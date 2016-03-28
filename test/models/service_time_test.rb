require 'test_helper'

class ServiceTimeTest < ActiveSupport::TestCase
  setup do
    @service_time = service_times(:one)
  end

  test "should respond to fields" do
    assert_respond_to @service_time, :name, "Doesn't have a name field"
    assert_respond_to @service_time, :time, "Doesn't have a time field"
    assert_respond_to @service_time, :establishment, "Doesn't have an establishment field"
  end

  test "name should be mandatory" do
    @service_time.name = nil

    assert_not @service_time.save
  end

  test "time should be mandatory" do
    @service_time.time = nil
    assert_not @service_time.save
  end

  test "establishment should be mandatory" do
    @service_time.establishment = nil
    assert_not @service_time.save
  end
end
