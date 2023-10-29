import requests
from google.transit import gtfs_realtime_pb2
import json

# URL of the GTFS-realtime .pb file
pb_url = "http://gtfs.edmonton.ca/TMGTFSRealTimeWebService/TripUpdate/TripUpdates.pb"

# Make an HTTP request to get the .pb file
response = requests.get(pb_url)

if response.status_code == 200:
    # Parse the .pb file using gtfs_realtime_pb2
    feed = gtfs_realtime_pb2.FeedMessage()
    feed.ParseFromString(response.content)

    # List to store trip update entities as dictionaries
    trip_updates_list = []

    # Iterate through the entities in the feed
    for entity in feed.entity:
        if entity.HasField("trip_update"):
            # Extract relevant information from trip_update object
            trip_update_data = {
                "trip_id": entity.trip_update.trip.trip_id,
                "route_id": entity.trip_update.trip.route_id,
                "start_time": entity.trip_update.trip.start_time,
                "start_date": entity.trip_update.trip.start_date,
                "stop_time_update": [
                    {
                        "stop_sequence": update.stop_sequence,
                        "arrival": update.arrival.time if update.HasField("arrival") else None,
                        "departure": update.departure.time if update.HasField("departure") else None,
                        "stop_id": update.stop_id
                    }
                    for update in entity.trip_update.stop_time_update
                ]
            }
            # Append the trip update dictionary to the list
            trip_updates_list.append(trip_update_data)

    # Save trip update entities to a JSON file
    with open("trip_updates.json", "w") as json_file:
        json.dump(trip_updates_list, json_file, indent=2)

    print("Trip updates saved to trip_updates.json")

else:
    print(f"Failed to retrieve data. HTTP Status Code: {response.status_code}")
