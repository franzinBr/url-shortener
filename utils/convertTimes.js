
const defaultTimesInSeconds = {
    milisec: 0.001,
    sec: 1,
    min: 60,
    hour: 3600,
    day: 86400
}


exports.convertTimes = (time, converTo = 'milisec') => {
    var prefix = Number(time.split(/[a-zA-Z]+/)[0]);
    var sufix = time.split(/\d+/g).pop()
    return (prefix*defaultTimesInSeconds[sufix])/defaultTimesInSeconds[converTo]

}