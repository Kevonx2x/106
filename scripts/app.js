function saveTask(){
    console.log("Saving tasks")
    // get the values from the html 
    const title=$("#txtTitle").val();
    const description=$("#txtDescription").val();
    const color=$("#txtColor").val();
    const data=$("#selData").val();
    const status=$("#selPriority").val();
    const budget=$("#numBudget").val();
    console.log(title, description, color, data, status, budget);
    //build an object
    let taskToSave = new Task(title, description, color, data, status, budget);
    console.log(taskToSave);

    displayTask(taskToSave);

    //save to the server
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",

        data: JSON.stringify(taskToSave),
        contentType: "application/json",

        success: function(response)
        {
            console.log(response);
            displayTask(taskToSave);
        },
        error: function(error)
        {
            console.log(error);
        }
    })
}

function loadTask(){
    //get the data from the http://fsdiapi.azurewebsites.net/api/tasks
    //console.log the results
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response)
        {
            let data = JSON.parse(response)
            console.log(data);
            for(let i = 0; i < data.length; i++){
            
                let task = data[i];
                if(task.name=="Turon"){
                    displayTask(task);
                }
            }
            
        },
        error: function(error)
        {
            console.log(error);
        }
    })

}


function displayTask(task){

let syntax = `<div class='task'>
    <div class='info'>
        <h3>${task.title}</h3>
        <h5>${task.description}</h5>
    </div>
        <label class="status">${task.status}</label>
        <div class="date-budget">
        <label>${task.date}</label>
        <label>${task.budget}</label>
        </div>      
    </div>
        `

        $(".list-task").append(syntax);//this line is a little confusing.
}

function testrequest(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net",
        success: function(response)
        {
            console.log(response);
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}
function init(){
    console.log("task manager")

    //load data

    //hook the events
    $("#btnSave").click(saveTask);
}

window.onload = init;