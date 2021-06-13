import { helpers } from "./helpers.js";
import { today } from "./today.js";
export { todoForm };

const todoForm = (() => {
  var newTodoBtns = document.querySelectorAll(".new-todo-btn");
  let list = [];

  const formMethods = {
    changeAddBtn() {
      this.titleInput.value
        ? this.addBtn.classList.remove("deactive")
        : this.addBtn.classList.add("deactive");
    },
    changeCommentBtn(status) {
      status === "empty"
        ? this.commentIcon.classList.remove("flaticon-comment-1")
        : this.commentIcon.classList.add("flaticon-comment-1");
    },
    changeFlagIcon(color, level) {
      level != "4"
        ? this.priorityIcon.classList.add("flaticon-flag-1")
        : this.priorityIcon.classList.remove("flaticon-flag-1");
      this.priorityIcon.style.color = color;
    },
    setDefaultDate() {
      this.dateInput.value = today.getToday();
    },
    resetPriorityIcon() {
      this.priorityIcon.setAttribute("class", "flaticon flaticon-flag");
      this.priorityIcon.style.color = "var(--main-text)";
    },
    hide() {
      helpers.hide(this.ctn);
      this.form != undefined ? this.form.reset() : this.ctn.reset();
      this.resetPriorityIcon();
      this.changeAddBtn();
      this.commentIcon.classList.remove("flaticon-comment-1");
    },
  };

  const editor = (function createEditor() {
    const ctn = document.querySelector(".todo-editor");
    const titleInput = ctn.querySelector(".title-input");
    const dateInput = ctn.querySelector("input[type='date']");
    const pjInput = ctn.querySelector("select");
    const priorityBtn = ctn.querySelector(".priority-btn");
    const priorityIcon = priorityBtn.querySelector("i");
    const saveBtn = ctn.querySelector(".save-btn");
    const cancelBtn = ctn.querySelector(".cancel-btn");

    return {
      ctn,
      titleInput,
      dateInput,
      pjInput,
      priorityBtn,
      priorityIcon,
      saveBtn,
      cancelBtn,
    };
  })();
  Object.setPrototypeOf(editor, formMethods);
  editor.setDataset = function (id) {
    this.ctn.dataset.id = id;
    this.priorityBtn.dataset.id = `editor-priority-${id}`;
    this.saveBtn.dataset.id = id;
  };
  list.push(editor);

  const contentForm = (function createTodoForm() {
    const ctn = document.querySelector(".new-todo-form");
    const titleInput = ctn.querySelector(".title-input");
    const dateInput = ctn.querySelector("input[type='date']");
    const pjInput = ctn.querySelector("select");
    const priorityBtn = ctn.querySelector(".priority-btn");
    priorityBtn.dataset.id = "priority-content-form";
    const priorityIcon = priorityBtn.querySelector("i");
    const commentBtn = ctn.querySelector(".comment-btn");
    commentBtn.dataset.id = "comment-content-form";
    const commentIcon = commentBtn.querySelector("i");
    const addBtn = ctn.querySelector(".add-todo-btn");
    const cancelBtn = ctn.querySelector(".cancel-btn");

    return {
      ctn,
      titleInput,
      dateInput,
      pjInput,
      priorityBtn,
      priorityIcon,
      commentBtn,
      commentIcon,
      addBtn,
      cancelBtn,
    };
  })();
  Object.setPrototypeOf(contentForm, formMethods);
  list.push(contentForm);

  const modalForm = (() => {
    var form = document.getElementById("new-todo-form");
    var ctn = form.closest(".modal");
    var addBtn = form.querySelector("#add-todo-btn");
    var cancelBtn = form.querySelector(".close-btn");

    var commentBtn = form.querySelector(".comment-btn");
    commentBtn.dataset.id = "comment-modal-form";
    var commentIcon = commentBtn.querySelector(".flaticon");
    var priorityBtn = form.querySelector(".priority-btn");
    priorityBtn.dataset.id = "priority-modal-form";
    var priorityIcon = priorityBtn.querySelector(".flaticon");

    var titleInput = form.querySelector("input[name=todo-title");
    var dateInput = form.querySelector("input[type=date");
    var pjInput = form.querySelector("select[name=todo-pj");

    return {
      form,
      ctn,
      addBtn,
      cancelBtn,
      commentBtn,
      commentIcon,
      priorityBtn,
      priorityIcon,
      titleInput,
      dateInput,
      pjInput,
    };
  })();
  Object.setPrototypeOf(modalForm, formMethods);
  list.push(modalForm);

  return {
    newTodoBtns,
    editor,
    modalForm,
    contentForm,
    findActiveForm() {
      return list.find((form) => !form.ctn.classList.contains("inactive"));
    },
  };
})();
