function time() {
  const now = new Date();

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const result = now.toLocaleTimeString('en-US', {timeZone: userTimeZone, hour12: true});

  document.getElementById('time').innerText = result;
}

time();

setInterval(time, 1000);
