require 'active_record'

class Purchase < ActiveRecord::Base
  def tshirt
    Tshirt.find_by({id: self.tshirt_id})
  end
end
