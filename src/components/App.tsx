import * as React from 'react';

interface IState {
    currentTask: string;
    tasks: Array<ITask>
}

interface ITask {
    id: number,
    value: string,
    completed: boolean
}
export class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentTask: "",
            tasks: []
        }
    }
    public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({
            currentTask: "",
            tasks: [
                ...this.state.tasks,
                {
                    id: this._timeInMilliseconds(),
                    value: this.state.currentTask,
                    completed: false
                }
            ]
        })
    }

    public deleteTask(id: number): void {
        const filteredTasks: Array<ITask> = this.state.tasks.filter((task: ITask) => task.id !== id);
        this.setState({
            tasks: filteredTasks
        });
    }

    public toggleDone(index: number): void {
        let task: ITask[] = this.state.tasks.splice(index, 1);
        task[0].completed = !task[0].completed;
        const tasks: ITask[] = [...this.state.tasks, ...task];
        this.setState({
            tasks
        });
    }

    public onChange(e: any): void {
        this.setState({
            currentTask: e.target.value
        })
    }

    public renderTasks(): JSX.Element[] {
        return this.state.tasks.map((task: ITask, index: number) => {
            return (
                <div key={task.id} className="tdl-task">
                    <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
                    <button onClick={() => this.deleteTask(task.id)}> Delete </button>
                    <button onClick={() => this.toggleDone(index)}> {task.completed ? "Undo" : "Done"} </button>
                </div>
            )
        })
    }

    public render(): JSX.Element {
        return (
            <div>
                <h1> React and TypeScript To do list </h1>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" className="tdl-input" placeholder="Add a task"
                        value={this.state.currentTask}
                        onChange={(e) => this.onChange(e)} />
                    <button type="submit"> Add Task</button>
                </form>

                <section>
                    {this.renderTasks()}
                </section>
            </div>
        );
    }

    private _timeInMilliseconds(): number {
        const date: Date = new Date();
        return date.getTime();
    }
}

// interface IProps {
//     name: string;
// }