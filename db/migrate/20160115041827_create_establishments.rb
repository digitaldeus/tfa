class CreateEstablishments < ActiveRecord::Migration
  def change
    create_table :establishments do |t|
      t.string :name
      t.text :description

      t.timestamps null: false
    end
  end
end
