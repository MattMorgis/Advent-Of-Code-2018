const streamToEvents = require("./stream-to-events");

const zip = (...arrays) => {
  return arrays[0].map((_, i) => {
    return arrays.map(arr => arr[i]);
  });
};

const sortEvents = (event1, event2) => {
  if (event1.date > event2.date) return -1;
  if (event1.date < event2.date) return 1;
  return 0;
};

const sortedEvents = async stream => {
  const events = [];
  for await (const event of streamToEvents(stream)) {
    events.push(event);
  }

  return events.sort(sortEvents);
};

const guardShifts = events => {
  const eventsMutable = events;
  const eventsByGuard = [];

  while (eventsMutable.length > 0) {
    const event = eventsMutable.pop();
    const shift = {};
    shift.date = event.date;
    shift.guardId = event.action.substr(event.action.indexOf("#")).substr(
      1,
      event.action.substr(event.action.indexOf("#")).indexOf(" ") - 1 // first space after # sign
    );
    let guardEvent;
    let minutes = Array.from(Array(60).keys()).fill(0); // [0 ... 59]
    let startMinute = 0;
    while (
      (guardEvent = eventsMutable.pop()) &&
      !guardEvent.action.includes("Guard")
    ) {
      if (guardEvent.action === "falls asleep") {
        startMinute = guardEvent.date.getMinutes();
      } else {
        let endMinute = guardEvent.date.getMinutes();
        for (let i = startMinute; i < endMinute; i++) {
          minutes[i] = 1;
        }
      }
    }
    // this isn't ideal but .. it works for now.
    if (guardEvent) {
      eventsMutable.push(guardEvent);
    }
    shift.minutes = minutes;
    eventsByGuard.push(shift);
  }
  return eventsByGuard;
};

const shiftsToGuards = records => {
  const uniqueIds = new Set();
  records.forEach(record => uniqueIds.add(record.guardId));

  const guards = new Array();
  for (id of uniqueIds) {
    const shifts = records.filter(record => record.guardId === id);
    const totalMinutesSlept = shifts.reduce((prev, shift) => {
      const shiftMinutes = shift.minutes.reduce((a, b) => a + b, 0);
      return prev + shiftMinutes;
    }, 0);
    const minutes = zip(...shifts.map(x => x.minutes));
    const guard = {id: Number(id), totalMinutesSlept, minutes};
    guards.push(guard);
  }

  return guards;
};

const sleepiestGuard = guards =>
  guards.reduce((a, b) => (a.totalMinutesSlept > b.totalMinutesSlept ? a : b));

const sleepiestMinute = guard => {
  const minutes = guard.minutes.map(minute => minute.reduce((a, b) => a + b));
  return {
    minute: minutes.indexOf(Math.max(...minutes)),
    count: Math.max(...minutes)
  };
};

const sleepyGuard = async eventStream => {
  const events = await sortedEvents(eventStream);
  const shifts = guardShifts(events);
  const guards = shiftsToGuards(shifts);
  const sleepiest = sleepiestGuard(guards);
  return sleepiest.id * sleepiestMinute(sleepiest).minute;
};

const sleepyMinute = async eventStream => {
  const events = await sortedEvents(eventStream);
  const shifts = guardShifts(events);
  const guards = shiftsToGuards(shifts).map(guard => {
    return {...guard, sleepiestMinute: sleepiestMinute(guard)};
  });
  const sleepiest = guards.reduce((a, b) =>
    a.sleepiestMinute.count > b.sleepiestMinute.count ? a : b
  );
  return sleepiest.id * sleepiest.sleepiestMinute.minute;
};

module.exports = {sleepyGuard, sleepyMinute};
