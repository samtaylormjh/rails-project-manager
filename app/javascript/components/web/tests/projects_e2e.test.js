// makes a pdf of the page
// await page.pdf({ path: "page.pdf" });

describe("Projects tests", () => {
  beforeEach(async () => {
    // page.on("console", (consoleObj) => console.log(consoleObj.text()));
  });

  it("Checks that the new project button routes to projects/new", async () => {
    await page.goto("http://localhost:3000/?tab=2");
    await page.waitForSelector("button");
    await expect(page).toClick("button", { text: "New Project +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/projects/new");
    await page.waitForSelector("h3");
    const headerText = await page.$eval("h3", (e) => e.textContent);
    expect(headerText).toContain("Project");
  });

  it("Fills out and submits the new Project form", async () => {
    // Load home page and get the initial length of employees table
    await page.goto("http://localhost:3000/?tab=2");
    await page.waitForResponse("http://localhost:3000/projects.json");
    await page.waitForSelector("table");
    const tbodyLength = await page.$eval(
      "div.tab-pane.active > div > div > table > tbody",
      (t) => t.rows.length
    );
    // Go to new project form and fill out then submit
    await expect(page).toClick("button", { text: "New Project +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/projects/new");
    await expect(page).toFillForm("form", {
      name: "New Project",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse("http://localhost:3000/projects.json");
    // Wait for table to render then compare length to previous
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=2");
    const newTbodyLength = await page.$eval(
      "div.tab-pane.active > div > div > table > tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
  });

  it("Creates and edits a new project", async () => {
    // Load home page and get the initial length of projects table
    await page.goto("http://localhost:3000/?tab=2");
    await page.waitForResponse("http://localhost:3000/projects.json");
    await page.waitForSelector("table");
    const tbodyLength = await page.$eval(
      "div.tab-pane.active > div > div > table > tbody",
      (t) => t.rows.length
    );
    // Go to new project form, fill out then submit
    await expect(page).toClick("button", { text: "New Project +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/projects/new");
    await expect(page).toFillForm("form", {
      name: "Edit Project Test",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse("http://localhost:3000/projects.json");
    // Wait for table to render then compare length to previous
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=2");
    const newTbodyLength = await page.$eval(
      "div.tab-pane.active > div > div > table > tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
    // Find edit button for the new project
    const editId = await page.$eval(
      `div.tab-pane.active > div > div > table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(3)`,
      (t) => t.textContent
    );
    await expect(page).toClick(
      `div.tab-pane.active > div > div > table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(5) > a > button`,
      { text: "Edit" }
    );
    await page.waitForResponse("http://localhost:3000/projects.json");
    await page.waitForSelector("form");
    // Check test has clicked on the correct edit button then fill in form and submit
    await expect(page.url()).toEqual(
      `http://localhost:3000/projects/${editId}/edit`
    );
    await expect(page).toFillForm("form", {
      name: "Edit Project Test 1",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse(`http://localhost:3000/projects/${editId}.json`);
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=2");
    //Declare variables for checking the edit was completed
    const nameColumn = await page.$eval(
      `div.tab-pane.active > div > div > table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(1)`,
      (t) => t.textContent
    );

    expect(nameColumn).toEqual("Edit Project Test 1");
  });

  it("Create a new employee then deletes them", async () => {
    // Load home page and get the initial length of employees table
    await page.goto("http://localhost:3000/?tab=2");
    await page.waitForResponse("http://localhost:3000/projects.json");
    await page.waitForSelector("table");
    const tbodyLength = await page.$eval(
      "div.tab-pane.active > div > div > table > tbody",
      (t) => t.rows.length
    );
    // Go to new project form and fill out then submit
    await expect(page).toClick("button", { text: "New Project +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/projects/new");
    await expect(page).toFillForm("form", {
      name: "Delete project test",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await page.waitForResponse("http://localhost:3000/projects.json");
    // Wait for table to render then compare length to previous
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=2");
    const newTbodyLength = await page.$eval(
      "div.tab-pane.active > div > div > table > tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
    // Find and click delete button for the new project
    const deleteId = await page.$eval(
      `div.tab-pane.active > div > div > table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(3)`,
      (t) => t.textContent
    );
    await expect(page).toClick(
      `div.tab-pane.active > div > div > table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(5) > button`,
      { text: "Delete" }
    );
    await page.waitForResponse(
      `http://localhost:3000/projects/${deleteId}.json`
    );
    // Check that the project has been deleted
    const deletedTbodyLength = await page.$eval(
      "div.tab-pane.active > div > div > table > tbody",
      (t) => t.rows.length
    );
    expect(deletedTbodyLength).toEqual(tbodyLength);
  });
});
