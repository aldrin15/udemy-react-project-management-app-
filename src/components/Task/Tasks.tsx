import New from './New'

const Tasks = ({ onAdd, onDelete, tasks, projectId }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <New onAdd={onAdd} />

            {tasks.length === 0 && (
                <p className="text-stone-800 my-4">
                    This project does not have any tasks yet.
                </p>
            )}

            {tasks.length > 0 && (
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {tasks.map(
                        (task) =>
                            task.projectId === projectId &&
                            task.items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between my-4"
                                >
                                    <span>{item.text}</span>
                                    <button
                                        className="text-stone-700 hover:text-red-500"
                                        onClick={() => onDelete(item.id)}
                                    >
                                        Clear
                                    </button>
                                </li>
                            ))
                    )}
                </ul>
            )}
        </section>
    )
}

export default Tasks
