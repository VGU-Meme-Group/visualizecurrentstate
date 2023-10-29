require('dotenv').config();

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const apiFunc = require("./api_function");

const MONGODB_ATLAS_USER = process.env.MONGODB_ATLAS_USER;
const MONGODB_ATLAS_PASSWORD = process.env.MONGODB_ATLAS_PASSWORD;
const MONGODB_ATLAS_CLUSTER_ADDRESS = process.env.MONGODB_ATLAS_CLUSTER_ADDRESS;
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;

const uri = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@${MONGODB_ATLAS_CLUSTER_ADDRESS}/${MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json()); // Parse JSON request bodies

// Create a MongoClient with a MongoClientOptions object to set the Stable API version v1
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("gcrta_bus"); 

    // API Endpoint 
    // get all trip ids of a given route (route id)
    app.get('/getTripIds/:route_id', async (req, res) => {
        
        const route_id = parseInt(req.params.route_id);
        const trips = database.collection('trips');
        const trip_ids = await trips.find({ route_id: route_id }).toArray();
        res.json(trip_ids.map(trip => trip.trip_id));
      });
    
    // v2
    app.get('/getTripIds', async (req, res) => {
        const routeId = parseInt(req.query.route_id);
  
        try {
          const tripsCollection = database.collection('trips');
          const tripIds = await tripsCollection
            .find({ route_id: routeId })
            .toArray();
  
          res.json(tripIds.map(trip => trip.trip_id));
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    // get all stop ids of a given trip (stop sequence)
    app.get('/getStopIds/:trip_id', async (req, res) => {
        const trip_id = parseInt(req.params.trip_id);
        const stop_times = database.collection('stop_times');
        const stop_ids = await stop_times.find({ trip_id: trip_id }).toArray();
        res.json(stop_ids.map(stop_time => stop_time.stop_id));
    });

    app.get('/getStopIds', async (req, res) => {
        const tripId = parseInt(req.query.trip_id);
  
        try {
          const stopTimesCollection = database.collection('stop_times');
          const stopIds = await stopTimesCollection
            .find({ trip_id: tripId })
            .toArray();
  
          res.json(stopIds.map(stopTime => stopTime.stop_id));
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    // get all information of a given stop_id
    app.get('/getStop/:stop_id', async (req, res) => {
        const stop_id = apiFunc.formatStringWithZeros(req.params.stop_id);
        const stops = database.collection('stops');
        const stop_info = await stops.findOne({ stop_id: stop_id });
        res.json(stop_info);
    });

    app.get('/getStop', async (req, res) => {
        const stopId = apiFunc.formatStringWithZeros(req.query.stop_id);
  
        try {
          const stopsCollection = database.collection('stops');
          const stopInfo = await stopsCollection.findOne({ stop_id: stopId });
  
          if (stopInfo) {
            res.json(stopInfo);
          } else {
            res.status(404).json({ error: 'Stop not found.' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // get Coordinates of a bus stop (bus stop id)
    app.get('/getStopCoordinates', async (req, res) => {
        const stopId = apiFunc.formatStringWithZeros(req.query.stop_id);
  
        try {
          const stopsCollection = database.collection('stops');
          const stopInfo = await stopsCollection.findOne({ stop_id: stopId });
  
          if (stopInfo) {
            // If stop_id is found, send the response with the retrieved data
            res.json({
                stop_lat: stopInfo.stop_lat,
                stop_lon: stopInfo.stop_lon
            });
          } else {
            res.status(404).json({ error: 'Stop not found.' });
          }
        } catch (error) {
          console.error(error);
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
