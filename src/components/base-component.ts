
  // component Base Class
  // abstract class - cannot be instantiated
  // class responsible for rendering sth and attaching it to the DOM
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    // where we render
    hostElement: T;
    // what we render
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

      // document fragment - a lightweight version of the document
      // must be imported to the document
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      //form element
      this.element = importedNode.firstElementChild as U;
      if (newElementId) this.element.id = newElementId;

      this.attach(insertAtStart);
    }
    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? "afterbegin" : "beforeend",
        this.element
      );
    }
    // forcing classes inheriting to have these methods
    // you cannot have private abstract methods
    abstract configure(): void;
    abstract renderContent(): void;
  }

