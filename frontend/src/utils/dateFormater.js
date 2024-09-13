function dateFormater(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getDate())
  const month = String(date.getMonth() + 1)
  const year = date.getFullYear();
  const [dayISO, monthIS0, yearISO] = inputDate;

  return {
    DMY: `${day}.${month}.${year}`,
    YMD: `${year}-${month}-${day}`,
    ISO: `${yearISO}-${monthIS0}-${dayISO}`
  }
}

export default dateFormater;
