const { Client, Databases } = require('node-appwrite');

// --- --- --- CONFIGURATION --- --- ---
// --- --- --- --- --- --- --- --- --- ---

// IMPORTANT: Copy these values DIRECTLY from your Project Settings page
const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1'; // <-- VERIFY THIS
const APPWRITE_PROJECT_ID = '68834d57001657a6b223';       // <-- VERIFY THIS

// This is your Database ID
const DATABASE_ID = '68834fcf0022b7ae015c';               // <-- VERIFY THIS

// PASTE THE SAME API KEY YOU WERE USING BEFORE
const APPWRITE_API_KEY = 'standard_dd6fb6d4c8e00ec43ea15d69063b3d11431b1ece8af41b9d602945af13cc577ed5bac5a8de8175463282e68b2a64540d8f64f4f64ae771a8247c6b817521d8f3297debd68d6db8702284b7bc4c526b1d4f4e1c7717cf50860b7cae61767f1f9b6acbd87d160e68c7dcbed0ddd1bbf5111e35137323e9cb4ad9883b9cfea218e4';           // <-- PASTE KEY HERE

// --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- --- --- --- ---

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

const databases = new Databases(client);

async function diagnoseConnection() {
    try {
        console.log(`Attempting to connect to project: ${APPWRITE_PROJECT_ID}...`);
        console.log(`Using endpoint: ${APPWRITE_ENDPOINT}`);
        console.log(`\nFetching collections from database: ${DATABASE_ID}...`);

        const response = await databases.listCollections(DATABASE_ID);

        console.log('\n✅ SUCCESS! Connection is working.');
        console.log(`Found ${response.total} collection(s):`);

        if (response.total > 0) {
            response.collections.forEach(collection => {
                console.log(`- Collection Name: "${collection.name}", ID: ${collection.$id}`);
            });
        } else {
            console.log('No collections found in this database.');
        }

    } catch (error) {
        console.error('\n❌ FAILED! An error occurred:');
        console.error(`Error Type: ${error.constructor.name}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`\n--- Troubleshooting ---`);
        if (error.message.toLowerCase().includes('database not found')) {
            console.error('-> The DATABASE_ID might be incorrect.');
        } else if (error.message.toLowerCase().includes('project with the requested id could not be found')) {
             console.error('-> The PROJECT_ID or ENDPOINT is incorrect. Double-check your project region!');
        } else if (error.message.toLowerCase().includes('invalid api key')) {
             console.error('-> The APPWRITE_API_KEY is incorrect or does not have the "databases" scope.');
        } else {
             console.error('-> Please double-check all your IDs, endpoint, and API key permissions.');
        }
    }
}

diagnoseConnection();