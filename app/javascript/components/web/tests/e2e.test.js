describe("Employees test", () => {
  beforeEach(async () => {
    // page.on("console", (consoleObj) => console.log(consoleObj.text()));
  });

  // it("Checks that new employee button routes to new", async () => {
  //   await page.goto("http://localhost:3000/?tab=1");
  //   await expect(page).toClick("button", { text: "New Employee +" });
  //   await expect(page.url()).toEqual("http://localhost:3000/employees/new");
  //   await page.waitForSelector("h3");
  //   const headerText = await page.$eval("h3", (e) => e.textContent);
  //   expect(headerText).toContain("Employee");
  // });

  it("Fills out the new Employee form", async () => {
    await page.goto("http://localhost:3000/employees/new");
    await page.waitForSelector("form");
    await expect(page).toFillForm("form", {
      fname: "First Name",
      lname: "Last Name",
    });
    await expect(page).toClick("button", { text: "Submit" });
    await expect(page.url()).toEqual("http://localhost:3000/?tab=1");
  });
});
