import requests
from google.transit import gtfs_realtime_pb2

# URL of the GTFS-realtime .pb file

# 1498,gtfs-rt,tu,CA,Alberta,Edmonton,Edmonton Transit System,,,714,
# pb_url = "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb"
# pb_url = "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb"

#
pb_url = "http://gtfs.gcrta.org/TMGTFSRealTimeWebService/Vehicle/VehiclePositions.pb"
# pb_url = "https://www.miapp.ca/GTFS_RT/TripUpdate/TripUpdates.pb"

# Make an HTTP request to get the .pb file
response = requests.get(pb_url)

if response.status_code == 200:
    # Parse the .pb file using gtfs_realtime_pb2
    feed = gtfs_realtime_pb2.FeedMessage()
    feed.ParseFromString(response.content)

    # Iterate through the entities in the feed
    for entity in feed.entity:
        if entity.HasField("trip_update"):
            print("Trip Update:")
            print(entity.trip_update)
        elif entity.HasField("vehicle"):
            print("Vehicle Position:")
            print(entity.vehicle)
        elif entity.HasField("alert"):
            print("Alert:")
            print(entity.alert)
        else:
            print("Unknown Entity Type")

else:
    print(f"Failed to retrieve data. HTTP Status Code: {response.status_code}")