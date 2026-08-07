import  {getStats, store} from "../js/store.js";

export default function Status(){
const {tasks} = store.getState();
const {total, completed, pending } = getStats(tasks);


    return`
        <section>
      <div class="hero">
        <div class="task-count">
          <h2>${total}</h2>
          <p>TOTAL</p>
        </div>
        <div class="task-count">
          <h2>${completed}</h2>
          <p>COMPLETED</p>
        </div>

        <div class="task-count">
          <h2>${pending}</h2>
          <p>PENDING</p>
        </div>
      </div>

      <div class="add-task">
        <button data-action="append-task" >Add Task +</button>
      </div>

      <div class="your-tasks">
        <p>Your Tasks</p>
        <div class="tasks">
          
          <!-- append tasks here -->

      </div>
    </section>
    `;

}