# visualizecurrentstate

There are total 3 APIs

## Setup the Server
- Install the environment
```bash
npm install
```
- Run the Server
```bash
node Server.js
```

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
        "_id": "01_1_S2",
        "stop_name": "STOP_01_1_S2",
        "stop_lat": 21.04995,
        "stop_lon": 105.883308
    },
    {
        "_id": "01_1_S14",
        "stop_name": "STOP_01_1_S14",
        "stop_lat": 21.01606,
        "stop_lon": 105.828117
    },
    {
        "_id": "01_1_S4",
        "stop_name": "STOP_01_1_S4",
        "stop_lat": 21.042601,
        "stop_lon": 105.870285
    },
    {
        "_id": "01_1_S6",
        "stop_name": "STOP_01_1_S6",
        "stop_lat": 21.037449,
        "stop_lon": 105.846855
    },
    {
        "_id": "01_1_S13",
        "stop_name": "STOP_01_1_S13",
        "stop_lat": 21.019613,
        "stop_lon": 105.833923
    },
    {
        "_id": "01_1_S12",
        "stop_name": "STOP_01_1_S12",
        "stop_lat": 21.019377,
        "stop_lon": 105.837822
    },
    {
        "_id": "01_1_S23",
        "stop_name": "STOP_01_1_S23",
        "stop_lat": 20.983696,
        "stop_lon": 105.791504
    },
    {
        "_id": "01_1_S26",
        "stop_name": "STOP_01_1_S26",
        "stop_lat": 20.975735,
        "stop_lon": 105.781395
    },
    {
        "_id": "01_1_S31",
        "stop_name": "STOP_01_1_S31",
        "stop_lat": 20.962284,
        "stop_lon": 105.764122
    },
    {
        "_id": "01_1_S21",
        "stop_name": "STOP_01_1_S21",
        "stop_lat": 20.988413,
        "stop_lon": 105.79805
    },
    {
        "_id": "01_1_S32",
        "stop_name": "STOP_01_1_S32",
        "stop_lat": 20.960421,
        "stop_lon": 105.761734
    },
    {
        "_id": "01_1_S9",
        "stop_name": "STOP_01_1_S9",
        "stop_lat": 21.026432,
        "stop_lon": 105.846245
    },
    {
        "_id": "01_1_S30",
        "stop_name": "STOP_01_1_S30",
        "stop_lat": 20.965034,
        "stop_lon": 105.767624
    },
    {
        "_id": "01_1_S10",
        "stop_name": "STOP_01_1_S10",
        "stop_lat": 21.025799,
        "stop_lon": 105.841263
    },
    {
        "_id": "01_1_S18",
        "stop_name": "STOP_01_1_S18",
        "stop_lat": 20.996183,
        "stop_lon": 105.80909
    },
    {
        "_id": "01_1_S22",
        "stop_name": "STOP_01_1_S22",
        "stop_lat": 20.986134,
        "stop_lon": 105.794823
    },
    {
        "_id": "01_1_S36",
        "stop_name": "STOP_01_1_S36",
        "stop_lat": 20.95006,
        "stop_lon": 105.747246
    },
    {
        "_id": "01_1_S16",
        "stop_name": "STOP_01_1_S16",
        "stop_lat": 21.007383,
        "stop_lon": 105.822975
    },
    {
        "_id": "01_1_S20",
        "stop_name": "STOP_01_1_S20",
        "stop_lat": 20.990717,
        "stop_lon": 105.801224
    },
    {
        "_id": "01_1_S34",
        "stop_name": "STOP_01_1_S34",
        "stop_lat": 20.954325,
        "stop_lon": 105.753746
    },
    {
        "_id": "01_1_S1",
        "stop_name": "STOP_01_1_S1",
        "stop_lat": 21.048409,
        "stop_lon": 105.878334
    },
    {
        "_id": "01_1_S35",
        "stop_name": "STOP_01_1_S35",
        "stop_lat": 20.952318,
        "stop_lon": 105.75106
    },
    {
        "_id": "01_1_S25",
        "stop_name": "STOP_01_1_S25",
        "stop_lat": 20.979527,
        "stop_lon": 105.786293
    },
    {
        "_id": "01_1_S3",
        "stop_name": "STOP_01_1_S3",
        "stop_lat": 21.045799,
        "stop_lon": 105.875122
    },
    {
        "_id": "01_1_S15",
        "stop_name": "STOP_01_1_S15",
        "stop_lat": 21.011351,
        "stop_lon": 105.825172
    },
    {
        "_id": "01_1_S7",
        "stop_name": "STOP_01_1_S7",
        "stop_lat": 21.031317,
        "stop_lon": 105.847038
    },
    {
        "_id": "01_1_S11",
        "stop_name": "STOP_01_1_S11",
        "stop_lat": 21.023535,
        "stop_lon": 105.84127
    },
    {
        "_id": "01_1_S33",
        "stop_name": "STOP_01_1_S33",
        "stop_lat": 20.958336,
        "stop_lon": 105.759018
    },
    {
        "_id": "01_1_S5",
        "stop_name": "STOP_01_1_S5",
        "stop_lat": 21.041367,
        "stop_lon": 105.849457
    },
    {
        "_id": "01_1_S29",
        "stop_name": "STOP_01_1_S29",
        "stop_lat": 20.9678,
        "stop_lon": 105.771225
    },
    {
        "_id": "01_1_S8",
        "stop_name": "STOP_01_1_S8",
        "stop_lat": 21.02685,
        "stop_lon": 105.847458
    },
    {
        "_id": "01_1_S28",
        "stop_name": "STOP_01_1_S28",
        "stop_lat": 20.969769,
        "stop_lon": 105.773705
    },
    {
        "_id": "01_1_S27",
        "stop_name": "STOP_01_1_S27",
        "stop_lat": 20.972782,
        "stop_lon": 105.777367
    },
    {
        "_id": "01_1_S24",
        "stop_name": "STOP_01_1_S24",
        "stop_lat": 20.980652,
        "stop_lon": 105.787743
    },
    {
        "_id": "01_1_S17",
        "stop_name": "STOP_01_1_S17",
        "stop_lat": 21.000166,
        "stop_lon": 105.815071
    },
    {
        "_id": "01_1_S19",
        "stop_name": "STOP_01_1_S19",
        "stop_lat": 20.993834,
        "stop_lon": 105.805641
    }
]
```