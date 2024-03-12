const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }

  static random(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place === address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  };
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length === 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;

    if (turn > 50) {
      console.log(state);
      return;
    }
    // console.log(state);
    //console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place === to) return route.concat(place);
      if (!work.some(w => w.at === place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}
function routeRobot(state, memory) {
  const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];

  if (memory.length === 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}
function goalOrientedRobot({place, parcels}, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

/**
  This robot moves towards the closest parcel until all parcels are collected.
  It then visits the closest address of each undelivered parcel until all are
  delivered.
*/
function closestParcelsRobot({place, parcels}, route) {
  if (route.length === 0) {
    if (parcels.some(p => p.place != place)) {
      let closestParcel = parcels
        .filter(p => p.place !== place)
        .map(parcel => {
          route = findRoute(roadGraph, place, parcel.place);
          return route
        })
        .reduce((r1, r2) => r1.length <= r2 ? r1 : r2);
      route = closestParcel;
    } else {
      let closestAddress = parcels.map(parcel => {
        route = findRoute(roadGraph, place, parcel.address);
        return route
      }).reduce((r1, r2) => r1.length <= r2 ? r1 : r2);
      route = closestAddress;
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

/**
  This robot moves towards the closer of the closest parcel and closest address
  of collected parcels until all parcels are delivered.
*/
function closestParcelOrAddressRobot({place, parcels}, route) {
  if (route.length === 0) {
    route = parcels
      .map(parcel => {
        if (parcel.place != place) {
          return findRoute(roadGraph, place, parcel.place);
        } else {
          return findRoute(roadGraph, place, parcel.address);
        }
      })
      .reduce((r1, r2) => r1.length <= r2 ? r1 : r2);
  }
  return {direction: route[0], memory: route.slice(1)};
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let robot1turns = 0;
  let robot2turns = 0;
  for (let i = 0; i < 100; i++) {
    let task = VillageState.random();
    robot1turns += runRobot(task, robot1, memory1);
    robot2turns += runRobot(task, robot2, memory2);
  }
  let robot1AvgTurns = Math.round(robot1turns/100);
  let robot2AvgTurns = Math.round(robot2turns/100);
  console.log(`Robot1 took an average of ${robot1AvgTurns} turns.`);
  console.log(`Robot2 took an average of ${robot2AvgTurns} turns.`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
// Robot1 took an average of 18 turns.
// Robot2 took an average of 16 turns.
compareRobots(goalOrientedRobot, [], closestParcelsRobot, []);
// Robot1 took an average of 15 turns.
// Robot2 took an average of 14 turns.
compareRobots(closestParcelOrAddressRobot, [], closestParcelsRobot, []);
// Robot1 took an average of 15 turns.
// Robot2 took an average of 13 turns.
