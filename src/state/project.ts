namespace App {
  // Project Type
  // creating class in order to be able to instantiate it

  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  // Project State Management class
  // Singleton Pattern - only one instance of the class is created

  export class ProjectState extends State<Project> {
    //listener functions array
    protected listeners: Listener<Project>[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }
    // static means that the method is accessible without an instance of the class
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addListener(listenerFn: Listener<Project>) {
      this.listeners.push(listenerFn);
    }
    // every time the addProject method is called, the listener functions are executed

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status != newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }
  // initialize the ProjectState
  export const projectState = ProjectState.getInstance();
}
