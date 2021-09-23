// await page.pdf({ path: "page.pdf" });

describe("Employees tests", () => {
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
    // Go to new employee form and fill out then submit
    await expect(page).toClick("button", { text: "New Employee +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/employees/new");
    await expect(page).toFillForm("form", {
      fname: "new employee",
      lname: "test",
    });
    await page.focus("[type='submit']");
    page.keyboard.press("Enter");
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
    await page.focus("[type='submit']");
    page.keyboard.press("Enter");
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
    await page.focus("[type='submit']");
    page.keyboard.press("Enter");
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

  it("Create a new employee then deletes them", async () => {
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
    await page.focus("[type='submit']");
    page.keyboard.press("Enter");
    await page.waitForResponse("http://localhost:3000/employees.json");
    // Wait for table to render then compare length to previous
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    const newTbodyLength = await page.$eval(
      "table tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
    // Find and click delete button for the new employee
    const deleteId = await page.$eval(
      `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(2)`,
      (t) => t.textContent
    );
    await expect(page).toClick(
      `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(5) > button`,
      { text: "Delete" }
    );
    await page.waitForResponse(
      `http://localhost:3000/employees/${deleteId}.json`
    );
    // Check that the employee has been deleted
    const deletedTbodyLength = await page.$eval(
      "table tbody",
      (t) => t.rows.length
    );
    expect(deletedTbodyLength).toEqual(tbodyLength);
  });

  it("Creates a new employee with emergency contacts and checks they carry over to the edit form", async () => {
    await page.goto("http://localhost:3000/?tab=1");
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("table");
    const tbodyLength = await page.$eval("table tbody", (t) => t.rows.length);
    await expect(page).toClick("button", { text: "New Employee +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/employees/new");
    await expect(page).toFillForm("form", {
      fname: "Contacts",
      lname: "Test",
    });
    await expect(page).toClick("button", { text: "New Emergency Contact +" });
    await expect(page).toFillForm("form", {
      "emergency_contacts_attributes[0].fname": "ICE fname",
      "emergency_contacts_attributes[0].lname": "ICE lname",
      "emergency_contacts_attributes[0].number": "123",
    });
    await page.focus("[type='submit']");
    page.keyboard.press("Enter");
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    const newTbodyLength = await page.$eval(
      "table tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
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
    await expect(page.url()).toEqual(
      `http://localhost:3000/employees/${editId}/edit`
    );
    const input1 = await page.$eval(
      "form > div:nth-child(11) > div > div:nth-child(1) > div > div > input",
      (i) => i.value
    );
    const input2 = await page.$eval(
      "form > div:nth-child(11) > div > div:nth-child(2) > div > div > input",
      (i) => i.value
    );
    const input3 = await page.$eval(
      "form > div:nth-child(11) > div > div:nth-child(3) > div > div > input",
      (i) => i.value
    );

    expect(input1).toEqual("ICE fname");
    expect(input2).toEqual("ICE lname");
    expect(input3).toEqual("123");
  });

  it("Creates a new employee with emergency contacts then changes them in the edit form", async () => {
    await page.goto("http://localhost:3000/?tab=1");
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("table");
    const tbodyLength = await page.$eval("table tbody", (t) => t.rows.length);
    await expect(page).toClick("button", { text: "New Employee +" });
    await page.waitForSelector("form");
    await expect(page.url()).toEqual("http://localhost:3000/employees/new");
    await expect(page).toFillForm("form", {
      fname: "Contacts Edit",
      lname: "Test",
    });
    await expect(page).toClick("button", { text: "New Emergency Contact +" });
    await expect(page).toFillForm("form", {
      "emergency_contacts_attributes[0].fname": "ICE fname",
      "emergency_contacts_attributes[0].lname": "ICE lname",
      "emergency_contacts_attributes[0].number": "123",
    });
    await page.focus("[type='submit']");
    page.keyboard.press("Enter");
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    const newTbodyLength = await page.$eval(
      "table tbody",
      (t) => t.rows.length
    );
    expect(newTbodyLength).toEqual(tbodyLength + 1);
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
    await expect(page.url()).toEqual(
      `http://localhost:3000/employees/${editId}/edit`
    );
    await expect(page).toFillForm("form", {
      "emergency_contacts_attributes[0].fname": "edited fname",
      "emergency_contacts_attributes[0].lname": "edited lname",
      "emergency_contacts_attributes[0].number": "456",
    });
    await page.focus("[type='submit']");
    page.keyboard.press("Enter");
    await page.waitForResponse(
      `http://localhost:3000/employees/${editId}.json`
    );
    await page.waitForSelector("table");
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
    await expect(page).toClick(
      `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(5) > a > button`,
      { text: "Edit" }
    );
    await page.waitForResponse("http://localhost:3000/employees.json");
    await page.waitForSelector("form");
    await expect(page.url()).toEqual(
      `http://localhost:3000/employees/${editId}/edit`
    );
    const input1 = await page.$eval(
      "form > div:nth-child(11) > div > div:nth-child(1) > div > div > input",
      (i) => i.value
    );
    const input2 = await page.$eval(
      "form > div:nth-child(11) > div > div:nth-child(2) > div > div > input",
      (i) => i.value
    );
    const input3 = await page.$eval(
      "form > div:nth-child(11) > div > div:nth-child(3) > div > div > input",
      (i) => i.value
    );

    expect(input1).toEqual("edited fname");
    expect(input2).toEqual("edited lname");
    expect(input3).toEqual("456");
  });

  // it("Creates a new employee with emergency contacts then removes them in the edit form", async () => {
  //   await page.goto("http://localhost:3000/?tab=1");
  //   await page.waitForResponse("http://localhost:3000/employees.json");
  //   await page.waitForSelector("table");
  //   const tbodyLength = await page.$eval("table tbody", (t) => t.rows.length);
  //   await expect(page).toClick("button", { text: "New Employee +" });
  //   await page.waitForSelector("form");
  //   await expect(page.url()).toEqual("http://localhost:3000/employees/new");
  //   await expect(page).toFillForm("form", {
  //     fname: "Contacts Apprentice",
  //     lname: "Test",
  //   });
  //   await expect(page).toClick("button", { text: "New Emergency Contact +" });
  //   await expect(page).toFillForm("form", {
  //     "emergency_contacts_attributes[0].fname": "ICE fname",
  //     "emergency_contacts_attributes[0].lname": "ICE lname",
  //     "emergency_contacts_attributes[0].number": "123",
  //   });
  //   await page.focus("[type='submit']");
  //   page.keyboard.press("Enter");
  //   await page.waitForResponse("http://localhost:3000/employees.json");
  //   await page.waitForSelector("table");
  //   await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
  //   const newTbodyLength = await page.$eval(
  //     "table tbody",
  //     (t) => t.rows.length
  //   );
  //   expect(newTbodyLength).toEqual(tbodyLength + 1);
  //   const editId = await page.$eval(
  //     `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(2)`,
  //     (t) => t.textContent
  //   );
  //   await expect(page).toClick(
  //     `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(5) > a > button`,
  //     { text: "Edit" }
  //   );
  //   await page.waitForResponse("http://localhost:3000/employees.json");
  //   await page.waitForSelector("form");
  //   await expect(page.url()).toEqual(
  //     `http://localhost:3000/employees/${editId}/edit`
  //   );
  //   await expect(page).toClick(
  //     "form > div:nth-child(11) > div > div:nth-child(5) > button",
  //     { text: "Remove" }
  //   );
  //   await page.focus("[type='submit']");
  //   await page.keyboard.press("Enter");
  //   const res = await page.waitForResponse(
  //     `http://localhost:3000/employees/${editId}.json`
  //   );
  //   await page.waitForSelector("table");
  //   await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
  // expect(res).toEqual(0);
  // const iceForm = page.$$eval(
  //   "form > div:nth-child(11) > div > div:nth-child(1) > div > div > input"
  // );
  // await expect(page).toClick(
  //   `table > tbody > tr:nth-child(${newTbodyLength}) > td:nth-child(5) > a > button`,
  //   { text: "Edit" }
  // );
  // await page.waitForResponse("http://localhost:3000/employees.json");
  // await page.waitForSelector("form");
  // await expect(page.url()).toEqual(
  //   `http://localhost:3000/employees/${editId}/edit`
  // );
  // });
});
