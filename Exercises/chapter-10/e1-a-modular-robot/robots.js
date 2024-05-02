import randomPick from "./helpers/randomPick"; //Could be NPM package
import { findRoute } from "./helpers/pathfinding";
import { mailRoute, mailRoute, roadGraph } from "./data/routes";

export function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

export function routeRobot(state, memory) {
    if (memory.length === 0) {
        memory = mailRoute;
    }

    return {direction: memory[0], memory: memory.slice(1)};
}

export function goalOrientedRobot({place, parcels}, route) {
    if (route.length > 0) {
        return {direction: route[0], memory: route.slice(1)};
    }
    
    const parcel = parcels[0];

    if (parcel.place !== place) {
        route = findRoute(roadGraph, place, parcel.place);
    } else {
        route = findRoute(roadGraph, place, parcel.address);
    }
    
    return {direction: route[0], memory: route.slice(1)};
}

/**
     This robot moves towards the closest parcel until all parcels are collected.
    It then visits the closest address of each undelivered parcel until all are
    delivered.
*/
export function closestParcelsRobot({place, parcels}, route) {
    //using guard clause requires duplicate return statement
    if (route.length > 0) {
        return {direction: route[0], memory: route.slice(1)};
    }

    const uncollectedParcels = parcels.filter(p => p.place !== place)
    if (uncollectedParcels.length > 0) {
        route = uncollectedParcels.map(parcel => findRoute(roadGraph, place, parcel.place))
            .reduce((r1, r2) => r1.length <= r2.length ? r1 : r2);
    } else {
        route = parcels.map(parcel => findRoute(roadGraph, place, parcel.address))
            .reduce((r1, r2) => r1.length <= r2.length ? r1 : r2);
    }
  
    return {direction: route[0], memory: route.slice(1)};
}

/**
     This robot moves towards the closer of the closest parcel and closest address
    of collected parcels until all parcels are delivered.
*/
export function closestParcelOrAddressRobot({place, parcels}, route) {
    if (route.length > 0) {
        return {direction: route[0], memory: route.slice(1)};
    }

    const uncollectedParcels = parcels.filter(p => p.place !== place);
    const undeliveredParcels = parcels.filter(p => p.place === place);

    const parcelRoutes = uncollectedParcels.map(parcel => findRoute(roadGraph, place, parcel.place));
    const deliveryRoutes = undeliveredParcels.map(parcel => findRoute(roadGraph, place, parcel.address));

    route = parcelRoutes.concat(deliveryRoutes)
        .reduce((r1, r2) => r1.length <= r2.length ? r1 : r2);
    
    return {direction: route[0], memory: route.slice(1)};
}