$(function () {
    $(".pay-box li span").click(function () {
        $(".pay-box li span").removeClass("bg-white");
        $(this).addClass("bg-white");
    })
    $(".pay-btn").click(function () {
        $(".mask-yzm").show();
        $(".mask-yzm").css("display", "table");

    })

    $("#yzm-cancel").click(function () {
        $(".mask-yzm").hide();
    })

    var wait = 15;
    $(".getyzm").click(function () {
        var phone = $("#phone-input").val();
        // var load = layer.load(1);
        if (!checkmobile(phone)) {
            // layer.close(load);
            return false;
        }

        var ptime = +new Date();
        if (wait == 15) {
            $(".getyzm").html(wait + "S");
            var timer1 = setInterval(function () {
                var ntime = +new Date();
                wait = 15 - Math.round((ntime - ptime) / 1000);
                wait = wait.toString();
                wait.length == 1 ? wait = "0" + wait : wait = wait;
                $(".getyzm").html(wait + "S");
                if (wait <= 0 || wait =="00") {
                    clearInterval(timer1);
                    $(".getyzm").html("重新发送");
                    wait = 15;
                }
            }, 1000)
        }
    })

    $("#yzm-ok").click(function () {

    })
})

//验证手机号码
function checkmobile(phonenume)
{
    if (phonenume == '') {
        layer.msg("请输入正确的手机号码");
        return false;
    }
    if (phonenume.length != 11) {
        layer.msg("请输入正确的手机号码");
        return false;
    }
    var tel = /^1\d{10}$/;
    if (!tel.test(phonenume)) {
        layer.msg("请输入正确的手机号码");
        return false;
    }
    return true;
}
 