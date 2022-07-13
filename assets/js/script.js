var calendar = $("#calendar-form")

var genCal = function (addText) {
    for (var i = 9; i <= 17; i++) {
        (function(i) {
            var timeRow = $("<main>").addClass("row")
            var timeSlot = $("<section>").addClass("col-2 border-top border-right text-right")

            if (i <= 12) {
                var timeValue = i+"AM"
            }
            else {
                var timeValue = (i-12) + "PM"
            }
             
            var timeSlotText = $("<p>").text(timeValue)
            var description = $("<section>").addClass("col-8 description hour")
            .attr("des-id", i)
            .attr("type", "audit-background")
            var descriptionTask = $("<textarea>").text(addText)
            .attr("id", "text-"+i)
            .attr("type", "text")
            var saveBtn = $("<button>").addClass("col-2 saveBtn")
            btnHover = $("<i>").addClass("fas fa-save")
            .attr("btn-id", i)
            timeSlot.append(timeSlotText)
            timeRow.append(timeSlot)
            description.append(descriptionTask)
            timeRow.append(description)
            saveBtn.append(btnHover)
            timeRow.append(saveBtn)
            calendar.append(timeRow)
            }(i))
    }
    console.log($("#calendar-form"))
    
}
genCal()

var currentDate = moment().format("dddd, MMMM Do YYYY")

var genCurrent = function () {
    var current = $("#currentDay")
    .text(currentDate)
}

genCurrent()

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

// audit task due dates every 30 minutes
setInterval(function() {
    timeAudit();
  }, 1800000);

var tasksLi = [];


$(".saveBtn").click(
    function() {
        alert("here")
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

var loadTask = function () {
    var loadPage = JSON.parse(localStorage.getItem("tasks"))

    // if nothing in localStorage, create a new object to track all task status arrays
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
