# visualizecurrentstate

There are total 3 APIs

### 1. Get the coordinate of a bus stop

GET METHOD
```bash
http://localhost:3812/getStopCoordinates?stop_id=<value>
```

For example:
```bash
http://localhost:3812/getStopCoordinates?stop_id=01_1_S1
```

Return value (Json)
```JSON
[
    {
        "stop_lat": 21.048409,
        "stop_lon": 105.878334
    }
]
```

### 2. Get all route Id

GET METHOD
```bash
http://localhost:3812/getAllRouteIds
```

Return value (Json)
```JSON
[
    {
        "route_id": "BRT01_1"
    },
    {
        "route_id": "103_2"
    },
    {
        "route_id": "103_1"
    },
    {
        "route_id": "96_1"
    },
    ...
]
```

### 3. Get all bus stop information of a route 
(return stop_id, stop_name, stop_lat, stop_lon)

GET METHOD
```bash
http://localhost:3812/getAllStopIds?routeId=<value>
```

For example:
```bash
http://localhost:3812/getAllStopIds?routeId=01_1
```

Return value (Json)
```JSON
[
    {
        "stop_id": "01_1_S1",
        "stop_name": "STOP_01_1_S1",
        "stop_lat": 21.048409,
        "stop_lon": 105.878334
    },
    {
        "stop_id": "01_1_S1",
        "stop_name": "STOP_01_1_S1",
        "stop_lat": 21.048409,
        "stop_lon": 105.878334
    },
    {
        "stop_id": "01_1_S1",
        "stop_name": "STOP_01_1_S1",
        "stop_lat": 21.048409,
        "stop_lon": 105.878334
    },
    {
        "stop_id": "01_1_S10",
        "stop_name": "STOP_01_1_S10",
        "stop_lat": 21.025799,
        "stop_lon": 105.841263
    },
    ...
]