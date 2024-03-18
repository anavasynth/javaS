window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const sort_select = document.querySelector("#sort-select");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const displayTasks = () => {
        list_el.innerHTML = '';
        tasks.forEach((task, index) => {
            const task_el = document.createElement('div');
            task_el.classList.add('task');
            if (task.completed) {
                task_el.classList.add('completed');
                task_el.classList.add('selected'); // Додаємо клас selected, якщо таска вибрана
            }

            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');

            const task_checkbox_el = document.createElement('input');
            task_checkbox_el.type = 'checkbox';
            task_checkbox_el.checked = task.completed;
            task_checkbox_el.style.marginLeft = '10px';
            task_checkbox_el.style.marginTop = '10px';

            const task_input_el = document.createElement('input');
            task_input_el.classList.add('text');
            task_input_el.type = 'text';
            task_input_el.value = task.text;
            task_input_el.setAttribute('readonly', 'readonly');

            let isDeadlineSet = false; // Додаткова змінна для відстеження стану поля дати
            const task_deadline_el = document.createElement('input');
            task_deadline_el.classList.add('deadline');
            task_deadline_el.type = 'date';
            task_deadline_el.value = task.deadline || '';

            // Додавання відслідковувача подій для поля дати
            task_deadline_el.addEventListener('change', () => {
                task_deadline_el.setAttribute('readonly', 'readonly');
                isDeadlineSet = true; // Встановлення флагу після вибору дати
            });

            // Перевірка та встановлення readonly після оновлення сторінки
            if (task.deadline && !isDeadlineSet) {
                task_deadline_el.setAttribute('readonly', 'readonly');
            }

            task_content_el.appendChild(task_input_el);
            task_content_el.appendChild(task_checkbox_el);
            task_content_el.appendChild(task_deadline_el);

            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');

            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerText = 'Edit';

            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerText = 'Delete';

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_content_el);
            task_el.appendChild(task_actions_el);

            task_el.appendChild(task_checkbox_el);

            list_el.appendChild(task_el);

            task_checkbox_el.addEventListener('change', () => {
                task.completed = task_checkbox_el.checked;
                if (task.completed) {
                    task_el.classList.add('selected');
                } else {
                    task_el.classList.remove('selected');
                }
                updateLocalStorage();
                displayTasks();
            });

            task_deadline_el.addEventListener('change', () => {
                task.deadline = task_deadline_el.value;
                updateLocalStorage();
            });

            task_edit_el.addEventListener('click', () => {
                if (task_edit_el.innerText.toLowerCase() == "edit") {
                    task_edit_el.innerText = "Save";
                    task_input_el.removeAttribute("readonly");
                    task_deadline_el.removeAttribute("readonly");
                    task_input_el.focus();
                } else {
                    task_edit_el.innerText = "Edit";
                    task_input_el.setAttribute("readonly", "readonly");
                    task_deadline_el.setAttribute("readonly", "readonly");
                    task.text = task_input_el.value;
                    task.deadline = task_deadline_el.value;
                    updateLocalStorage();
                }
            });

            task_delete_el.addEventListener('click', () => {

                deleteTaskWithAnimation(index);
            });
        });
    };

    const sortTasks = (criteria) => {
        switch (criteria) {
            case 'status':
                tasks.sort((a, b) => a.completed - b.completed);
                break;
            case 'deadline':
                tasks.sort((a, b) => {
                    if (a.deadline && b.deadline) {
                        return new Date(a.deadline) - new Date(b.deadline);
                    } else if (a.deadline) {
                        return -1;
                    } else if (b.deadline) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
        }
        displayTasks();
    };

    displayTasks();


    // Додавання нової таски з плавним з'явленням
    const addTaskWithAnimation = (task) => {
        tasks.push(task);
        updateLocalStorage();
        displayTasks();

        const newTaskEl = list_el.lastElementChild;

        newTaskEl.classList.add('fade-in');

        setTimeout(() => {
            newTaskEl.classList.remove('fade-in');
        }, 500);
    };

    // Видалення таски з плавним зникненням
    const deleteTaskWithAnimation = (index) => {
        const deletedTaskEl = list_el.children[index];

        deletedTaskEl.classList.add('fade-out');

        setTimeout(() => {
            tasks.splice(index, 1);
            updateLocalStorage();
            displayTasks();
        }, 300);
    };


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = { text: input.value, completed: false, deadline: '', dateAdded: new Date().toISOString() };
        addTaskWithAnimation(task); // Додавання таски з плавним з'явленням
        input.value = '';
    });

    sort_select.addEventListener('change', () => {
        sortTasks(sort_select.value);
    });
});
