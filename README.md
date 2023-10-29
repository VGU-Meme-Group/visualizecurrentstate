# visualizecurrentstate

There are total 6 APIs (except different versions of each)

## Setup the Server
- Install the environment
```bash
npm install
```
- Run the Server
```bash
node Server.js
```
--------------

## API USE CASES:
#### 1. To find the sequence of bus stop (all stop ids) for a given route:
- Get all routes of the bus network using ___getAllRouteIds___ api and then choose a route id. (E.g: choose route_id = 1)
- Then get all trips (trip ids) of the given route using ___getAllTrips___ api
- Choose a particular trip, for example, the first trip_id of the given route_id (e.g: choose trip_id = 17730750 of route_id = 1)
- Then get all stop ids of the given trip using ___getStopIds___ api. They will be all the stops of the given route.
#### 2. Get the long name of a route
#### 3. Get all information of a bus stop
#### 4 (Redundance). Get coordinates of a bus stop

--------------

## API - SYNTAX - HOW TO USE


### 1. Get all route ids of the bus network

GET METHOD
```bash
http://localhost:3812/getAllRouteIds
```

Return value (Json)
```JSON
[
    {
        "route_id": 1
    },
    {
        "route_id": 2
    },
    {
        "route_id": 3
    },
    {
        "route_id": 6
    }
]
```


### 2. Get the long name of the given route
GET METHOD
```bash
http://localhost:3812/getRouteLongName?route_id=<value>
```

Return value (Json)
```JSON
[
    {
        "route_long_name": "St. Clair"
    }
]
```


### 3. Get all trips (trip_id) of a given route (route_id)

GET METHOD (Recommend using v2)

v1
```bash
http://localhost:3812/getTripIds/<route_id_value>
```

or v2
```bash
http://localhost:3812/getTripIds?route_id=<value>
```


For example (using v2):
```bash
http://localhost:3812/getTripIds?route_id=1
```

Return value (Json)
```JSON
[
    {
        "trip_id": 17730750
    },
    {
        "trip_id": 17730751
    },
    {
        "trip_id": 17730752
    },
    {
        "trip_id": 17730753
    },
]
```



### 4. Get all bus stop id (stop_id) of a given trip  

GET METHOD (recommend using v2)

v1
```bash
http://localhost:3812/getStopIds/<trip_id_value>
```

v2
```bash
http://localhost:3812/getStopIds?trip_id=<value>
```


For example: (Using v2)
```bash
http://localhost:3812/getStopIds?trip_id=17730750
```

Return value (Json)
```JSON
[
    {
        "stop_id": 321
    },
    {
        "stop_id": 7377
    },
    {
        "stop_id": 7426
    },
    {
        "stop_id": 7422
    },
    {
        "stop_id": 7420
    },
]
```

### 5. Get all information of a given bus stop  

GET METHOD (recommend using v2)

v1
```bash
http://localhost:3812/getStop/<stop_id_value>
```

v2
```bash
http://localhost:3812/getStop?stop_id=<value>
```


For example: (Using v2)
```bash
http://localhost:3812/getStop?stop_id=321
```

Return value (Json)
```JSON
{
    "_id": "653e34b4b311c0fea0a88f84",
    "stop_id": "00321",
    "stop_code": null,
    "stop_name": "ST. CLAIR AV & E 153RD ST LOOP STOP 2",
    "stop_desc": null,
    "stop_lat": 41.554209,
    "stop_lon": -81.574449,
    "zone_id": null,
    "stop_url": null,
    "location_type": 0,
    "parent_station": null,
    "wheelchair_boarding": 0
}
```


### 6. Get the coordinates of a given bus stop 

GET METHOD (recommend using v2)

```bash
http://localhost:3812/getStopCoordinates?stop_id=<value>
```

For example: (Using v2)
```bash
http://localhost:3812/getStopCoordinates?stop_id=321
```

Return value (Json)
```JSON
{
    "stop_lat": 41.554209,
    "stop_lon": -81.574449
}
```