class CreateServiceTimes < ActiveRecord::Migration
  def change
    create_table :service_times do |t|
      t.string :name, null: false
      t.string :time, null: false
      t.references :establishment, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
