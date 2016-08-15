require 'test_helper'

class Api::V1::SearchControllerTest < ActionController::TestCase
  test_lat = 37.804370880127
  test_long = -122.27079772949

  test "should return results without" do
    get :index, lat: test_lat, long: test_long
    assert_response :success
  end

  test "should return results with correct params" do
    get :index, term: 'baptist', lat: test_lat, long: test_long
    assert_response :success

    # TODO: validate all response params
    # # should also have results
    # res = JSON.parse response.body
    # assert_not_equal res['results'].length, 0
    # assert res['next_page']
    #
    # # church response should have the required params
    # church = res['results'].first
    #
    # assert church['name'], 'church should have a name'
    # assert church['lat'], 'church should have a lat'
    # assert church['long'], 'church should have a long'
    # assert church['address'], 'church should have a address'
    # assert church['place_id'], 'church should have a place_id'
    # assert church['distance'], 'church should have a distance'
  end

  test "should set offset to 0 when unset" do
    get :index, term: 'baptist', lat: test_lat, long: test_long
    res = JSON.parse response.body
    assert_equal res['offset'], 0
  end

  test "should set offset to passed in value when set" do
    get :index, term: 'baptist', lat: test_lat, long: test_long, offset: 1
    res = JSON.parse response.body
    assert_equal res['offset'].to_i, 1
  end
end

