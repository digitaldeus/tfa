class CreateCustomerContacts < ActiveRecord::Migration
  def change
    create_table :customer_contacts do |t|
      t.string :type, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.text :details
      t.string :email, null: false
      t.string :phone

      t.timestamps null: false
    end
  end
end
