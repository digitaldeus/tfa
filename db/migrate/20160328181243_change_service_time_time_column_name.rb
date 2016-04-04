class ChangeServiceTimeTimeColumnName < ActiveRecord::Migration
  def change
    rename_column :service_times, :time, :start_time
  end
end
