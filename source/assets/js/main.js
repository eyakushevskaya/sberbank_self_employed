$(function() {

    $(".datepicker-wrap").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: 2,
        firstDay: 1,
        //minDate: 0,
        dateFormat: "dd.mm.yy",
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesMin: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
        monthNamesShort: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
    });

    $(".popup-opener").on("click", function() {
        var href = $(this).data("href");
        $(".popup-wrap").fadeOut(200);
        $(".popup-wrap." + href).fadeIn(200);
        $(".popup-wrap." + href).find(".popup-opener[data-href=" + href + "]").addClass("active");
        return false;
    });
    $(".popup-closer").on("click", function() {
        $(this).parents(".popup-wrap").fadeOut(200);
        return false;
    });

    $(".sch-cell-edit").on("click", function() {
        $(this).toggleClass("editable");
        if($(".sch-cell-edit").hasClass("editable")) {
            $(".sch-edit-btn").fadeIn();
        } else {
            $(".sch-edit-btn").fadeOut();
        }
        return false;
    });

    $(".toggle-password").click(function() {
        $(this).toggleClass("eye eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

});