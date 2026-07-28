export default function inputCard(){
    return`
        <div class="center">
    <div class="form">
      <div class="new">
        <h2>New Task</h2>
        <button id="clsoe" data-action = "exit">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="white" />
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="31"
              rx="7.5"
              stroke="#0F0F14"
              stroke-opacity="0.121569"
            />
            <path
              d="M20 12L12 20M12 12L20 20"
              stroke="#7A7060"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
      <p>All fields are required</p>

      <form class="task-details">
            <div class="top">
                <div class="name">
                    <label for="task-name">TASK NAME</label>
                    <input name="task-name" type="text" id="task-name" placeholder="eg.Create Login Page" required>
                </div>
                <div class="priority">
                    <label for="difficulty">PRIORITY</label>
                    <input name="difficulty" type="text" list="opt"  id="difficulty" placeholder="eg.Create Login Page" required>
                    <datalist id="opt">
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Easy">Easy</option>
                    </datalist>
                </div>
            </div>

            <div class="bottom">
                 <div class="name">
                    <label for="Assignee">ASSIGNEE</label>
                    <input name="Assignee" type="text" id="Assignee" placeholder="eg.Create Login Page" required>
                </div>
                <div class="priority">
                    <label for="Priority">DUE DATE</label>
                    <input name="Priority" type="date" id="Priority" placeholder="eg.Create Login Page" required>
                </div>
            </div>

            <div class="add">
        <button type="submit" id="addto-list" data-action = "create-task">Add Task +</button>
      </div>

      </form>
    </div>
    </div>
    `;
}