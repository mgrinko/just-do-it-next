import { Main } from './pages/main.page';
import { PageHolder } from './abstractClass';

export class Application extends PageHolder {
  public main: Main = new Main(this.page);
}

