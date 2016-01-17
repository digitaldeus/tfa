require 'test_helper'

class EstablishmentTest < ActiveSupport::TestCase
  setup do
    @establishment = establishments(:one)
  end
  
  test 'should not save establishment without name' do
    @establishment.name = nil
    assert_not @establishment.save, 'Saved the establishment without a name'
  end
  
  test 'should not save establishment without yelp_id' do
    @establishment.yelp_id = nil
    assert_not @establishment.save, 'Saved the establishment without a yelp_id'
  end
  
  test 'should not save establishment with same yelp_id' do
    newe = establishments(:two)
    newe.yelp_id = @establishment.yelp_id
    assert_not newe.save, 'Saved the establishment with a duplicate yelp_id'
  end
end
