//localurl
var localurl="192.168.10.104:8081";

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
//验证身份证号码
function isCardNo(card)  
{  
   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
   if(reg.test(card) === false)  
   {  
       layer.msg("身份证输入不合法");
       return  false;  
   }
   return true;
}