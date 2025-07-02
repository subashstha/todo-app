import { useEffect, useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("All");
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const tabOptions = ["All", "Todo", "Completed"];

  const handleAdd = (e) => {
    e.preventDefault();
    let newTodoItem = {
      title: title,
      desc: desc,
    };

    let updateTodoArr = [...todos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updateTodoArr));

    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));

    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "Todo") return !todo.completed;
    if (activeTab === "Completed") return todo.completed;
    return true;
  });

  const handleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true;
    setTodos(updatedTodos);
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
  };

  const handleClearAll = () => {
    setTodos([]);
    localStorage.setItem("todolist", JSON.stringify([]));
  };

  return (
    <>
      <div className="flex">
        <div className="todo font-primary py-10 px-4 max-w-[800px] w-full mx-auto">
          <h1 className="text-2xl text-center font-semibold mb-6">Todo App</h1>
          <form onSubmit={handleAdd} className="mb-4">
            <div className="flex gap-4 items-end w-full justify-between flex-wrap md:flex-nowrap">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="title-input"
                  className="block mb-2 text-gray-900 cursor-pointer"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="description-input"
                  className="block mb-2 text-gray-900 cursor-pointer"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
                  placeholder="Enter description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white cursor-pointer  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Add
              </button>
            </div>
          </form>
          <div className="todo-content">
            <ul className="flex gap-1 flex-wrap text-sm font-medium text-center text-gray-500 mb-4">
              {tabOptions.map((tab) => (
                <li key={tab}>
                  <button
                    className={`cursor-pointer inline-block px-4 py-3 rounded-lg ${
                      activeTab === tab
                        ? "text-white bg-blue-600"
                        : "hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            <div className="todo-inner">
              {filteredTodos.map((item, i) => {
                const originalIndex = todos.findIndex(
                  (todo) => todo.title === item.title && todo.desc === item.desc
                );

                return (
                  <div
                    className="block px-4 py-3 md:px-6 md:py-4 bg-white border border-gray-200 rounded-lg mb-4"
                    key={i}
                  >
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                      {item.title}
                    </h5>
                    <p className="font-normal text-gray-700 ">{item.desc}</p>
                    <div className="btn-group pt-3">
                      <ul className="inline-flex flex-wrap gap-1">
                        <li>
                          <button
                            type="button"
                            onClick={() => handleDelete(originalIndex)}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex"
                          >
                            Delete
                          </button>
                        </li>
                        {!item.completed && (
                          <li>
                            <button
                              type="button"
                              onClick={() => handleComplete(originalIndex)}
                              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-flex"
                            >
                              Completed
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}

              {filteredTodos.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleClearAll()}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
