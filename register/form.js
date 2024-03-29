var filled = {
    name: 0,
    designation: 0,
    institute: 0,
    year: 0,
    email: 0,
    phone: 0
};

var flag = {
    name: 0,
    designation: 0,
    institute: 0,
    year: 0,
    email: 0,
    phone: 0
};

function show(x, parent, second, message) {
    $(parent).removeClass("has-success");
    $(parent).addClass("has-error");
    second.innerHTML = message;
    flag[x] = 0;
}

function hide(x, parent, second) {
    $(parent).removeClass("has-error");
    $(parent).addClass("has-success");
    second.innerHTML = "&nbsp;";
    flag[x] = 1;
}

function showok(x) {
    var icon = document.getElementById(x + "-icon");
    icon.innerHTML = '<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
}

function showcross(x) {
    var icon = document.getElementById(x + "-icon");
    icon.innerHTML = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
}

function checkPhone(n) {
    var num;
    if (n[0] == '+') {
        if (n.length != 13) return 0;
        if (n.substring(1, 3) != "91") return 0;
        num = n.substring(3);
    } else if (n[0] == 0) {
        if (n.length != 11) return 0;
        num = n.substring(1);
    } else {
        num = n;
    }
    if (!$.isNumeric(num) || parseInt(num[0]) < 6 || num.length != 10) {
        return 0;
    }
    return 1;
}

function check(x, arg) {
    var first = document.getElementById(x);
    var firstval = first.value;
    var second = document.getElementById(x + "-error");
    var parent = $(first).parent();
    if (firstval == "") {
        showcross(x);
        return show(x, parent, second, "This field is required.");
    }
    if (x == "name") {
        // Valid
        if (/^[A-Za-z ]+[\.]*[A-Za-z ]*$/.test(firstval)) {
            showok(x);
            hide(x, parent, second);
        } else {
            showcross(x);
            show(x, parent, second, "Please enter a valid name.");
            if (arg == 0) {
                second.innerHTML = "&nbsp;";
            }
        }
    }
    if (x == "designation") {
        if (!$.isNumeric(firstval)) {
            showok(x);
            hide(x, parent, second);
        } else {
            showcross(x);
            show(x, parent, second, "Please enter a valid designation.");
            if (arg == 0) {
                second.innerHTML = "&nbsp;";
            }
        }
    }
    if (x == "institute") {
        if (!$.isNumeric(firstval)) {
            showok(x);
            hide(x, parent, second);
        } else {
            showcross(x);
            show(x, parent, second, "Please enter a valid Institute Name.");
            if (arg == 0) {
                second.innerHTML = "&nbsp;";
            }
        }
    }
    if (x == "year") {
        showok(x);
        hide(x, parent, second);
    }
    if (x == "email") {
        // Valid
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(firstval).toLowerCase())) {
            showok(x);
            hide(x, parent, second);
        } else {
            showcross(x);
            show(x, parent, second, "Please enter a valid email address.");
            if (arg == 0) {
                second.innerHTML = "&nbsp;";
            }
        }
    }
    if (x == "phone") {
        // Valid
        if (checkPhone(firstval)) {
            showok(x);
            hide(x, parent, second);
        } else {
            showcross(x);
            show(x, parent, second, "Please enter a valid phone number.");
            if (arg == 0) {
                second.innerHTML = "&nbsp;";
            }
        }
    }
}

function onInput(x) {
    if (filled[x]) {
        check(x, 0);
    }
}

function onLeave(x) {
    filled[x] = 1;
    check(x, 1);
}

function hideError(x) {
    $('#finalerror' + x).fadeOut();
}

function showError(x, error) {
    $("#finalerror" + x).fadeIn();
    $("#finalerror" + x).html(error);
}

function hideSuccess(x) {
    $('#finalsuccess' + x).fadeOut();
}

function showSuccess(x, success) {
    $("#finalsuccess" + x).fadeIn();
    $("#finalsuccess" + x).html(success);
}

function validCaptcha() {
    if (document.getElementById("captchaTextBox").value != code) {
        createCaptcha();
        return false;
    }
    return true;
}


function disableAll() {
    document.getElementById("submit1").disabled = "true";
    document.getElementById("submit1").innerHTML = "Processing...";
}

function disableAll2() {
    $("#OTPdiv").fadeIn();
    document.getElementById("submit1").disabled = "true";
    document.getElementById("submit1").innerHTML = '<i class="fa fa-paper-plane"></i> Register';
    document.getElementById("name").disabled = "true";
    document.getElementById("designation").disabled = "true";
    document.getElementById("institute").disabled = "true";
    document.getElementById("year").disabled = "true";
    document.getElementById("email").disabled = "true";
    document.getElementById("phone").disabled = "true";
    document.getElementById("captchaTextBox").disabled = "true";
    document.getElementById("terms").disabled = "true";
    $(".event").prop("disabled", true);
}

function validate(form) {
    hideError(1);
    hideSuccess(1);
    if (!validCaptcha()) {
        showError(1, "Invalid Captcha! Please try again!");
        return false;
    }
    var f = 1;
    for (var key in flag) {
        check(key, 0);
        filled[key] = 1;
        if (flag[key] == 0) f = 0;
    }
    if (f == 0) {
        showError(1, "Please enter the correct details.");
        return false;
    }
    if ($("form .event:checked").length == 0) {
        showError(1, "Please select at least one event.");
        return false;
    }
    if (!$("form #terms").is(":checked")) {
        showError(1, "Please check the above box before proceeding.");
        return false;
    }
    disableAll();
    return true;
}

function verifyOTP(form) {
    hideError(1);
    hideSuccess(1);
    hideSuccess(2);
    var otp = document.getElementById("OTPTextBox").value;
    if (otp.length != 6 || !$.isNumeric(otp)) {
        showError(2, "Invalid OTP! Please try again.");
        return false;
    }
    document.getElementById("submit2").disabled = "true";
    document.getElementById("submit2").innerHTML = "Verifying...";
    return true;
}