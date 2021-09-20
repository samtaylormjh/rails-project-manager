// makes a pdf of the page
// await page.pdf({ path: "page.pdf" });

describe("Employees test", () => {
  beforeEach(async () => {
    // page.on("console", (consoleObj) => console.log(consoleObj.text()));
  });

  it("Checks that the new employee button routes to employees/new", async () => {
    await page.goto("http://localhost:3000/?tab=1");
    await page.waitForSelector("button");
    await expect(page).toClick("button", { text: "New Employee +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/employees/new");
    await page.waitForSelector("h3");
    const headerText = await page.$eval("h3", (e) => e.textContent);
    expect(headerText).toContain("Employee");
  });

  it("Fills out and submits the new Employee form", async () => {
    // Load home page and get the initial length of employees table
    await page.goto("http://localhost:3000/?tab=1");
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("table");
    const tbodyLength = await page.$eval("table tbody", (t) => t.rows.length);
    //Go to new employee form and fill out then submit
    await expect(page).toClick("button", { text: "New Employee +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/employees/new");
    await expect(page).toFillForm("form", {
      fname: "new employee",
      lname: "test",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse("http://localhost:3000/employees.json");
    //Wait for table to render then compare length to previous
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    const newTbodyLength = await page.$eval(
      "table tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
  });
});
