import * as Robots from "robots.js"

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
    }
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
  
compareRobots(Robots.routeRobot, [], Robots.goalOrientedRobot, []);
// Robot1 took an average of 18 turns.
// Robot2 took an average of 16 turns.
compareRobots(Robots.goalOrientedRobot, [], Robots.closestParcelsRobot, []);
// Robot1 took an average of 15 turns.
// Robot2 took an average of 14 turns.
compareRobots(Robots.closestParcelOrAddressRobot, [], Robots.closestParcelsRobot, []);
// Robot1 took an average of 15 turns.
// Robot2 took an average of 13 turns.
  