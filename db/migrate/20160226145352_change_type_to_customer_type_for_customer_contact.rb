class ChangeTypeToCustomerTypeForCustomerContact < ActiveRecord::Migration
  def change
    rename_column :customer_contacts, :type, :purpose
  end
end
