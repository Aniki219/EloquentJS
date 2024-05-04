async function activityTable(day) {
    //Get an array of log file names for the specified day
    const logFileList = await textFile("camera_logs.txt");
    const logFileArr = logFileList.split("\n")
        .filter(fn => new Date(fn.match(/\d{4}-\d\d-\d\d/)[0]).getDay() === day);

    //Read each log file and create a string of all logged timestamps
    const logFileTimestamps = await logFileArr.map(async fn => await textFile(fn))
        .reduce((a,b) => a.concat("\n" + b));

    //Count number of instances of each hour in results array
    const results = Array(24).fill(0);
    await logFileTimestamps.split("\n")
        .forEach(time => {
            const hour = new Date(parseInt(time)).getHours();
            results[hour] = results[hour] + 1 || 0;
        })

    return results;
}

activityTable(1)
  .then(table => console.log(activityGraph(table)));