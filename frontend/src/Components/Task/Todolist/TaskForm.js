import React, { useContext, useState } from "react";
import TaskContext from "../../../Context/taskContext";
import "../task";

const TaskForm = ({ onSubmit, onCancel, olderTask }) => {
  const context = useContext(TaskContext);
  const { addTask, updateTask } = context;

  const originalDate = new Date(olderTask ? olderTask.date : "");
  const formattedDate = `${originalDate.getFullYear()}-${String(
    originalDate.getMonth() + 1
  ).padStart(2, "0")}-${String(originalDate.getDate()).padStart(2, "0")}`;

  const [title, setTitle] = useState(olderTask ? olderTask.title : "");
  const [description, setDescription] = useState(
    olderTask ? olderTask.description : ""
  );
  const [priority, setPriority] = useState(olderTask ? olderTask.priority : 1);
  const [date, setDate] = useState(olderTask ? formattedDate : "");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description || !date || priority < 1 || priority > 3) {
      alert("All fields must be filled out correctly.");
      return;
    }
    if (olderTask)
      updateTask(olderTask._id, title, description, date, priority);
    else addTask(title, description, date, priority);
    onCancel();
  }

  return (
    <div
      className={`modal fade ${"show"}`}
      tabIndex="-1"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Task</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  className="form-control"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  className="form-control"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  className="form-control"
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Select priority
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="btnadd">
                <button type="submit" className="btn btn-primary">
                  {olderTask ? "Save" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
