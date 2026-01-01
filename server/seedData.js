require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/connectDB');
const User = require('./models/userModel');
const Society = require('./models/societyModel');
const Event = require('./models/eventModel');

const usersData = require('./data/users.json');
const societiesData = require('./data/societies.json');
const eventsData = require('./data/events.json');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('📦 Connected to MongoDB for seeding...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Society.deleteMany({});
    await Event.deleteMany({});
    console.log('✅ Existing data cleared!');

    // Seed Users
    console.log('👥 Seeding users...');
    const hashedUsers = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ ${createdUsers.length} users created!`);

    // Seed Societies
    console.log('🏢 Seeding societies...');
    // Update createdBy with actual user IDs
    const updatedSocieties = societiesData.map((society, index) => ({
      ...society,
      createdBy: createdUsers[index % createdUsers.length]._id
    }));
    const createdSocieties = await Society.insertMany(updatedSocieties);
    console.log(`✅ ${createdSocieties.length} societies created!`);

    // Seed Events
    console.log('📅 Seeding events...');
    // Update societyId with actual society IDs
    const updatedEvents = eventsData.map((event, index) => ({
      ...event,
      societyId: createdSocieties[index % createdSocieties.length]._id,
      date: new Date(event.date)
    }));
    const createdEvents = await Event.insertMany(updatedEvents);
    console.log(`✅ ${createdEvents.length} events created!`);

    // Update societies with their events
    console.log('🔗 Linking events to societies...');
    for (const event of createdEvents) {
      await Society.findByIdAndUpdate(
        event.societyId,
        { $push: { events: event._id } }
      );
    }
    console.log('✅ Events linked to societies!');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   👥 Users: ${createdUsers.length}`);
    console.log(`   🏢 Societies: ${createdSocieties.length}`);
    console.log(`   📅 Events: ${createdEvents.length}`);
    console.log('\n📝 Sample Login Credentials:');
    console.log('   Email: john@example.com');
    console.log('   Password: 1122');
    console.log('\n   Email: emma@example.com');
    console.log('   Password: 1122');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
