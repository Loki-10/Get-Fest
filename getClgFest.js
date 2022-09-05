const puppeteer = require('puppeteer');
const url = (deptName) => `http://www.knowafest.com/college-fests/fest-departments/${deptName}`;
const deptName = `CSE`;
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url(deptName), { waitUntil: 'networkidle0' });
  let data = await page.evaluate(() => {
    let Title = document.querySelector('td[itemprop="name"]').innerText;
    let end = Title.length-10;
    Title=Title.substr(0,end);
    let FestType = document.querySelector('td[class="optout"]').innerText;
    let Date = document.querySelector('td[itemprop="startDate"]').innerText;
    let College = document.querySelector('span[itemprop="name"]').innerText;
    let Location = document.querySelector('span[itemprop="address"]').innerText;
    return {
      Title,
      FestType,
      Date,
      College,
      Location
    }
  });
  console.log(data);
  await browser.close();
})();

