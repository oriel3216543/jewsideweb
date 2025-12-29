require('dotenv').config();
const mongoose = require('mongoose');
const Prayer = require('./models/Prayer');
const Admin = require('./models/Admin');

// Initial prayers data
const prayers = [
    {
        title: "Modeh Ani",
        category: "Morning",
        hebrew: "מוֹדֶה אֲנִי לְפָנֶיךָ מֶלֶךְ חַי וְקַיָּם, שֶׁהֶחֱזַרְתָּ בִּי נִשְׁמָתִי בְּחֶמְלָה. רַבָּה אֱמוּנָתֶךָ",
        transliteration: "Modeh ani lefanecha melech chai vekayam, shehechezarta bi nishmati bechemla, raba emunatecha",
        translation: "I give thanks before You, living and eternal King, for You have mercifully restored my soul within me; Your faithfulness is great.",
        order: 1
    },
    {
        title: "Shema Yisrael",
        category: "Morning",
        hebrew: "שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד",
        transliteration: "Shema Yisrael Adonai Eloheinu Adonai Echad",
        translation: "Hear, O Israel: the Lord is our God, the Lord is One.",
        order: 2
    },
    {
        title: "Shabbat Candle Lighting",
        category: "Shabbat",
        hebrew: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל שַׁבָּת",
        transliteration: "Baruch atah Adonai, Eloheinu melech ha'olam, asher kid'shanu b'mitzvotav v'tzivanu l'hadlik ner shel Shabbat",
        translation: "Blessed are You, Lord our God, King of the universe, who has sanctified us with His commandments, and commanded us to kindle the Shabbat light.",
        order: 1
    },
    {
        title: "Kiddush",
        category: "Shabbat",
        hebrew: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, בּוֹרֵא פְּרִי הַגָּפֶן",
        transliteration: "Baruch atah Adonai, Eloheinu melech ha'olam, borei p'ri hagafen",
        translation: "Blessed are You, Lord our God, King of the universe, who creates the fruit of the vine.",
        order: 2
    },
    {
        title: "Hamotzi",
        category: "Blessings",
        hebrew: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמּוֹצִיא לֶחֶם מִן הָאָרֶץ",
        transliteration: "Baruch atah Adonai, Eloheinu melech ha'olam, hamotzi lechem min ha'aretz",
        translation: "Blessed are You, Lord our God, King of the universe, who brings forth bread from the earth.",
        order: 1
    },
    {
        title: "Bedtime Shema",
        category: "Evening",
        hebrew: "בָּרוּךְ אַתָּה יְיָ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, הַמַּפִּיל חֶבְלֵי שֵׁנָה עַל עֵינַי וּתְנוּמָה עַל עַפְעַפָּי",
        transliteration: "Baruch atah Adonai, Eloheinu melech ha'olam, hamapil chevlei sheina al einai, utnuma al af'apai",
        translation: "Blessed are You, Lord our God, King of the universe, who makes the bonds of sleep fall upon my eyes and slumber upon my eyelids.",
        order: 1
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB');
        
        // Clear existing data
        await Prayer.deleteMany({});
        await Admin.deleteMany({});
        
        console.log('🗑️  Cleared existing data');
        
        // Insert prayers
        await Prayer.insertMany(prayers);
        console.log(`✅ Inserted ${prayers.length} prayers`);
        
        // Create admin user
        const admin = new Admin({
            username: process.env.ADMIN_USERNAME || 'admin@jewside.com',
            password: process.env.ADMIN_PASSWORD || 'OriAdmin'
        });
        
        await admin.save();
        console.log('✅ Created admin user');
        console.log(`   Username: ${admin.username}`);
        console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'OriAdmin'}`);
        
        console.log('\n🎉 Database seeded successfully!\n');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

