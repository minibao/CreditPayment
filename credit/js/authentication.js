$(function() {
    var wait = 15;
    //获取验证码
    $("#getyzm").click(function() {
        var phone = $("#bank-phone").val();
        var load = layer.load(1);
        if (!checkmobile(phone)) {
            layer.close(load);
            return false;
        }
        var ptime = +new Date();
        if (wait == 15) {
            $("#getyzm").html(wait + "S");
            var timer1 = setInterval(function() {
                var ntime = +new Date();
                wait = 15 - Math.round((ntime - ptime) / 1000);
                wait = wait.toString();
                wait.length == 1 ? wait = "0" + wait : wait = wait;
                $("#getyzm").html(wait + "S");
                if (wait <= 0 || wait == "00") {
                    clearInterval(timer1);
                    $("#getyzm").html("重新发送");
                    wait = 15;
                }
            }, 1000)

            var uid = "123";
            var load = layer.load(1);
            $.ajax({
                url: "http://" + localurl + "/ema-platform-finance/credit/getCaptcha",
                type: "post",
                dataType: "json",
                data: {
                    uid: uid,
                    mobile: phone
                },
                error: function() {
                    layer.close(load);
                    layer.msg("请求失败！");
                },
                success: function(data) {
                    console.log(data);
                    if (data.result = "000000") {
                        layer.close(load);
                        layer.msg(data.business_result_msg);
                    } else {
                        layer.close(load);
                        layer.msg(data.business_result_msg);
                    }
                }
            });
        } else {
            layer.msg("请求时间过短！");
            layer.close(load);
        }
    })

    //鉴权-授信接口【申请信用额度】
    $("#auth-sub").click(function() {
        var userFullName = $("#name").val();
        if (userFullName == "" || userFullName == null) {
            layer.msg("姓名输入有误！");
            return false;
        }
        var bankCardNo = $("#bankcard").val();
        if (bankCardNo == "" || bankCardNo == null) {
            layer.msg("银行卡号输入有误！");
            return false;
        }
        var idCardNo = $("#idcard").val();
        if (!isCardNo(idCardNo)) {
            return false;
        }
        var phone = $("#bank-phone").val();
        if (!checkmobile(phone)) {
            return false;
        }
        if (!($("#inlineCheckbox").is(":checked"))) {
            layer.msg("请阅读条款并同意！");
            return false;
        }
        var smsCheckCode = $("#checkcode").val();
        if (smsCheckCode == "" || smsCheckCode == null) {
            layer.msg("验证码输入有误！");
            return false;
        }
        var uid = "123"; //deviceType（IOS，ANDROID）,openUdid（IOS用）,deviceImei（安卓用）
        var deviceType = "IOS";
        var openUdid = "";
        var deviceImei = "";
        $.ajax({
            url: "http://" + localurl + "/ema-platform-finance/credit/auth",
            type: "post",
            dataType: "json",
            data: {
                uid: uid,
                idCardNo: idCardNo,
                userPhoneNo: phone,
                bankCardNo: bankCardNo,
                userFullName: userFullName,
                smsCheckCode: smsCheckCode,
                deviceType: deviceType,
                openUdid: openUdid,
                deviceImei: deviceImei
            },
            error: function() {
                layer.close(load);
                layer.msg("请求失败！");
            },
            success: function(data) {
                console.log(data);
                if (data.result = "000000") {
                    layer.close(load);
                    layer.msg(data.business_result_msg);
                    window.location.href="query.html";
                } else {
                    layer.close(load);
                    layer.msg(data.business_result_msg);
                }
            }
        });
    })
})
