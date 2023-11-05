import { expect, Locator } from "@playwright/test";
import { AppPage } from '../abstractClass';

export class Main extends AppPage {
  public pagePath: string = '/';

  private pageHeader: Locator = this.page.locator('.title');
  private todoInput: Locator = this.page.getByTestId('NewTaskField');
  private toggleAllButton: Locator = this.page.getByTestId('ToggleAllButton');
  private clearCompletedButton: Locator = this.page.getByTestId('ClearCompletedButton');
  private taskCounter: Locator = this.page.getByTestId('TasksCounter');
  private taskItem: Locator = this.page.getByTestId('Task');
  private filterAll: Locator = this.page.getByTestId('FilterLinkAll');
  private filterActive: Locator = this.page.getByTestId('FilterLinkActive');
  private filterCompleted: Locator = this.page.getByTestId('FilterLinkCompleted');
  private deleteButtonSelector: string = '.task__remove';

  async expectLoaded() {
    expect(await this.pageHeader.textContent(), 'Expected Main page to be opened').toContain('Just Do It!');
  }

  async addTask(content: string) {
    await this.todoInput.focus();
    await this.todoInput.fill(content);
    await this.todoInput.press('Enter');
  }

  async deleteTask(content: string) {
    await this.taskItem.filter({hasText: content}).locator(this.deleteButtonSelector).click();
  }

  async checkToDoCounter(content: string) {
    if (content === 'not visible') {
      await expect(this.taskCounter).not.toBeVisible();
      return;
    }
    await expect(this.taskCounter).toHaveText(`${content} items left`);
  }

  async toggleAll() {
    await this.toggleAllButton.click();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  async changeTaskStatus(content: string, index: number = 0) {
    await this.taskItem.filter({hasText: content}).nth(index).locator('label').click();
  }

  async checkTodoStatus(content: string, isCompleted: boolean, index: number = 0) {
    const locator: Locator = this.taskItem.filter({hasText: content}).nth(index);
    if (isCompleted) {
      await expect(locator).toHaveClass(/task completed/);
    } else {
      await expect(locator).not.toHaveClass(/task completed/);
    }
  }

  async checkTaskExistence(content: string, isExist: boolean = true) {
    const locator: Locator = this.taskItem.filter({hasText: content});
    if (isExist) {
      await expect(locator).toBeVisible();
    } else {
      await expect(locator).not.toBeVisible();
    }
  }

  async openTabByName(name: 'All'| 'Active' | 'Completed') {
    switch (name) {
      case 'All':
        await this.filterAll.click();
        break;
      case 'Active':
        await this.filterActive.click();
        break;
      case 'Completed':
        await this.filterCompleted.click();
        break;
      default:
        throw new Error(`Unknown tab name: ${name}`);
    }
  }
}
