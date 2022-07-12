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
            var description = $("<section>").addClass("col-8 border-right")
            var save = $("<section>").addClass("col-2")
            
            timeSlot.append(timeSlotText)
            timeRow.append(timeSlot)
            timeRow.append(description)
            timeRow.append(save)
            calendar.append(timeRow)
            }(i))
    }
    console.log($("#calendar-form"))
    
}
genCal()