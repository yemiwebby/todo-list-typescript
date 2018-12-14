import * as React from 'react';

interface IState {
    currentTask: string;
    tasks: Array<string>
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
                this.state.currentTask
            ]
        })
    }

    public onChange(e: any): void {
        this.setState({
            currentTask: e.target.value
        })
    }

    public renderTasks(): JSX.Element[] {
        return this.state.tasks.map((task: string, index: number) => {
            return (
                <div key={index}>{task}</div>
            )
        })
    }

    public render(): JSX.Element {
        console.log(this.state);
        return (
            <div>
                <h1> React and TypeScript To do list </h1>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" placeholder="Add a task"
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
}

// interface IProps {
//     name: string;
// }