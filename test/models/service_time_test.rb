require 'test_helper'

class ServiceTimeTest < ActiveSupport::TestCase
  setup do
    @service_time = service_times(:one)
  end

  test "should respond to fields" do
    assert_respond_to @service_time, :service_name
    assert_respond_to @service_time, :start_time
    assert_respond_to @service_time, :day
    assert_respond_to @service_time, :establishment
  end

  test "service_name should not be mandatory" do
    @service_time.service_name = nil

    assert_not @service_time.save
  end

  test "start_time should be mandatory" do
    @service_time.start_time = nil
    assert_not @service_time.save
  end

  test "day should be mandatory" do
    @service_time.day = nil
    assert_not @service_time.save
  end

  test "establishment should be mandatory" do
    @service_time.establishment = nil
    assert_not @service_time.save
  end
end
