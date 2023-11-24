// import moment from "moment"
// export const convertDateTimeToString = (dateTime) => {
//     return moment(dateTime).format('DD-MM-YYYY')
// }
export function formattedTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
    dateStyle: 'short',
      timeStyle: 'short',
    });
    return formattedDate;
  }