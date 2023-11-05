import { baseFixture } from '../fixtures/index';

baseFixture('@allTab @ID1 Check adding new TODO', async ({app}) => {
  await app.main.open();
  await app.main.addTask('Test');
  await app.main.checkToDoCounter('1');
  await app.main.checkTaskExistence('Test');
  await app.main.checkTodoStatus('Test', false);
});

baseFixture('@allTab @ID2 Check completing 2 TODO by "Complete all" button', async ({app}) => {
  await app.main.open();
  await app.main.addTask('First task');
  await app.main.addTask('Second task');
  await app.main.checkToDoCounter('2');
  await app.main.checkTodoStatus('First task', false);
  await app.main.checkTodoStatus('Second task', false);
  await app.main.toggleAll();
  await app.main.checkTodoStatus('First task', true);
  await app.main.checkTodoStatus('Second task', true);
});

baseFixture('@allTab @ID3 Check un-completing 2 TODO by "Complete all" button', async ({app}) => {
  await app.main.open();
  await app.main.addTask('First task');
  await app.main.addTask('Second task');
  await app.main.checkToDoCounter('2');
  await app.main.checkTodoStatus('First task', false);
  await app.main.checkTodoStatus('Second task', false);
  await app.main.toggleAll();
  await app.main.checkTodoStatus('First task', true);
  await app.main.checkTodoStatus('Second task', true);
  await app.main.toggleAll();
  await app.main.checkTodoStatus('First task', false);
  await app.main.checkTodoStatus('Second task', false);
});

baseFixture('@allTab @ID12 Check counter adding TODOs at All tab', async ({app}) => {
  await app.main.open();
  await app.main.checkToDoCounter('not visible');
  await app.main.addTask('First task');
  await app.main.checkToDoCounter('1');
  await app.main.addTask('Second task');
  await app.main.checkToDoCounter('2');
  await app.main.addTask('Third task');
  await app.main.checkToDoCounter('3');
});

baseFixture('@allTab @ID12 Check counter after removing TODOs at All tab', async ({app}) => {
  await app.main.open();
  await app.main.checkToDoCounter('not visible');
  await app.main.addTask('First task');
  await app.main.checkToDoCounter('1');
  await app.main.addTask('Second task');
  await app.main.checkToDoCounter('2');
  await app.main.deleteTask('First task');
  await app.main.checkToDoCounter('1');
  await app.main.deleteTask('Second task');
  await app.main.checkToDoCounter('not visible');
});

baseFixture('@allTab @ID7 Check of deleting TODOs in active status on All tab', async ({app}) => {
  await app.main.open();
  await app.main.checkTaskExistence('First task', false);
  await app.main.addTask('First task');
  await app.main.checkTaskExistence('First task', true);
  await app.main.deleteTask('First task');
  await app.main.checkTaskExistence('First task', false);
});

baseFixture('@allTab @ID8 Check of deleting TODOs in completed status on All tab', async ({app}) => {
  await app.main.open();
  await app.main.checkTaskExistence('First task', false);
  await app.main.addTask('First task');
  await app.main.changeTaskStatus('First task');
  await app.main.checkTaskExistence('First task', true);
  await app.main.deleteTask('First task');
  await app.main.checkTaskExistence('First task', false);
});
