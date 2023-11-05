import { baseFixture } from '../fixtures/index';

baseFixture('@completedTab @ID5 Check TODO un-completion from completed tab', async ({app}) => {
  await app.main.open();
  await app.main.addTask('Test task');
  await app.main.checkToDoCounter('1');
  await app.main.checkTaskExistence('Test task');
  await app.main.checkTodoStatus('Test task', false);
  await app.main.changeTaskStatus('Test task');
  await app.main.checkToDoCounter('0');
  await app.main.openTabByName('Completed');
  await app.main.checkTaskExistence('Test task');
  await app.main.checkTodoStatus('Test task', true);
  await app.main.changeTaskStatus('Test task');
  await app.main.checkTaskExistence('Test task', false);
  await app.main.checkToDoCounter('1');
});

baseFixture('@completedTab @ID6 Check ALL TODO completion from active tab', async ({app}) => {
  await app.main.open();
  await app.main.addTask('First task');
  await app.main.addTask('Second task');
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
  await app.main.toggleAll();
  await app.main.checkToDoCounter('2');
  await app.main.openTabByName('Active');
  await app.main.checkTodoStatus('First task', false);
  await app.main.checkTodoStatus('Second task', false);
});

baseFixture('@completedTab @ID10 Check of deleting TODOs in active status on Completed tab', async ({app}) => {
  await app.main.open();
  await app.main.addTask('First task');
  await app.main.checkTaskExistence('First task', true);
  await app.main.changeTaskStatus('First task');
  await app.main.openTabByName('Completed');
  await app.main.checkTaskExistence('First task');
  await app.main.deleteTask('First task');
  await app.main.checkTaskExistence('First task', false);
});
