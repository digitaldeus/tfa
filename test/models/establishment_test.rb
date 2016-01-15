require 'test_helper'

class EstablishmentTest < ActiveSupport::TestCase
  test 'should not save establishment without name' do
    e = Establishment.new
    assert_not e.save, 'Saved the establishment without a title'
  end
end
