// makes a pdf of the page
// await page.pdf({ path: "page.pdf" });

describe("Employees test", () => {
  beforeEach(async () => {
    // page.on("console", (consoleObj) => console.log(consoleObj.text()));
  });

  // EMPLOYEE TESTS

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
    // Go to new employee form and fill out then submit
    await expect(page).toClick("button", { text: "New Employee +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/employees/new");
    await expect(page).toFillForm("form", {
      fname: "new employee",
      lname: "test",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse("http://localhost:3000/employees.json");
    // Wait for table to render then compare length to previous
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    const newTbodyLength = await page.$eval(
      "table tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
  });

  it("Creates and edits a new employee", async () => {
    // Load home page and get the initial length of employees table
    await page.goto("http://localhost:3000/?tab=1");
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("table");
    const tbodyLength = await page.$eval("table tbody", (t) => t.rows.length);
    // Go to new employee form, fill out then submit
    await expect(page).toClick("button", { text: "New Employee +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/employees/new");
    await expect(page).toFillForm("form", {
      fname: "edit employee",
      lname: "test",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse("http://localhost:3000/employees.json");
    // Wait for table to render then compare length to previous
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    const newTbodyLength = await page.$eval(
      "table tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
    // Find edit button for the new employee
    const editId = await page.$eval(
      `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(2)`,
      (t) => t.textContent
    );
    await expect(page).toClick(
      `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(5) > a > button`,
      { text: "Edit" }
    );
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("form");
    // Check test has clicked on the correct edit button then fill in form and submit
    await expect(page.url()).toEqual(
      `http://localhost:3000/employees/${editId}/edit`
    );
    await expect(page).toFillForm("form", {
      fname: "edit employee 1",
      lname: "test 1",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse(
      `http://localhost:3000/employees/${editId}.json`
    );
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    //Declare variables for checking the edit was completed
    const firstNameColumn = await page.$eval(
      `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(3)`,
      (t) => t.textContent
    );
    const lastNameColumn = await page.$eval(
      `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(4)`,
      (t) => t.textContent
    );
    expect(firstNameColumn).toEqual("edit employee 1");
    expect(lastNameColumn).toEqual("test 1");
  });

  // PROJECT TESTS
});
