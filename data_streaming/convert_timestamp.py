import datetime

# Unix timestamp
timestamp = 1698563398

# Convert Unix timestamp to a datetime object
dt_object = datetime.datetime.fromtimestamp(timestamp)

# Format the datetime object as a string
formatted_date_time = dt_object.strftime('%Y-%m-%d %H:%M:%S')

print("Human-readable date and time:", formatted_date_time)