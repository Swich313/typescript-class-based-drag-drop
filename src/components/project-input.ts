import {validate} from 'class-validator';

import {Component} from "./base-component";
// import {validate, Validatable} from "../util/validation.js";
import * as Validation from "../util/validation"                 //using grouping and alias import
import {Autobind} from "../decorators/auto-bind";
import {projectState} from "../state/project-state";
import {InputDto} from '../models/inputDto';
import {InputData} from '../models/inputData';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{


        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');

            this.titleInputElement = this.element.querySelector('#title')as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description')as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people')as HTMLInputElement;

            this.configure();
            // this.attach();
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler)
        }

        renderContent() {}

        private collectUserInput(): [string, string, number] | void{
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable: Validation.Validatable = {                  //using grouping and alias import
                value: enteredTitle,
                required: true,
                minLength: 5
            }
            const descriptionValidatable: Validation.Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5

            }
            const peopleValidatable: Validation.Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            }

            if(
                !Validation.validate(titleValidatable) ||                       //using grouping and alias import
                !Validation.validate(descriptionValidatable) ||                 //using grouping and alias import
                !Validation.validate(peopleValidatable)                         //using grouping and alias import
            ) {
                alert('Invalid input, please try again!');
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }


        //for class-validator validation
        private collectUserInputAndValidateWithClassValidator(): Promise<void | [string, string, number]> {
            const title = this.titleInputElement.value;
            const description = this.descriptionInputElement.value;
            const people = this.peopleInputElement.value;

            const inputDto = new InputDto(title, description, +people);

            return validate(inputDto).then(errors => {
                if(errors.length > 0){
                    const errorArray = errors.map(error => {
                        return `Invalid field: ${error.property} - ${Object.values(error.constraints!)}`
                    });
                    alert(errorArray.join('\n'));
                    return
                } else {
                    return inputDto.returnInputDtoAsArray();
                }

            });
        }

        private clearInputs(){
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }

        @Autobind
        private async submitHandler(event: Event) {
            event.preventDefault();
            // const userInput = this.collectUserInput();
            const userInput = await this.collectUserInputAndValidateWithClassValidator()
            if(Array.isArray(userInput)){
                const [title, description, people] = userInput;
                projectState.addProject(title, description, people);
                this.clearInputs();
            }
        }
    }
