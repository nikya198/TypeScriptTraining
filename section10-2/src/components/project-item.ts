import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import Component from './base-component';
import { AutoBind } from '../decorators/autobind';

// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private projectItemDetail: Project;

  get manday() {
    if (this.projectItemDetail.manday < 20) {
      return this.projectItemDetail.manday.toString() + '人日';
    } else {
      return (this.projectItemDetail.manday / 20).toString() + '人月';
    }
  }

  constructor(hostId: string, projectItemDetail: Project) {
    super('single-project', hostId, false, projectItemDetail.id);
    this.projectItemDetail = projectItemDetail;

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStarHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.projectItemDetail.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent): void {
    console.log('Drag終了');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStarHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent =
      this.projectItemDetail.title;
    this.element.querySelector('h3')!.textContent = this.manday;
    this.element.querySelector('p')!.textContent =
      this.projectItemDetail.description;
  }
}
