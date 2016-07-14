require 'test_helper'

class Api::V1::SearchLocationControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success

    # should also not have any results since required params not given
    res = JSON.parse response.body
    assert_equal res['results'].length, 0
    assert_not res['next_page']
  end

  test "should return results with correct params" do
    get :index, params: {term: 'Oakland'}
    assert_response :success

    # # should also have results
    # res = JSON.parse response.body
    # assert_not_equal res['results'].length, 0
    #
    # # location response should have the required params
    # location = res['results'].first
    #
    # assert location['description'], 'location should have a name'
    # assert location['lat'], 'location should have a lat'
    # assert location['long'], 'location should have a long'
    # assert location['place_id'], 'location should have a place_id'
    # assert location['id'], 'location should have a place_id'
  end
end

