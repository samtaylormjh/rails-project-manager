describe("Employees test", () => {
  it("Checks that new employee button routes to new", async () => {
    await page.goto("http://localhost:3000/employees/new")
    await expect(page).toClick("button", { text: "New Employee +" })
    await expect(page.url().toEqual("http://localhost:3000/employees/new"))
    await page.waitForSelector("a")
    const aText = await page.$eval("a", (e) => e.textContent)
    expect(aText).toContain("Employees")
  })
})
