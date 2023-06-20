import cmp from './base-component';
import * as Validation from '../util/validation';
import { AutoBind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// ProjectInput Class
//formの表示と入力値の取得を行うclass
export class ProjectInput extends cmp<HTMLDivElement, HTMLFormElement> {
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

    const titleValidationConfig: Validation.ValidatorConfig = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidationConfig: Validation.ValidatorConfig = {
      value: enteredDescription,
      required: true,
      minlength: 5,
    };
    const mandayValidationConfig: Validation.ValidatorConfig = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if (
      !Validation.validate(titleValidationConfig) ||
      !Validation.validate(descriptionValidationConfig) ||
      !Validation.validate(mandayValidationConfig)
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
