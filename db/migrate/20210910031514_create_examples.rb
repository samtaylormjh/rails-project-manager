class CreateExamples < ActiveRecord::Migration[6.1]
  def change
    create_table :examples do |t|
      t.string :index

      t.timestamps
    end
  end
end
