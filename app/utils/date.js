export function formatDateTimeFromSql(string) {
  if (typeof string === 'string') {
    const date = new Date(string);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${date.getFullYear()}-${mm}-${dd}T${date.getHours()}:${date.getMinutes()}`;
  }

  return null;
}

export function getCurrentDateTimeForPicker() {
  const date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;

  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${date.getFullYear()}-${mm}-${dd}T00:00`;
}

export function formatDateFromSql(string, splitter = '.') {
  if (typeof string === 'string') {
    const date = new Date(string.substring(0, 10));
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return dd + splitter + mm + splitter + date.getFullYear();
  }

  return null;
}

export function formatDateFromSqlUsa(string, splitter = '.') {
  if (typeof string === 'string') {
    const date = new Date(string.substring(0, 10));
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return date.getFullYear() + splitter + mm + splitter + dd;
  }

  return null;
}

export function diffFromNowInDays(date) {
  const now = new Date();
  const difDate = new Date(date.substring(0, 10));
  return -Math.ceil(
    (Date.UTC(difDate.getFullYear(), difDate.getMonth(), difDate.getDate()) -
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}
