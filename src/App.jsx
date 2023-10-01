import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [newTitle, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [allToDos, setToDos] = useState([]);
  const [completeScreen, setCompleteScreen] = useState(false);
  const [completedToDo, setCompletedToDo] = useState([]);

  const handleAdd = () => {
    if (newTitle === "" || desc === "") {
      alert("Add a proper Title or Description to your task");
    } else {
      let todoItem = {
        title: newTitle,
        description: desc,
      };
      let updatedTodoArr = [...allToDos];
      updatedTodoArr.push(todoItem);
      setToDos(updatedTodoArr);
      setDesc("");
      setTitle("");
      localStorage.setItem("todoList", JSON.stringify(updatedTodoArr));
    }
  };

  const handleDelete = (index) => {
    let reducedToDo = [...allToDos];
    reducedToDo.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(reducedToDo));
    setToDos(reducedToDo);
  };

  const handleDone = (index) => {
    let updatedCompletedToDo = [...completedToDo];
    let completionTime = new Date();
    let dd = completionTime.getDate();
    let mm = completionTime.getMonth() + 1;
    let yyyy = completionTime.getFullYear();
    let h = completionTime.getHours();
    let min = completionTime.getMinutes();
    let sec = completionTime.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " @ " + h + ":" + min + ":" + sec;
    let completedTask = {
      ...allToDos[index],
      completedOn: completedOn,
    };
    updatedCompletedToDo.push(completedTask);
    localStorage.setItem(
      "completedToDoList",
      JSON.stringify(updatedCompletedToDo)
    );
    setCompletedToDo(updatedCompletedToDo);
    let reducedToDo = [...allToDos];
    reducedToDo.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(reducedToDo));
    setToDos(reducedToDo);
  };
  const handleCompletedDelete = (index) => {
    let reducedCompletedToDo = [...completedToDo];
    reducedCompletedToDo.splice(index, 1);
    localStorage.setItem(
      "completedToDoList",
      JSON.stringify(reducedCompletedToDo)
    );
    setCompletedToDo(reducedCompletedToDo);
  };

  useEffect(() => {
    let toDoArray = JSON.parse(localStorage.getItem("todoList"));
    if (toDoArray) {
      setToDos(toDoArray);
    }
    let completedToDoArray = JSON.parse(
      localStorage.getItem("completedToDoList")
    );
    if (completedToDoArray) {
      setCompletedToDo(completedToDoArray);
    }
  }, []);

  return (
    <>
      <div className="main_div">``
          <h1 className="heading">
            <span><img className=" logot"src="./src/assets/logo.png" height="50vh"/></span>ask<span className="txtLight">ify</span>{" "}
          </h1>
          <div className="input_div">
            <input
              className="title-input"
              type="text"
              value={newTitle}
              placeholder="Task title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
  
            <input
              className="desc-input"
              type="text"
              value={desc}
              placeholder="Task description"
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
            <button className="addBtn" onClick={handleAdd}>
              Add
            </button>
          </div>
          <div className="tabDiv">
            <button
              className={`secondaryBtn ${completeScreen === false && "active"}`}
              onClick={() => {
                setCompleteScreen(false);
              }}
            >
              Pending
              <span className={`count-pending ${allToDos.length=== 0 && "d-none"}`}>{allToDos.length}</span>
            </button>
            <button
              className={`secondaryBtn ${completeScreen === true && "active"}`}
              onClick={() => {
                setCompleteScreen(true);
              }}
            >
              Completed
              <span className={`count-pending ${completedToDo.length=== 0 && "d-none"}`}> {completedToDo.length}</span>
            </button>
          </div>
          <div className="list_div">
            {!completeScreen &&
              allToDos.map((item, index) => {
                return (
                  <div className="list_item" key={index}>
                    <div className="toDoItemDetail">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className="toDoBtnDiv">
                      <button
                        className="doneBtn"
                        onClick={() => handleDone(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="100"
                          height="100"
                          viewBox="0,0,256,256"
                        >
                          <g
                            fill="#00aa00"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                          >
                            <g transform="scale(4,4)">
                              <path d="M30,4c-15.439,0 -28,12.561 -28,28c0,15.439 12.561,28 28,28h3c15.439,0 28,-12.561 28,-28c0,-5.39905 -1.53916,-10.44357 -4.19727,-14.72461l5.23633,-5.23633l-2.82812,-2.82812l-4.78711,4.78711c-5.1404,-6.10787 -12.8348,-9.99805 -21.42383,-9.99805zM33,8c7.4864,0 14.18112,3.44695 18.58594,8.83594l-18.21094,18.21094l-11.71094,-11.71094l-2.82812,2.82812l14.53906,14.53906l20.50781,-20.50781c1.98001,3.48859 3.11719,7.51479 3.11719,11.80469c0,13.234 -10.767,24 -24,24c-13.233,0 -24,-10.766 -24,-24c0,-13.234 10.767,-24 24,-24z"></path>
                            </g>
                          </g>
                        </svg>
                        {""}
                      </button>
                      <button
                        className="doneBtn"
                        onClick={() => handleDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="100"
                          height="100"
                          viewBox="0,0,256,256"
                        >
                          <g
                            fill="#edeeff"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                          >
                            <g transform="scale(5.12,5.12)">
                              <path d="M21,0c-1.64453,0 -3,1.35547 -3,3v2h-7.8125c-0.125,-0.02344 -0.25,-0.02344 -0.375,0h-1.8125c-0.03125,0 -0.0625,0 -0.09375,0c-0.55078,0.02734 -0.98047,0.49609 -0.95312,1.04688c0.02734,0.55078 0.49609,0.98047 1.04688,0.95313h1.09375l3.59375,40.5c0.125,1.39844 1.31641,2.5 2.71875,2.5h19.1875c1.40234,0 2.59375,-1.10156 2.71875,-2.5l3.59375,-40.5h1.09375c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-10v-2c0,-1.64453 -1.35547,-3 -3,-3zM21,2h8c0.5625,0 1,0.4375 1,1v2h-10v-2c0,-0.5625 0.4375,-1 1,-1zM11.09375,7h27.8125l-3.59375,40.34375c-0.03125,0.34766 -0.40234,0.65625 -0.71875,0.65625h-19.1875c-0.31641,0 -0.6875,-0.30859 -0.71875,-0.65625zM18.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM24.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM30.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z"></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            {/* complete screen tab*/}
            {completeScreen &&
              completedToDo.map((item, index) => {
                return (
                  <div className="list_item" key={index}>
                    <div className="toDoItemDetail">
                      <h3 className="strike">{item.title}</h3>
                      <p className="strike">{item.description}</p>
                      <p>
                        <small>Completed on {item.completedOn}</small>
                      </p>
                    </div>
                    <div className="toDoBtnDiv">
                      <button
                        className="doneBtn"
                        onClick={() => handleCompletedDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="100"
                          height="100"
                          viewBox="0,0,256,256"
                        >
                          <g
                            fill="#dfe0fb"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                          >
                            <g transform="scale(5.12,5.12)">
                              <path d="M21,0c-1.64453,0 -3,1.35547 -3,3v2h-7.8125c-0.125,-0.02344 -0.25,-0.02344 -0.375,0h-1.8125c-0.03125,0 -0.0625,0 -0.09375,0c-0.55078,0.02734 -0.98047,0.49609 -0.95312,1.04688c0.02734,0.55078 0.49609,0.98047 1.04688,0.95313h1.09375l3.59375,40.5c0.125,1.39844 1.31641,2.5 2.71875,2.5h19.1875c1.40234,0 2.59375,-1.10156 2.71875,-2.5l3.59375,-40.5h1.09375c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-10v-2c0,-1.64453 -1.35547,-3 -3,-3zM21,2h8c0.5625,0 1,0.4375 1,1v2h-10v-2c0,-0.5625 0.4375,-1 1,-1zM11.09375,7h27.8125l-3.59375,40.34375c-0.03125,0.34766 -0.40234,0.65625 -0.71875,0.65625h-19.1875c-0.31641,0 -0.6875,-0.30859 -0.71875,-0.65625zM18.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM24.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM30.90625,9.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v33c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-33c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z"></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

      </div>
    </>
  );
}

export default App;
