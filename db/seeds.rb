# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

HikePhoto.destroy_all
HikeList.destroy_all
Hike.destroy_all
User.destroy_all

admin = User.create(name: 'Admin', username: 'Admin', password_digest:'123')

chim = Hike.create(title: 'Chimmney Gultch', city: 'Golden', state: 'Colorado', difficulty:3, length:3, pet_friendly: true, directions: 'Access the trail via Lookout Mountain Road west of Highway 6 and roadside parking on Highway 6 eastbound from State Highway 58.', extra_info: 'The Front Range of Colorado touches three distinct ecosystems – grassland prairie, pinyon-ponderosa woodlands and montane – that support a rich variety of mammals, birds, amphibians and reptiles. Rabbit, hare, prairie dog, fox, coyote, badger, bobcat, mule deer, elk, black bear and mountain lion all call the Front Range their home.', user_id: admin.id)

HikePhoto.create(hike_id: chim.id, img_url: 'https://www.cityofgolden.net/wp-content/uploads/Chimney-Gulch.jpg', caption: 'Trail marker')
HikePhoto.create(hike_id: chim.id, img_url: 'http://3.bp.blogspot.com/-gFiX9wnY2RM/U3GWft3W5pI/AAAAAAAAFnk/9vkQUOSK3Jc/s1600/dsc05462-001.jpg', caption: 'View of Windy Saddle Park from the trail')

flvistas = Hike.create(user_id: admin.id, title: 'Flatirons Vista', city: 'Boulder', state: 'Colorado', difficulty: 1, length: 4, pet_friendly: true, directions: 'Need to edit later', extra_info: 'While the most iconic views of the Flatirons are from the Chautauqua Trailhead, this trail south of town stands at a distance to the iconic formations, giving you unparalleled views of the whole mountain range. Equally great for trail runners and families, the open landscape of this trail (bring plenty of sunscreen) gives you a sense of scale and geography you won’t get on trails that lead directly into the foothills. Plus, for those who want a longer trek, plenty of connecting trails make it possible')
HikePhoto.create(hike_id: flvistas.id, img_url: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_250,q_75,w_610/http://res.cloudinary.com/simpleview/image/upload/v1501535559/clients/boulder/6a133392_e220_4b17_a5a7_7b496e2d5c97_252618d3-1fa3-44a3-89ed-eb78e6802b31.jpg', caption: 'View at sunset')
 puts('done seeding!')

# XXXX = Hike.create(user_id: admin.id, title: '', city: '', state: '', difficulty: , length: , pet_firendly: , directions: '', extra_info: '')

# XXXX =HikePhoto.create(hike_id: , img_url: '', caption: '')