const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '622b7cd9a8fa1bf00d7af7be',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dignissimos delectus eos quaerat aut, odit animi dolores nesciunt? Alias aut excepturi quod ipsa sed porro voluptate aliquam labore recusandae sapiente.Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dignissimos delectus eos quaerat aut, odit animi dolores nesciunt? Alias aut excepturi quod ipsa sed porro voluptate aliquam labore recusandae sapiente.',
			price,
			geometry: {
				type: 'Point',
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
			},
			images: [
				{
					url: 'https://res.cloudinary.com/dcuaa601z/image/upload/v1647062904/YelpCamp/v4rjmv0jicxgjuhhvu1b.jpg',
					filename: 'YelpCamp/v4rjmv0jicxgjuhhvu1b',
				},
				{
					url: 'https://res.cloudinary.com/dcuaa601z/image/upload/v1647065629/YelpCamp/vhiidbkrq7p9z11lzcod.jpg',
					filename: 'YelpCamp/vhiidbkrq7p9z11lzcod',
				},
				{
					url: 'https://res.cloudinary.com/dcuaa601z/image/upload/v1647065820/YelpCamp/vq4tfbngtn14a7amtffq.jpg',
					filename: 'YelpCamp/vq4tfbngtn14a7amtffq',
				},
			],
		});

		await camp.save();
	}
};

seedDB().then(() => mongoose.connection.close());
