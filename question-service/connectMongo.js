require('dotenv').config("./.env")
const { MongoClient } = require("mongodb");

async function run() {
  const uri = process.env.MONGO_URI;
  
  const client = new MongoClient(uri);
  await client.connect();

  const dbName = "peerprep-database";
  const collectionName = "question-collection";

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  try {
    const cursor = await collection.find();
    for await (const document of cursor) {
        console.log();
        console.log(`Question ID: ${document.question_id}`);
        console.log(`Question Title: ${document.question_title}`);
        console.log(`Question Complexity: ${document.question_complexity}`);
        console.log(`Question Description: ${document.question_description}`);
        console.log();
    };
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }

  await client.close();
}

run().catch(console.dir);