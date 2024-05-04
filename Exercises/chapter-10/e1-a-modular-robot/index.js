import * as Robots from "robots.js"

function runRobot(state, robot, memory) {
    const max_turns = 50;
    for (let turn = 0; t < max_turns; turn++) {
        if (state.parcels.length === 0) {
            return turn;
        }

        const action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
    console.log("Maximum Turns Reached!", state);
    return;
}

function compareRobots(robot1, memory1, robot2, memory2) {
    let robot1turns = 0;
    let robot2turns = 0;

    for (let i = 0; i < 100; i++) {
        const task = VillageState.random();
        robot1turns += runRobot(task, robot1, memory1);
        robot2turns += runRobot(task, robot2, memory2);
    }

    const robot1AvgTurns = Math.round(robot1turns/100);
    const robot2AvgTurns = Math.round(robot2turns/100);
    console.log(`Robot1 took an average of ${robot1AvgTurns} turns.`);
    console.log(`Robot2 took an average of ${robot2AvgTurns} turns.`);
}

compareRobots(Robots.routeRobot, [], Robots.goalOrientedRobot, []);
// Robot1 took an average of 18 turns.
// Robot2 took an average of 15 turns.
compareRobots(Robots.goalOrientedRobot, [], Robots.closestParcelsRobot, []);
// Robot1 took an average of 15 turns.
// Robot2 took an average of 12 turns.
compareRobots(Robots.closestParcelOrAddressRobot, [], Robots.closestParcelsRobot, []);
// Robot1 took an average of 12 turns.
// Robot2 took an average of 12 turns.

// routeRobot -> 18 turns
// goalOriented -> 15 turns
// closestParcels -> 12 turns
// closestParcelOrAddress -> 12 turns
  