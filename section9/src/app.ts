// Drag & Drop
interface Draggable {
  dragStarHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

// Project type
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public manday: number,
    public status: ProjectStatus
  ) {}
}

// Project state manegement
//これは単に型のalias別名として使いたいから
type Listener<T> = (items: T[]) => void;

class State<T> {
  //関数の配列
  //状態の変更があった場合は必ずリスナー関数が呼ばれるようにする
  //継承先のクラスからはアクセスできる
  protected lisners: Listener<T>[] = [];

  addListener(lisnerFn: Listener<T>) {
    this.lisners.push(lisnerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, manday: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(prjId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === prjId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    //projectsにpushされたときにすべてのリスナー関数を呼び出す
    for (const lisnerFn of this.lisners) {
      //配列のコピーを渡す
      //オリジナルの配列を渡すとクラスの外側から要素を追加できてしまう？privateにしているからできないのでは・。。。？
      //projectState.addListenerを呼ぶ
      //lisner側で配列を変更できないようにする
      //addListenerを呼ぶ
      lisnerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

interface ValidatorConfig {
  //index型の復習
  //このプロパティの正確な名前は分からない、いくつのプロパティがあるかも分からに事を示す
  //[prop: string]⇛class名
  //値はオブジェクト
  // [prop: string]: {
  //   [validatebleProp: string]: string[];
  // };
  value: string | number;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
}

function validate(validateInput: ValidatorConfig) {
  let isValid = true;
  if (validateInput.required) {
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  }

  if (validateInput.minlength && typeof validateInput.value === 'string') {
    isValid = isValid && validateInput.value.length >= validateInput.minlength;
  }

  if (validateInput.maxlength && typeof validateInput.value === 'string') {
    isValid = isValid && validateInput.value.length <= validateInput.maxlength;
  }

  if (validateInput.min && typeof validateInput.value === 'number') {
    isValid = isValid && validateInput.value >= validateInput.min;
  }

  if (validateInput.max && typeof validateInput.value === 'number') {
    isValid = isValid && validateInput.value <= validateInput.max;
  }

  return isValid;
}

// const registeredValidators: ValidatorConfig = {};

// // require decorator
// function Require(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = { [propName]: ["require"] };
// }

// // positiveNumber decorator
// function PositiveNumber(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = { [propName]: ["positive"] };
// }

// // Validation
// function validate(object: any) {
//   const objValidatorConfig = registeredValidators[object.constructor.name];
//   if (!objValidatorConfig) {
//     return true;
//   }
//   for (const prop in objValidatorConfig) {
//     for (const value of objValidatorConfig[prop]) {
//       switch (value) {
//         case "require":
//           return !!object[prop];
//         case "positive":
//           return object[prop] > 0;
//       }
//     }
//   }
//   return true;
// }

// autobind decorator
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustDescriptor;
}

// Component Class
//抽象化しインスタンス化できないようにする
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  abstract configure(): void;
  abstract renderContent(): void;

  private attach(insertAtBegining: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBegining ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

// ProjectItem Class
class ProjectItem
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

//ProjectのList(外枠)を表示するClass
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assinedProject: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    //これらをベースクラスから呼ぶと継承先のメソッドを呼ぶことになる、ベースクラスのconstructorの処理が終わったあとに何かしている可能性があるのでこのようにしたほうが安全
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      //dropの許可
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @AutoBind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assinedProject = relevantProjects;
      this.renderProject();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
  }

  private renderProject() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    //let num: number = 0;
    for (const prjItem of this.assinedProject) {
      new ProjectItem(listEl.id, prjItem);
      // const listItem = document.createElement('li');
      // listItem.textContent = prjItem.title;
      // listEl.appendChild(listItem);
      //num++;
    }
  }
}

// ProjectInput Class
//formの表示と入力値の取得を行うclass
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector(
      '#manday'
    ) as HTMLInputElement;

    this.configure();
  }

  //３つのform全てにアクセスして入力値を取得する
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;

    const titleValidationConfig: ValidatorConfig = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidationConfig: ValidatorConfig = {
      value: enteredDescription,
      required: true,
      minlength: 5,
    };
    const mandayValidationConfig: ValidatorConfig = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if (
      !validate(titleValidationConfig) ||
      !validate(descriptionValidationConfig) ||
      !validate(mandayValidationConfig)
    ) {
      alert('入力値が正しくありません。');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
    //this.element.addEventListener("submit", this.submitHandler.bind(this)); //このthisがProjectInputのオブジェクトを参照するという意味
  }

  renderContent() {}

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.mandayInputElement.value = '';
  }

  @AutoBind
  private submitHandler(event: Event) {
    //formからhttpリスクエストが送られないようにする
    event.preventDefault();
    const userInput = this.gatherUserInput();
    //taple型かチェックする
    //tapleは単なる配列
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday);
      this.clearInput();
    }
  }
}

//Listの中のProject(内容)を表示するClass
//class ProjectListDetail extends ProjectInput {}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
