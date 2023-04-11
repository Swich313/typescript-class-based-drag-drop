import {ProjectInput} from "./components/project-input.js";
import {ProjectList} from "./components/project-list.js";

namespace App {
    const projectFrom = new ProjectInput();
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
}