function calculateDeadlineDate(date, workingHours) {

  if (workingHours <= 0) {
    return date;
  }

  let tempDate = date;
  let days;
  const dailyHours = 9;
  const workingDayEnd = 19;
  const workingDayStart = 10;

  days = workingHours / dailyHours >= 1 ? Math.floor(workingHours / dailyHours) : 0;
  
  let hoursLeft = workingHours % dailyHours;
  tempDate.setDate(tempDate.getDate() + days);
  tempDate.setHours(tempDate.getHours() + hoursLeft);

  if (tempDate.getHours() >= workingDayEnd) {
    hoursLeft = tempDate.getHours() - workingDayEnd;
    tempDate.setDate(tempDate.getDate() + 1);
    tempDate.setHours(workingDayStart + hoursLeft);
  } else if (tempDate.getHours() < workingDayStart) {
    tempDate.setHours(workingDayStart + hoursLeft);
  }

  return tempDate;
}

function getTranslateTime(clientReq) {
  const symbolsUkrPerHour = 1333;
  const symbolsEngPerHour = 333;
  let minTime = new Date();
  let basicTime = new Date();
  let workingHours;
  minTime.setTime(minTime.getTime() + 60 * 60 * 1000);
  basicTime.setTime(basicTime.getTime() + 30 * 60 * 1000);
  
  if (clientReq.count <= 0) {
    throw new Error("Symbol count is equal or less than 0");
  }

  if (clientReq.language != "en" && clientReq.language != "uk" && clientReq.language != "ru") {
    throw new Error("Language is different from avaliable on the site");
  }

  if (clientReq.language == "en") {
    workingHours = Math.ceil(clientReq.count / symbolsEngPerHour);
  } else if (clientReq.language == "uk" || clientReq.language == "ru") {
    workingHours = Math.ceil(clientReq.count / symbolsUkrPerHour);
  }

  if (workingHours < 1) return {deadline_date: minTime.toLocaleString('en-GB'), 
                                deadline: Math.round(minTime.getTime() / 1000),
                                hours: workingHours};
  
  let calcWorkingHours = calculateDeadlineDate(basicTime, workingHours);

  return {deadline_date: calcWorkingHours.toLocaleString('en-GB'), 
          deadline: Math.round(calcWorkingHours.getTime() / 1000),
          hours: workingHours};
}

function calculatePrice(clientReq) {
  const ruUkrSymCost = 0.05;
  const engSymCost = 0.12;
  const minEngprice = 120;
  const minruUkrPrice = 50;
  const standartExtensions = ["doc", "docx", "rtf"];
  const costMultiplier = 1.2;
  let translateCost;

  if (clientReq.count <= 0) {
    throw new Error("Symbol count is equal or less than 0");
  }

  if (clientReq.language != "en" && clientReq.language != "uk" && clientReq.language != "ru") {
    throw new Error("Language is different from avaliable on the site");
  }

  if (clientReq.language == "en") {
    translateCost = engSymCost * clientReq.count;
    if (translateCost < minEngprice) {
      translateCost = minEngprice;
    }
  } else if (clientReq.language == "uk" || clientReq.language == "ru") {
    translateCost = ruUkrSymCost * clientReq.count;
    if (translateCost < minruUkrPrice) {
      translateCost = minruUkrPrice;
    }
  }

  if (!standartExtensions.includes(clientReq.mimetype)) translateCost *= costMultiplier;

  return Number(translateCost.toFixed(2));
}

function createJSONResponse(req) {
  let deadlineData;
  try {
    deadlineData = getTranslateTime(req);
  } catch(err) {
    console.log(err.message);
    return;
  }
  
  let servResp = {};
  
  try {
    servResp.price = calculatePrice(req);
  } catch(err) {
    console.log(err.message);
    return;
  }
  
  servResp.time = deadlineData.hours;
  servResp.deadline = deadlineData.deadline;
  servResp.deadline_date = deadlineData.deadline_date;

  return servResp;
}

module.exports = {createJSONResponse, calculatePrice, calculateDeadlineDate, getTranslateTime};