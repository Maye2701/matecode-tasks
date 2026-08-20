import { collection, deleteDoc, addDoc, doc, updateDoc, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import type { Task } from "../types/task";


export async function createTask(userId: string, title: string, description: string) {
    const docRef = await addDoc(collection(db, 'tasks'),
        {
            title,
            description,
            userId,
            completed: false,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp()
        }
    )
    return docRef.id
}

export async function updateTask(id: string, title: string, description: string) {
    const taskRef = doc(db, 'tasks', id)
    await updateDoc(taskRef,
        {
            title,
            description,
            updatedAt: serverTimestamp()
        })
}


export async function toggleTaskCompletion(id: string, completed: boolean) {
    const taskRef = doc(db, 'tasks', id)
    await updateDoc(taskRef, {
        completed,
        updatedAt: serverTimestamp()
    })
}

export async function deleteTask(id: string) {
    const taskRef = doc(db, 'tasks', id)
    await deleteDoc(taskRef)
}

export function subscribeToTasks(
    userId: string,
    onTasksChange: (tasks: Task[]) => void,
    onError: (error: Error) => void) {

    const taskCollection = collection(db, 'tasks')
    const queryRef = query(taskCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'))

    return onSnapshot(queryRef,
        (snapshot) => {
            const tasks = snapshot.docs.map(document => {
                const data = document.data()

                return {
                    id: document.id,
                    userId: data.userId,
                    title: data.title,
                    description: data.description,
                    completed: data.completed,
                    updatedAt: data.updatedAt?.toDate() ?? new Date(),
                    createdAt: data.createdAt?.toDate() ?? new Date(),
                }

            })
            onTasksChange(tasks)
        }, error => onError(error))
}