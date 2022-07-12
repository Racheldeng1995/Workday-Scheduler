var calendar = $("#calendar-form")

var genCal = function () {
    for (var i = 9; i <= 17; i++) {
        (function(i) {
            var timeRow = $("<main>").addClass("row no-gutters border-top border-bottom ")
            var timeSlot = $("<section>").addClass("col-2 border-right")

            if (i <= 12) {
                var timeValue = i+"AM"
            }
            else {
                var timeValue = (i-12) + "PM"
            }
             
            var timeSlotText = $("<p>").text(timeValue)
            var description = $("<section>").addClass("col-8 description hour")
            .attr("id", i)
            .attr("type", "audit-background")
            var descriptionTask = $("<textarea>")
            var save = $("<section>").addClass("col-2")
            
            timeSlot.append(timeSlotText)
            timeRow.append(timeSlot)
            description.append(descriptionTask)
            timeRow.append(description)
            timeRow.append(save)
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
            var slot = parseInt($(this).attr("id"))
            
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