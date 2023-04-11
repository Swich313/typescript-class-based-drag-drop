import {Project, ProjectStatus} from "../models/project";

//Project State Management
    type Listener<T> = (items: T[]) => void;

     class State<T> {
        protected listeners: Listener<T>[] = [];

        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }

    export class ProjectState extends State<Project>{
        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
            super();
        }

        static getInstance() {
            if(this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }



        addProject(title: string, description: string, people: number) {
            const newProject = new Project(uuidv4(), title, description, people, ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus){
            const project = this.projects.find(item => item.id === projectId);
            if(project && project.status !== newStatus){
                project.status = newStatus;
                this.updateListeners();
            }
        }

        private updateListeners() {
            for (const listenerFn of this.listeners){
                listenerFn(this.projects.slice());
            }
        }
    }

    export const projectState = ProjectState.getInstance();

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'. replace(/[xy]/g, function(c) {
            var r = Math. random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v. toString(16);
        });
    }


