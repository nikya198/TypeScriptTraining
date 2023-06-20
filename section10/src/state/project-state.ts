namespace App {
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

  export class ProjectState extends State<Project> {
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

    moveProject(prjId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === prjId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const lisnerFn of this.lisners) {
        lisnerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}
