{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };


    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };


    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };


    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };


    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };


    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="tasks_item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""} js-tasks">
            <button class="tasks__button tasks__button--toggleDone js-done">${task.done ? "✓" : ""}
            </button>
            <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">🗑</button></li>
            ` ;

        const tasksElement  =  document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML ="";
            return;
        }

        buttonsElement.innerHTML =`
        <button class="buttons__button js-toggleHideTasksDone">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone 
        </button>
        <button class="buttons__button js-markAllDone"${tasks.every(({done}) => done) ? "disabled" : ""}>
        Ukończ wszystkie 
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click",markAllTasksDone);
        }

        const toggleHideDoneButton = document.querySelector(".js-toggleHideTasksDone");

        if (toggleHideDoneButton) {
            toggleHideDoneButton.addEventListener("click",toggleHideDoneTasks)
        }
    };

    const render = () => {
            renderTasks();
            bindEvents();
            renderButtons();
            bindButtonsEvents();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}