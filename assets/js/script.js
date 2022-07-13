var calendar = $("#calendar-form")

// This function is used for generating the format and styling of calendar
var genCal = function (addText) {
    for (var i = 9; i <= 17; i++) {
        (function(i) {
            //Each row as each time block
            var timeRow = $("<main>").addClass("row")

            //Timeslot section, takes 2 columns
            var timeSlot = $("<section>").addClass("col-2 border-top border-right text-right")

            if (i <= 12) {
                var timeValue = i+"AM"
            }
            else {
                var timeValue = (i-12) + "PM"
            }
             
            var timeSlotText = $("<p>").text(timeValue)

            //Description section, takes 8 columns
            var description = $("<section>").addClass("col-8 description hour time-block")
            .attr("des-id", i)
            .attr("type", "audit-background")
            var descriptionTask = $("<textarea>").text(addText)
            .attr("id", "text-"+i)
            .attr("type", "text")

            //Save section takes 2 columns
            var saveBtn = $("<button>").addClass("col-2 saveBtn")
            .attr("btn-id", i)
            btnHover = $("<i>").addClass("fas fa-save")

            //Append each section to time block row
            timeSlot.append(timeSlotText)
            timeRow.append(timeSlot)
            description.append(descriptionTask)
            timeRow.append(description)
            saveBtn.append(btnHover)
            timeRow.append(saveBtn)
            calendar.append(timeRow)
            }(i))
    }
    
}
genCal()

//Generate current date and display at the top of the calendar
var currentDate = moment().format("dddd, MMMM Do YYYY")

var genCurrent = function () {
    var current = $("#currentDay")
    .text(currentDate)
}

genCurrent()

//This function is used for checking if the time block is past, present or future
var timeAudit = function () {
    var currentTime = parseInt(moment ().hours())

    $("[type = audit-background]").each(
        function() {
            var slot = parseInt($(this).attr("des-id"))
            
            if (currentTime == slot) {
                $(this).attr('class', "col-8 description present")
            
            }
            else if (currentTime > slot) {
                $(this).attr('class', "col-8 description past")
               
            }
            else {
                $(this).attr('class', "col-8 description future")
               
            }
        }
    )
     

}

timeAudit();

//Audit time every 30 minutes
setInterval(function() {
    timeAudit();
  }, 1800000);

var tasksLi = [];

//Add click event to save button, to save the description to the local storage
//If there is no description input, generate one
//If there are description input, overwrite the description of that time slot
$(".saveBtn").click(
    function() {

        var time = $(this).attr("btn-id")
        var textId = "text-" + time
        var desc = $("#"+textId).val()
        var taskEl = {
            "timeslot" : time,
            "descontent": desc
        }

        var exitTask = JSON.parse(localStorage.getItem("tasks"))

        if (exitTask == null) {
            tasksLi.push(taskEl)
            localStorage.setItem("tasks", JSON.stringify(tasksLi))
        }

        else {
            var found = exitTask.some(el => el.timeslot === time);

            if (found) {
                var objIndex = exitTask.findIndex((obj => obj.timeslot ==time));
                exitTask[objIndex].descontent = desc
            }
            else {
                exitTask.push(taskEl)
            }
            
            localStorage.setItem("tasks", JSON.stringify(exitTask))
        }
    }
)

//This function is used for loading existing input
var loadTask = function () {
    var loadPage = JSON.parse(localStorage.getItem("tasks"))

    if (!loadPage) {
        return
    }

    else {
        for (j = 0; j < loadPage.length; j++) {
            (function(j) {
                var timeIndex= loadPage[j]["timeslot"]
                var textContent = loadPage[j]["descontent"]
                $("#" + "text-" + timeIndex).text(textContent)
            } (j))
            
        }
    }  
}

loadTask()
