import { baseFixture } from '../fixtures/index';

baseFixture('@activeTab @ID4 Check TODO completion from active tab', async ({app}) => {
  await app.main.open();
  await app.main.addTask('Test task');
  await app.main.openTabByName('Active');
  await app.main.checkToDoCounter('1');
  await app.main.checkTaskExistence('Test task');
  await app.main.checkTodoStatus('Test task', false);
  await app.main.changeTaskStatus('Test task');
  await app.main.openTabByName('Completed');
  await app.main.checkTaskExistence('Test task');
  await app.main.checkTodoStatus('Test task', true);
});

baseFixture('@activeTab @ID6 Check ALL TODO completion from active tab', async ({app}) => {
  await app.main.open();
  await app.main.addTask('First task');
  await app.main.addTask('Second task');
  await app.main.openTabByName('Active');
  await app.main.checkToDoCounter('2');
  await app.main.checkTaskExistence('First task');
  await app.main.checkTaskExistence('Second task');
  await app.main.checkTodoStatus('First task', false);
  await app.main.checkTodoStatus('Second task', false);
  await app.main.toggleAll();
  await app.main.checkToDoCounter('0');
  await app.main.openTabByName('Completed');
  await app.main.checkTaskExistence('First task');
  await app.main.checkTaskExistence('Second task');
  await app.main.checkTodoStatus('First task', true);
  await app.main.checkTodoStatus('Second task', true);
});

baseFixture('@activeTab @ID9 Check of deleting TODOs in active status on Active tab', async ({app}) => {
  await app.main.open();
  await app.main.addTask('First task');
  await app.main.openTabByName('Active');
  await app.main.checkTaskExistence('First task', true);
  await app.main.deleteTask('First task');
  await app.main.checkTaskExistence('First task', false);
});

baseFixture('@activeTab @ID14 Check counter on Deleting TODOs on All tab', async ({app}) => {
  await app.main.open();
  await app.main.addTask('First task');
  await app.main.addTask('Second task');
  await app.main.addTask('Third task');
  await app.main.openTabByName('Active');
  await app.main.checkToDoCounter('3');
  await app.main.deleteTask('First task');
  await app.main.checkToDoCounter('2');
  await app.main.deleteTask('Second task');
  await app.main.checkToDoCounter('1');
  await app.main.deleteTask('Third task');
  await app.main.checkToDoCounter('not visible');
});