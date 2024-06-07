// autobind decorator
// naming: hint that the parameter is not used
function autobind(_: any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // typecasting
    this.templateElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // document fragment - a lightweight version of the document
    // must be imported to the document
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    //form element
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    //choosing the input elements
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }
  // private method - only accessible within the class
  @autobind
  private submitHandler(event: Event) {
      event.preventDefault();
      console.log(this.titleInputElement.value);
  }

  private configure() {
    // binding the this keyword to the submitHandler method
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
