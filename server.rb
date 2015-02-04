require 'pry'
require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'sqlite3'
require 'bcrypt'
require_relative './lib/connection'
require_relative './lib/tshirts'
require_relative './lib/purchases'

use Rack::Session::Pool, :cookie_only => false

# secret_password = ''
# json = ''
# File.open('secret.json', 'r') do |f|
#   f.each_line do |line|
#     json << line
#   end
# end
# json_hash = JSON.parse(json)
# secret_password = json_hash['password']

def authenticated?
  session[:valid_user] == true
end

db = SQLite3::Database.new "tshirtstore.db"

after do
  ActiveRecord::Base.connection.close
end

put '/admin' do
  thisshirt = Tshirt.find_by({id: params["id"].to_i})

  thisshirt.quantity = params["quantity"]
  thisshirt.save

  redirect '/admin'
end

get '/' do
  table = db.execute("SELECT * FROM admin")
    if (table.length == 0)
      erb :setPassword, locals:{msg: "Welcome Admin, please set a password"}
    else
      erb :index, locals: {tshirts: Tshirt.all() }
    end
end

post '/setPassword' do
  if (params["password"] == params["confirmPassword"])
    my_password = BCrypt::Password.create(params["password"])
    db.execute("INSERT INTO admin (pword) VALUES (?)", my_password)
    session[:valid_user] = true
    redirect '/admin'
  else
    redirect '/'
    erb :setPassword, locals:{msg: "Passwords do not match. Try again"}
  end
end


post '/' do
  purchaseObj = {
    name: params["name"],
    email: params["email"],
    tshirt_id: params["tshirt_id"].to_i,
    quantity: params["quantity"].to_i
  }
  Purchase.create(purchaseObj)
  thisshirt = Tshirt.find_by({id: params["tshirt_id"].to_i})
  thisshirt.quantity = thisshirt.quantity - params["quantity"].to_i
  thisshirt.save
  erb :index, locals: {tshirts: Tshirt.all()}
  redirect '/'
end

get '/admin' do
  if authenticated?
    erb :admin, locals: {tshirts: Tshirt.all(), purchases: Purchase.all() }
  else
    redirect '/'
  end
end

get '/analytics' do
  if authenticated?
    erb :analytics, locals: {tshirts: Tshirt.all(), purchases: Purchase.all() }
  else
    redirect '/'
  end
end

post '/session' do
  admin_creds = db.execute("SELECT * FROM admin")
  # binding.pry
  if BCrypt::Password.new(admin_creds[0][1]) == params["password"]
    session[:valid_user] = true
    redirect '/admin'
  else
    redirect '/'
  end
end




# post '/admin' do
#   artist = {
#     name: params["name"],
#     price: 10,
#     quantity: ,
#     img_url:
#   };
#   Tshirt.create(tshirt)
#   erb :"artists/index", locals: {tshirt: Tshirt.all() }
# end

# put '/admin/:id' do
#   t_hash = {
#     quantity: params["quantity"]
#   }
#
#   tshirt = Tshirt.find_by({id: params[:id]})
#   tshirt.update(t_hash)
#
#   erb :admin, locals: {tshirts: tshirt}
#
# end


#

#
# get '/admin' do
#   artist = Artist.find_by({id: params[:id]})
#   erb :"artists/show", locals: {artist: artist}
# end
