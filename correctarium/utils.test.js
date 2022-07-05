const utils = require('./utils');

test("Calculating date when working hours equals 0", () => {
  let date = new Date();
  expect(utils.calculateDeadlineDate(date, 0)).toStrictEqual(date);
})

test("Calculating date when working hours less then 0", () => {
  let date = new Date();
  expect(utils.calculateDeadlineDate(date, -19)).toStrictEqual(date);
})

test("Calculating date when working hours less or equal 9", () => {
  let date = new Date();

  let dateChecker = (date, hours) => {
    let dateTemp = date;

    if (dateTemp.getHours() + hours >= 19) {
      hours -= (19 - dateTemp.getHours());
      dateTemp.setDate(dateTemp.getDate() + 1);
      dateTemp.setHours(10 + hours);
    } else {
      dateTemp.setHours(dateTemp.getHours() + hours);
    }

    return dateTemp;
  }

  expect(utils.calculateDeadlineDate(date, 3)).toStrictEqual(dateChecker(date, 3));
  expect(utils.calculateDeadlineDate(date, 1)).toStrictEqual(dateChecker(date, 1));
  expect(utils.calculateDeadlineDate(date, 9)).toStrictEqual(dateChecker(date, 9));
  expect(utils.calculateDeadlineDate(date, 8)).toStrictEqual(dateChecker(date, 8));
})

test("Calculating date when working hours more than 9", () => {
  let date = new Date();
  
  let dateChecker = (date, hours) => {
    let dateTemp = date;

    let days = hours / 9;
    let hoursLeft = hours % 9;

    dateTemp.setDate(dateTemp.getDate() + days);

    if (dateTemp.getHours() + hoursLeft >= 19) {
      hours -= (19 - dateTemp.getHours());
      dateTemp.setDate(dateTemp.getDate() + 1);
      dateTemp.setHours(10 + hours);
    } else {
      dateTemp.setHours(dateTemp.getHours() + hours);
    }

    return dateTemp;
  }

  expect(utils.calculateDeadlineDate(date, 10)).toStrictEqual(dateChecker(date, 10));
  expect(utils.calculateDeadlineDate(date, 99)).toStrictEqual(dateChecker(date, 99));
  expect(utils.calculateDeadlineDate(date, 88)).toStrictEqual(dateChecker(date, 88));
  expect(utils.calculateDeadlineDate(date, 99999999)).toStrictEqual(dateChecker(date, 99999999));
})

test("Calculating working hours if count is 0 or less", () => {
  expect(() => utils.getTranslateTime({"language": "en", "count": 0}).toThrow("Symbol count is equal or less than 0"));
  expect(() => utils.getTranslateTime({"language": "uk", "count": -17}).toThrow("Symbol count is equal or less than 0"));
})

test("Calculating working hours if language is different from English, Ukrainian or russian", () => {
  expect(() => utils.getTranslateTime({"language": "kz", "count": 1000}).toThrow("Language is different from avaliable on the site"));
  expect(() => utils.getTranslateTime({"language": "egtyhy", "count": 23456}).toThrow("Language is different from avaliable on the site"));
})

test("Calculating working hours for english text", () => {
  expect(utils.getTranslateTime({"language": "en", "count": 10000}).hours).toBeCloseTo(31);
  expect(utils.getTranslateTime({"language": "en", "count": 356889}).hours).toBeCloseTo(1072);
  expect(utils.getTranslateTime({"language": "en", "count": 865}).hours).toBeCloseTo(3);
  expect(utils.getTranslateTime({"language": "en", "count": 999}).hours).toBeCloseTo(3);
})

test("Calculating working hours for ukrainian/russian text", () => {
  expect(utils.getTranslateTime({"language": "uk", "count": 10000}).hours).toBeCloseTo(8);
  expect(utils.getTranslateTime({"language": "ru", "count": 356889}).hours).toBeCloseTo(268);
  expect(utils.getTranslateTime({"language": "uk", "count": 865}).hours).toBeCloseTo(1);
  expect(utils.getTranslateTime({"language": "uk", "count": 1332}).hours).toBeCloseTo(1);
})

test("Calculating price if symbol count equals 0", () => {
  expect(() => utils.calculatePrice({"language": "en", "mimetype": "docx", "count": 0}).toThrow("Symbol count is equal or less than 0"));
  expect(() => utils.calculatePrice({"language": "en", "mimetype": "pdf", "count": -8}).toThrow("Symbol count is equal or less than 0"));
  expect(() => utils.calculatePrice({"language": "uk", "mimetype": "doc", "count": 0}).toThrow("Symbol count is equal or less than 0"));
  expect(() => utils.calculatePrice({"language": "ru", "mimetype": "rtf", "count": -187}).toThrow("Symbol count is equal or less than 0"));
  expect(() => utils.calculatePrice({"language": "uk", "mimetype": "pdf", "count": 0}).toThrow("Symbol count is equal or less than 0"));
})

test("Calculating price if if language is different from English, Ukrainian or russian", () => {
  expect(() => utils.calculatePrice({"language": "kz", "mimetype": "docx", "count": 1000}).toThrow("Language is different from avaliable on the site"));
  expect(() => utils.calculatePrice({"language": "hgnjhmuj", "mimetype": "pdf", "count": 1000}).toThrow("Language is different from avaliable on the site"));
  expect(() => utils.calculatePrice({"language": "cn", "mimetype": "doc", "count": 1000}).toThrow("Language is different from avaliable on the site"));
  expect(() => utils.calculatePrice({"language": "pl", "mimetype": "rtf", "count": 1000}).toThrow("Language is different from avaliable on the site"));
  expect(() => utils.calculatePrice({"language": "fr", "mimetype": "pdf", "count": 1000}).toThrow("Language is different from avaliable on the site"));
})

test("Calculating price for english text for random symbol count", () => {
  expect(utils.calculatePrice({"language": "en", "mimetype": "docx", "count": 10000})).toBeCloseTo(1200);
  expect(utils.calculatePrice({"language": "en", "mimetype": "pdf", "count": 356889})).toBeCloseTo(51392.016);
  expect(utils.calculatePrice({"language": "en", "mimetype": "pdf", "count": 865})).toBeCloseTo(144);
  expect(utils.calculatePrice({"language": "en", "mimetype": "pdf", "count": 1332})).toBeCloseTo(191.81);
})
