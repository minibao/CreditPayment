$(function () {

    query_all_repay_init();
    account_info_init();


    //点击还款按钮
    $("#repayment").click(function () {
        $(".qu-fx1").removeClass("qu-select");
        $("#all-repay").addClass("qu-select");
        $(".query").children("div :gt(0)").hide();
        $(".all-repay").show();
    })
    var orderid="";
    //订单勾选按钮
    $(".ck-repay").click(function () {
        orderid="";
        var check = $(this).is(':checked');
        var total = $(".all-repay input[type='checkbox']:checkbox:checked");
        var sum = 0.00;
        if (total.length > 0) {
            for (var i = 0; i < total.length; i++) {
                sum = sum + Number(total.eq(i).parent().parent().find(".sum").html());
                if(i!=total.length-1){
                    orderid = orderid + total.eq(i).parent().parent().find(".orderid").html() + ",";
                }else{
                    orderid = orderid + total.eq(i).parent().parent().find(".orderid").html() + " ";
                }
            }
        }
        sum = sum.toFixed(2);
        var str = '立即支付<span class="red-wd">￥' + sum + '元';
        $("#daizhifu").html(str);
    })

    //待支付按钮
    var wait = 15;
    var uid=123;
    $("#daizhifu").click(function () {
        $(".mask-yzm").show();
        $(".mask-yzm").css("display", "table");

        var ptime = +new Date();
        if (wait == 15) {
            $(".getyzm").html(wait + "S");
            var timer1 = setInterval(function () {
                var ntime = +new Date();
                wait = 15 - Math.round((ntime - ptime) / 1000);
                wait = wait.toString();
                wait.length == 1 ? wait = "0" + wait : wait = wait;
                $(".getyzm").html(wait + "S");
                if (wait <= 0 || wait == "00") {
                    clearInterval(timer1);
                    $(".getyzm").html("重新发送");
                    wait = 15;
                }
            }, 1000);

            var orderIdBatch=orderid;
            console.log(orderIdBatch);
            var imei="";
            var mac="12321";
            var simId="23123213";
            var load = layer.load(1);
            $.ajax({
                url: "https://" + localurl + "/ema-platform/notice/repay",
                type: "get",
                dataType: "json",
                data: {
                    uid:uid,
                    orderIdBatch:orderIdBatch,
                    imei:imei,
                    mac:mac,
                    simId:simId
                },
                error: function() {
                    layer.msg("请求失败！");
                    layer.close(load);
                },
                success: function(data) {
                    layer.close(load);
                    layer.msg(data.message);
                }
            });
        }

    })

    $("#yzm-ok").click(function () {
        var reg = new RegExp(/^\d{6}$/);
        var yzm = $("#yzm-input").val();
        if (!(reg.test(yzm))) {
            layer.msg("请输入有效的6位验证码");
            return false;
        }
        $.ajax({
            url: "http://" + localurl + "/ema-platform-finance/credit/confirmRepay",
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
    })

    $("#yzm-cancel").click(function () {
        $(".mask-yzm").hide();
    })

})

// 全部待还款
function query_all_repay_init() {
    // 计算所有待支付
    var total = $(".sum");
    var sum = 0.00;
    for (var i = 0; i < total.length; i++) {
        sum = sum + Number(total.eq(i).html());
    }
    sum = sum.toFixed(2);
    var str = '待支付<span class="red-wd">￥' + sum + '元';
    $("#daizhifu").html(str);
}
//账户概况
function account_info_init() {
    var load = layer.load(1);
    var uid = "123";
    $.ajax({
        url: "http://" + localurl + "/ema-platform-finance/credit/queryCredit",
        type: "get",
        dataType: "json",
        data: {
            uid: uid
        },
        error: function () {
            layer.close(load);
            layer.msg("请求失败！");
        },
        success: function (data) {
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

}

//立即支付
function immediately_pay() {

}