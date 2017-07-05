# Tython
Backend application for Deep Core

# Data Model

The data model consists of two parts, the relationships graph, and the user data (collection, squads, etc).

## Relationships

![Tyhon Data Model](data_model.png)

## User Data

All things saved by users.

### Squad (WIP)

```json
{
  "id": 0,
  "owner": "some-user",
  "faction": "scum",
  "name": "Worlds list",
  "points": 98,
  "pilots": [{
    "pilot_id": 171,
    "upgrades": [{
      "upgrade_id": 0
    }, {
      "upgrade_id": 2
    }]
  }, {
    "pilot_id": 172,
    "upgrades": [{
      "upgrade_id": 3
    }]
  }]
}
```

### Collection (WIP)

```json
{
  "owner": "some-user",
  "expansions": [0, 1, 2, 3, 4],
  "pilots": [0, 1, 2, 3, 4],
  "ships": [0, 1, 2, 3, 4],
  "upgrades": [0, 1, 2, 3, 4]
}
```

