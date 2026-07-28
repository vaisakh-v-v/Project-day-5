
export default function taskCard(task){

        return `
        <div class="hidden" >
      <div class="problem ${task.complete? "complet" : "not-complete"}" data-id = "${task.id}">
        <div class="problem-stat">
          <p class="${task.complete? "crossed-out" : "not-crossed"}">${task.title}</p>
          <button>${task.priority}</button>
        </div>

        <div class="assigned">
          <div class="to">
            <p>ASSIGNED</p>
            <span>${task.assigned}</span>
          </div>
          <div class="due">
            <p>DUE</p>
            <span>${task.due}</span>
          </div>
          <div class="stat">
            <p>STATUS</p>
            <span>${task.status}</span>
          </div>
        </div>

        <div class="task-status">
          <button id="completed" data-action = "finished">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2_936)">
                <path
                  d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                  stroke="#1A1A1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 6L5.5 7L7.5 5"
                  stroke="#1A1A1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_936">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
             Completed
          </button>

          <button id="delete" data-action = "delete-task">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0.75H22C24.8995 0.75 27.25 3.10051 27.25 6V22C27.25 24.8995 24.8995 27.25 22 27.25H6C3.10051 27.25 0.75 24.8995 0.75 22V6C0.75 3.10051 3.10051 0.75 6 0.75Z"
                stroke="#E63333"
                stroke-width="1.5"
              />
              <path
                d="M9.5 11H18.5"
                stroke="#7A7060"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 11V18C17.5 18.5 17 19 16.5 19H11.5C11 19 10.5 18.5 10.5 18V11"
                stroke="#7A7060"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 11V10C12 9.5 12.5 9 13 9H15C15.5 9 16 9.5 16 10V11"
                stroke="#7A7060"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 13.5V16.5"
                stroke="#7A7060"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 13.5V16.5"
                stroke="#7A7060"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    `;

    
}