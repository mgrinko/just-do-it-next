import { expect, Locator } from "@playwright/test";
import { AppPage } from '../abstractClass';

export class Main extends AppPage {
  public pagePath: string = '/';

  private exampleLocator: Locator = this.page.locator('');

  async expectLoaded() {
    await expect(this.exampleLocator, 'Expected SignUp page to be opened').toBeVisible();
  }
}
