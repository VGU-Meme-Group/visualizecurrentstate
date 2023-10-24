const express = require('express');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

MONGODB_ATLAS_USER=process.env.MONGODB_ATLAS_USER
MONGODB_ATLAS_PASSWORD=process.env.MONGODB_ATLAS_PASSWORD
MONGODB_ATLAS_CLUSTER_ADDRESS=process.env.MONGODB_ATLAS_CLUSTER_ADDRESS
MONGODB_DATABASE_NAME=process.env.MONGODB_DATABASE_NAME

const uri = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@${MONGODB_ATLAS_CLUSTER_ADDRESS}/${MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json()); // Parse JSON request bodies

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("bus_network"); // Access your bus_network database

    // API Endpoint
    app.get('/getStopCoordinates', async (req, res) => {
      const { stop_id } = req.query;

      try {
        const collection = database.collection('stops');

        // Retrieve data from the collection based on stop_id
        const stopInfo = await collection.findOne({ stop_id });

        if (stopInfo) {
          // If stop_id is found, send the response with the retrieved data
          res.json({
            stop_lat: stopInfo.stop_lat,
            stop_lon: stopInfo.stop_lon
          });
        } else {
          // If stop_id is not found, return a 404 error
          res.status(404).json({ error: 'Stop not found' });
        }
      } catch (error) {
        console.error('Error occurred while querying MongoDB', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });


    app.get('/getAllRouteIds', async (req, res) => {
      try {
        const collection = database.collection('routes');

        // Retrieve all route_id values from the collection
        const routeIds = await collection.find({}, { projection: { _id: 0, route_id: 1 } }).toArray();

        // Send the route_id values as the API response
        res.json(routeIds);
      } catch (error) {
        console.error('Error occurred while querying MongoDB', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    

    app.get('/getAllStopIds', async (req, res) => {
      const { routeId } = req.query;

      try {
        const collection = database.collection('stops');

        // Retrieve unique stop_id values starting with the format provided in the routeId query parameter
        const stops = await collection.aggregate([
          {
            $match: {
              stop_id: new RegExp(`^${routeId}_\\w+`)
            }
          },
          {
            $group: {
              _id: '$stop_id',
              stop_name: { $first: '$stop_name' },
              stop_lat: { $first: '$stop_lat' },
              stop_lon: { $first: '$stop_lon' }
            }
          }
        ]).toArray();

        // Send the stop_id values as the API response
        res.json(stops);
      } catch (error) {
        console.error('Error occurred while querying MongoDB', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

  } finally {
    // Do not close the client here, it should be kept open while the server is running
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
