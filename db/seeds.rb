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

chim = Hike.create(title: 'Chimney Gulch', city: 'Golden', state: 'Colorado', difficulty:3, length:3, pet_friendly: true, directions: 'Access the trail via Lookout Mountain Road west of Highway 6 and roadside parking on Highway 6 eastbound from State Highway 58.', extra_info: 'The Front Range of Colorado touches three distinct ecosystems – grassland prairie, pinyon-ponderosa woodlands and montane – that support a rich variety of mammals, birds, amphibians and reptiles. Rabbit, hare, prairie dog, fox, coyote, badger, bobcat, mule deer, elk, black bear and mountain lion all call the Front Range their home.', user_id: admin.id)

HikePhoto.create(hike_id: chim.id, img_url: 'https://www.cityofgolden.net/wp-content/uploads/Chimney-Gulch.jpg', caption: 'Trail marker')
HikePhoto.create(hike_id: chim.id, img_url: 'http://3.bp.blogspot.com/-gFiX9wnY2RM/U3GWft3W5pI/AAAAAAAAFnk/9vkQUOSK3Jc/s1600/dsc05462-001.jpg', caption: 'View of Windy Saddle Park from the trail')

flvistas = Hike.create(user_id: admin.id, title: 'Flatirons Vista', city: 'Boulder', state: 'Colorado', difficulty: 1, length: 4, pet_friendly: true, directions: 'Need to edit later', extra_info: 'While the most iconic views of the Flatirons are from the Chautauqua Trailhead, this trail south of town stands at a distance to the iconic formations, giving you unparalleled views of the whole mountain range. Equally great for trail runners and families, the open landscape of this trail (bring plenty of sunscreen) gives you a sense of scale and geography you won’t get on trails that lead directly into the foothills. Plus, for those who want a longer trek, plenty of connecting trails make it possible')
HikePhoto.create(hike_id: flvistas.id, img_url: 'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_250,q_75,w_610/http://res.cloudinary.com/simpleview/image/upload/v1501535559/clients/boulder/6a133392_e220_4b17_a5a7_7b496e2d5c97_252618d3-1fa3-44a3-89ed-eb78e6802b31.jpg', caption: 'View at sunset')



 jfalls = Hike.create(user_id: admin.id, title: 'Judd Falls', city: 'Crested Butte', state: 'Colorado', difficulty: 1, length: 2, pet_friendly: false, directions: 'From Crested Butte, take Gothic Road (135) north past Mt. Crested Butte and the hamlet of Gothic. Just over the hill from Gothic is the parking lot and trailhead for Judd Falls/Copper Creek. You can begin walking from the parking lot up the dirt road, or high clearance vehicles can continue up the same road for another half mile to an upper parking lot. ', extra_info: 'Much of the trail crosses the property of the Rocky Mountain Biological Laboratory, which has posted some interpretive signs along the way. The beginning of the trail is rocky but overall is easy. Highly scenic views of Crested Butte and Gothic Mountain. The Copper Creek trail continues past the falls, and leads to the Maroon Bells-Snowmass. Wilderness Area where scenic trails connect to high mountain lakes, remote hot springs, and the Aspen area.')

 HikePhoto.create(hike_id: jfalls.id, img_url: 'https://i2.wp.com/crazyaboutcolorado.com/wp-content/uploads/2019/09/Untitled-design-8-copy-23.png?resize=940%2C788', caption: 'Sign at the trail head')

 HikePhoto.create(hike_id: jfalls.id, img_url: 'https://i2.wp.com/crazyaboutcolorado.com/wp-content/uploads/2019/09/Untitled-design-8-copy-21.png?resize=940%2C788', caption: 'Judd Falls')

 HikePhoto.create(hike_id: jfalls.id, img_url: 'https://cdn-assets.alltrails.com/uploads/photo/image/23953195/large_2a18873769ce6f9d128aa8260a18e425.jpg', caption: 'View on the trail')

 copper_creek = Hike.create(user_id: admin.id, title: 'Copper Creek Trail', city: 'Crested Butte', state: 'Colorado', difficulty: 3, length: 12, pet_friendly: false, directions: 'From Crested Butte, take Gothic Road (135) north past Mt. Crested Butte and the hamlet of Gothic. Just over the hill from Gothic is the parking lot and trailhead for Judd Falls/Copper Creek. You can begin walking from the parking lot up the dirt road, or high clearance vehicles can continue up the same road for another half mile to an upper parking lot.', extra_info: 'The Copper Creek Trail to Copper Lake is a 12 mile moderately trafficked out and back trail located near Crested Butte, Colorado that features a waterfall and is rated as moderate. This hike starts at the Judd Falls trailhead at Gothic Rd. It is a pretty forest hike that opens up in spots along Copper Creek to Copper Lake. The elevation gains are mild until the last few hundred yards. This route is closed to hiking during the winter months due to snow.')

 HikePhoto.create(hike_id: copper_creek.id, img_url: 'http://www.protrails.com/protrails/trails/Copper%20Lake%20-%20lake%20on%20descent%201.jpg', caption: 'Copper Lake')

 HikePhoto.create(hike_id: copper_creek.id, img_url: 'https://media-cdn.tripadvisor.com/media/photo-s/18/5f/21/d7/awesome-views.jpg', caption: 'Crested Butte from the trail')

 gal = Hike.create(user_id: admin.id, title: 'Mt. Galbraith', city: 'Golden', state: 'Colorado', difficulty: 3, length: 4, pet_friendly: true, directions: 'Take I-93 through Golden and turn onto Golden Gate Canyon Road. about two miles down the road on the left there is a well maintained gravel parking lot which marks the start of the trail.', extra_info: 'This beautiful hike follows the Cedar Gulch Trail and encircles Mount Galbraith with great views of Golden, Coors Plant and Denver. If you want to reach the peak, the elevation is just over 7200 feet. You will see interesting rock formations and lots of animal trails along the way. It can be narrow in places which makes passing difficult. Bikes are not allowed, this is a hiker-only trail.')
 HikePhoto.create(hike_id: gal.id, img_url: 'https://cdn-assets.alltrails.com/uploads/photo/image/40931992/extra_large_98800f3b887c3746fb3903169af5feb6.jpg', caption: 'the Rockies')
 HikePhoto.create(hike_id: gal.id, img_url: 'https://cdn-assets.alltrails.com/uploads/photo/image/40891986/extra_large_9efbe05be86e9e7fb92cb5112a9ef74a.jpg', caption: 'View from the peak of the trail')
 HikePhoto.create(hike_id: gal.id, img_url: 'https://cdn-assets.alltrails.com/uploads/photo/image/40854315/extra_large_f9512c3ad79253c29b4e504520c91714.jpg', caption: 'the beginning of the trail')

 chavez= Hike.create(user_id: admin.id, title: 'Chavez and Beaver Brook Trail Loop', city: 'Golden', state: 'Colorado', difficulty: 4, length: 5, pet_friendly: true, directions: 'Genesee Park is 20 miles west of Denver on I-70 to Exit 254 (Genesee Park Exit) or Exit 253 (Chief Hosa Exit). To get here, you’ll take the Chief Hosa Exit (Exit 253) and park in the parking lot on Stapleton Road to begin along the Beaver Brook Trail. There is an additional, smaller parking area just past the main lot where the Chavez Trail meets the road. From here, you can also choose to take the Braille Trail for a short stretch instead of the Chavez Trail.', extra_info: 'The route features a nice mix of elevation change and will have you walking alongside a creek for more than half of the loop. There are several stream crossings that have bridges to walk across. This shaded loop is especially great during summertime, as you can stop to take a swim along the way. During the fall, the leaves change into their gorgeous autumn colors. The left side of the loop is much gentler and wider, whereas the right route (the Chavez Trail) is steeper with a few ledges to maneuver and is steep and rocky.')

 HikePhoto.create(hike_id: chavez.id, img_url: 'https://cdn-assets.alltrails.com/uploads/photo/image/29605732/extra_large_3d6ce3c1064141503013c5b41d9a1e88.jpg', caption: 'View from the trail')

 HikePhoto.create(hike_id: chavez.id, img_url: 'https://www.10adventures.com/wp-content/uploads/2018/10/Denver_01-BeaverBrook_13_UpRiverView.jpg', caption: 'Beaver Brook')

# XXXX = Hike.create(user_id: admin.id, title: '', city: '', state: '', difficulty: , length: , pet_friendly: , directions: '', extra_info: '')

# XXXX =HikePhoto.create(hike_id: , img_url: '', caption: '')

puts('done seeding, happy trails!')