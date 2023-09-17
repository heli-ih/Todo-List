const newTaskModal = document.getElementById("modalContainer");

document.getElementById("newTaskBtn").addEventListener("click", () => {
  newTaskModal.classList.remove("hidden");
});

const weekStack = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

document.getElementById("createTaskBtn").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const taskDay = document.getElementById("day").value;

  const task = {
    title: taskInput,
    start: startTime,
    end: endTime,
    taskDay: taskDay,
    isCompleted: false,
  };

  pushTask(taskDay, task);
  createTask(taskDay);

  // -----------------check box------------------

  const checkBoxes = [...document.querySelectorAll(".checkBox")];

  checkBoxes.forEach((btn) => {
    btn.addEventListener("change", (e) => {
      const parentLi = e.target.parentElement;

      if (e.target.checked) {
        task.isCompleted = true;
        parentLi.classList.add("task");
        const taskItems = [...document.querySelectorAll(".task")];
        taskItems.forEach((i) => {
          i.classList.replace("bg-indigo-100", "bg-emerald-200");
        });
      } else {
        task.isCompleted = false;
        parentLi.classList.remove("task");
        parentLi.classList.replace("bg-emerald-200", "bg-indigo-100");
      }
      console.log(task);
    });
  });

  //   const newTitle = document.createElement("p");
  //   newTitle.innerText = task.title;
  //   const newStart = document.createElement("p");
  //   newStart.innerText = task.start;
  //   const newEnd = document.createElement("p");
  //   newEnd.innerText = task.end;

  // const newTask = document.createElement("li");
  // newTask.innerHTML = value;
  //   newTask.appendChild(newTitle);
  //   newTask.appendChild(newStart);
  //   newTask.appendChild(newEnd);
  clearInputs("taskInput", "startTime", "endTime", "day");
});

//   ---------------------filter-----------------
const filterChange = document.getElementById("filter");

filterChange.addEventListener("change", (e) => {
  const filter = e.target.value;
  switch (filter) {
    case "all": {
      getTasks();
      break;
    }
    case "completed": {
    }
    case "uncompleted": {
    }
  }

  //   if (e.target.value === "completed") {
  //     const uncompletedTasks = [
  //       ...document.querySelectorAll(".taskUncomplete"),
  //     ];
  //     uncompletedTasks.forEach((i) => {
  //       i.classList.add("hidden");
  //     });
  //   }
  //   if (e.target.value === "uncompleted") {
  //     const completedTasks = [...document.querySelectorAll(".taskComplete")];
  //     completedTasks.forEach((i) => {
  //       i.classList.add("hidden");
  //     });
  //   }
});

function pushTask(day, task) {
  weekStack[`${day}`].push(task);
}

function createTask(day) {
  let value = "";
  const weekDay = weekStack[`${day}`];
  weekDay.forEach((task) => {
    value += `<li class="py-4 mb-4 bg-indigo-100">
                          <p class="text-md font-semibold mb-3">${task.title}</p>
                          <p class="text-sm mb-5">${task.start}-${task.end}</p>
                          <input class="checkBox items-center" type="checkbox"> 
                        </li>`;

    document.getElementById(`${day}`).innerHTML = value;

    newTaskModal.classList.add("hidden");
  });
}

function clearInputs(...inputIDs) {
  inputIDs.forEach((id) => {
    input = document.getElementById(id);
    if (input) {
      console.log(input);
      input.value = "";
      if (id == "taskInput") input.placeholder = "Task...";
      //   input.placeholder = input.getAttribute("data-original-placeholder");
    }
  });
}

function getTasks() {
  const weekdays = Object.keys(weekStack);
  weekdays.forEach((day) => {
    createTask(day);
  });
}

function getCompletedTasks() {
  const weekdays = Object.keys(weekStack);
  weekdays.forEach((day) => {
    const completedTasks = weekStack[day].filter(
      (task) => task.isCompleted === true
    );

    completedTasks.forEach((task) => {
      console.log(task);
      console.log(task.isCompleted);
      if (task.isCompleted == true) createTask(day);
    });
  });
}

function getUncompletedTasks() {
  const weekdays = Object.keys(weekStack);
  weekdays.forEach((day) => {
    createTask(day);
  });
}
