import { useEffect, useState } from "react";
import { getTodos, saveTodos, getTheme, saveTheme } from "./utils/storage";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaMoon,
  FaSun,
  FaPlus,
  FaBroom,
} from "react-icons/fa";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load todos + theme
  useEffect(() => {
    getTodos().then(setTodos);
    getTheme().then(setDarkMode);
  }, []);

  const addOrUpdateTodo = () => {
    if (!todo.trim()) return;

    let newTodos;

    if (editId) {
      newTodos = todos.map((t) => (t.id === editId ? { ...t, text: todo } : t));
      setEditId(null);
    } else {
      newTodos = [...todos, { id: Date.now(), text: todo, completed: false }];
    }

    setTodos(newTodos);
    saveTodos(newTodos);
    setTodo("");
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setTodo(todo.text);
  };

  const clearAll = () => {
    setTodos([]);
    saveTodos([]);
  };

  const toggleTheme = () => {
    const value = !darkMode;
    setDarkMode(value);
    saveTheme(value);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="p-4 w-[320px] h-100 bg-white dark:bg-zinc-900 text-black dark:text-white font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Todo Logo" className="w-7 h-7" />
            <span className="text-lg font-bold">Todo</span>
          </div>

          <button onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-3">
          <input
            className="border dark:border-zinc-700 bg-transparent rounded px-2 py-1 w-full"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="New todo..."
          />
          <button
            onClick={addOrUpdateTodo}
            className="bg-black dark:bg-white dark:text-black text-white px-3 rounded"
          >
            <FaPlus />
          </button>
        </div>

        {/* Clear all */}
        {todos.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-xs text-red-500 mb-2"
          >
            <FaBroom /> Clear All
          </button>
        )}

        {/* Todo list */}
        <ul className="space-y-2 overflow-y-auto max-h-65">
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center border dark:border-zinc-700 p-2 rounded"
            >
              <span
                onClick={() => toggleComplete(t.id)}
                className={`text-sm cursor-pointer ${
                  t.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {t.text}
              </span>

              <div className="flex gap-2 text-sm">
                <button onClick={() => toggleComplete(t.id)}>
                  <FaCheck className="text-green-500" />
                </button>
                <button onClick={() => startEdit(t)}>
                  <FaEdit className="text-blue-500" />
                </button>
                <button onClick={() => deleteTodo(t.id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </li>
          ))}

          {todos.length === 0 && (
            <p className="text-center text-gray-400 text-sm">No todos yet</p>
          )}
        </ul>
      </div>
    </div>
  );
}
