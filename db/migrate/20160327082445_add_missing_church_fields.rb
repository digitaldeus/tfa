class AddMissingChurchFields < ActiveRecord::Migration
  def change
    change_table :establishments do |t|
      t.string :email
      t.string :admin_email
      t.string :phone
      t.string :admin_phone
    end
  end
end
