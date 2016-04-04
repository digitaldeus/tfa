class UpdateServiceTimeFields < ActiveRecord::Migration
  def change
    change_column_null :service_times, :name, true

    change_table :service_times do |t|
      t.rename :name, :service_name
      t.string :day, null: false
    end
  end
end
