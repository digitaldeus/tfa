require 'test_helper'

class EstablishmentTest < ActiveSupport::TestCase
  setup do
    @establishment = establishments(:one)
  end
  
  test 'should not save establishment without name' do
    @establishment.name = nil
    assert_not @establishment.save, 'Saved the establishment without a name'
  end
end
