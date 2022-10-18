/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today =new Date().toLocaleDateString("en-CA");
describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "bring eggs",
      dueDate: today,
      completed: true,
    });
  });
  test("Add task", () => {
    let lengthBefore = all.length;
    add({
      title: "take a run",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("Mark task as complete", () => {
    all[0].completed = false;
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due tasks", () => {
    const overdueItems=overdue();
    var completion_date = new Date();
    completion_date.setDate(completion_date.getDate() - 1);
    let yesterday=completion_date.toLocaleDateString("en-CA");
    add({
      title: "do homework",
      dueDate: yesterday,
      completed: false,
    });
    expect(overdue().length).toBe(overdueItems.length +1);

  });
  test("Due today tasks", () => {
    const today_Items=dueToday();
    add({
      title: "do cooking",
      dueDate: today,
      completed: false,
    });
    expect(dueToday().length).toBe(today_Items.length +1);

  });
  test("Due later tasks", () => {
    const duelaterItems=dueLater();
    var later_date=new Date();
    later_date.setDate(later_date.getDate() + 1);
    let tomorrow=later_date.toLocaleDateString("en-CA");
    add({
      title: "Pay current bill",
      dueDate: tomorrow,
      completed: false,
    });
    expect(dueLater().length).toBe(duelaterItems.length +1);
  });
});