require 'test_helper'

class Api::V1::SearchControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success

    # should also not have any results since required params not given
    res = JSON.parse response.body
    assert_equal res['results'].length, 0
    assert_not res['next_page']
  end

  test "should return results with correct params" do
    get :index, term: 'baptist', lat: 37.804370880127, long: -122.27079772949
    assert_response :success

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
end

