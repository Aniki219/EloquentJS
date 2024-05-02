import randomPick from "./helpers/randomPick"; //Could be NPM package
import { findRoute } from "./helpers/pathfinding";
import { mailRoute, roads } from "./data/routes";

const roadGraph = buildGraph(roads);

export function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

export function routeRobot(state, memory) {
    const memory = mailRoute;
  
    if (memory.length === 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}
  
export function goalOrientedRobot({place, parcels}, route) {
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
export function closestParcelsRobot({place, parcels}, route) {
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
export function closestParcelOrAddressRobot({place, parcels}, route) {
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