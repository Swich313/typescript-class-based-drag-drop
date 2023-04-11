import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";
var App;
(function (App) {
    const projectFrom = new ProjectInput();
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
})(App || (App = {}));
