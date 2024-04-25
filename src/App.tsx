import { useState } from 'react'

import New from './components/Project/New'
import NoSelected from './components/Project/NoSelected'
import Sidebar from './components/Project/Sidebar'
import Selected from './components/Project/Selected'

const App = () => {
    const [projectsState, setProjectsState] = useState<any>({
        selectedProject: undefined,
        projects: [],
        tasks: [],
    })

    const handleAddTask = (text) => {
        setProjectsState((prevState) => {
            const taskId = Math.random()

            const newTask = {
                projectId: prevState.selectedProjectId,
                items: [
                    {
                        id: taskId,
                        text: text,
                    },
                ],
            }

            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks],
            }
        })
    }

    const handleDeleteTask = (id) => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((task) => task.id !== id),
            }
        })
    }

    const handleSelectProject = (id) => {
        setProjectsState((prevState) => {
            console.log('prevState: ==>', prevState)

            return {
                ...prevState,
                selectedProjectId: id,
            }
        })
    }

    const handleStartAddProject = () => {
        setProjectsState((prevState) => {
            console.log('handleStartAddProject: ==>', prevState)
            return {
                ...prevState,
                selectedProjectId: null,
            }
        })
    }

    const handleCancelAddProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            }
        })
    }

    const handleAddProject = (projectData) => {
        setProjectsState((prevState) => {
            const projectId = Math.random()
            const newProject = {
                ...projectData,
                id: projectId,
            }

            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            }
        })
    }

    const handleDeleteProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                ),
            }
        })
    }

    const selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId
    )

    let content = (
        <Selected
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
        />
    )

    if (projectsState?.selectedProjectId === null) {
        content = (
            <New onAdd={handleAddProject} onCancel={handleCancelAddProject} />
        )
    } else if (projectsState?.selectedProjectId === undefined) {
        content = <NoSelected onStartAddProject={handleStartAddProject} />
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    )
}

export default App
