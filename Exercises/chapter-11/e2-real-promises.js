function activityTable(day) {
    //Get an array of log file names for the specified day
    return textFile("camera_logs.txt")
    .then(data => {
        return data.split("\n")
        .filter(fn => new Date(fn.match(/\d{4}-\d\d-\d\d/)[0]).getDay() === day);
    })
    //Read each log file and create nested array of timestamps for each file
    .then(logFileData => {
        return Promise.all(logFileData.map(fn => textFile(fn)))
    })
    //Count number of instances of each hour in results array
    .then(logFileTimestamps => {
        const results = Array(24).fill(0);

        logFileTimestamps.forEach(logTimes => {
            logTimes.split("\n")
            .forEach(time => {
                const hour = new Date(parseInt(time)).getHours();
                results[hour] = results[hour] + 1 || 0;
            })
        })

        return results;
    })
}

activityTable(6)
  .then(table => console.log(activityGraph(table)));