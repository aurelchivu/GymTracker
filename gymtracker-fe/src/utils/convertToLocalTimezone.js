import moment from 'moment-timezone';

// Convert UTC date to local time zone date
export function convertToLocalTimezone(utcDate) {
  let timeZone = moment.tz.guess(true);
  let datePosted = moment
    .utc(utcDate)
    .tz(timeZone)
    .format('YYYY-MM-DD HH:mm:ss');
  return datePosted;
}
