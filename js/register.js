$(function () {

  /* 默认选项  */
  var error_username = false;
  var error_password = false;
  var error_allow = false;
  var error_code = false;

  /* 用户名 */
  $('#username').blur(function () {
    check_uername();
  })

  $('#username').focus(function () {
    $('.error_username').hide();
  })

  function check_uername() {
    var val = $('#username').val();
    /* 电话格式验证  */
    var phone = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (val.length == 0) {
      $('.error_username').html('手机号码不能为空').show();
      error_username = true;
      return;
    }

    if (phone.test(val)) {
      error_username = false;
    } else {
      error_username = true;
      $('.error_username').html('手机号码由13位数字组成的').show();
    }
  }


  /* 密码 */
  $('#password').blur(function () {
    check_password();
  })

  $('#password').focus(function () {
    $('.error_password').hide();
  })


  function check_password() {
    var val = $('#password').val();
    var reg = /^[a-zA-Z0-9@\$\*\.\!\?]{6,16}$/;
    if (val.length == 0) {
      $('.error_password').html('密码不能为空').show();
      error_username = true;
      return;
    }

    if (reg.test(val)) {
      error_username = false;
    } else {
      error_username = true;
      $('.error_password').html('密码要包含数字字母@$.!?').show();
    }
  }

  /* 验证码 */
   $('.verificat-code').blur(function () {
    check_code();
  })

  $('.verificat-code').focus(function () {
    $('.error_code').hide();
  })


  function check_code() {
    var val = $('.verificat-code').val();
    console.log(val);
    var reg = /^\d{4}$/;
    if (val.length == 0) {
      $('.error_code').html('验证码不能为空').show();
      error_code = true;
      return;
    }

    if (reg.test(val)) {
      error_code = false;
    } else {
      error_code = true;
      $('.error_code').html('验证码由4位数字组成').show();
    }
  }

  /* 同意 */
  $('#allow').tap(function(){
    if ($(this).prop('checked') == true) {
      error_allow = false;
      $('.allow_tip').hide();
    } else {
      error_allow = true;
      $('.allow_tip').show();
    }
  });
    

  $('.regeister').tap(function(){
     check_uername();
     check_password();

     if (error_username == false && error_password == false && error_allow == false && error_code == false ) {
       $.ajax({
          url: 'http://localhost:3000/register',
          type: 'POST',
          data: {
            username: $('#username').val(),
            password: $('#password').val()
          },
          success: function(res){
            if ( res === "注册成功!") {
              window.location.href = "./login.html";
            }
          },
          error: function(error){
            console.log(error);
          }
       })
     }
  });


  $('.getCode').click(function () {
    setTime($(this));
  });

  var m = 60;
  var timer = null;

  function setTime(ele) {
    var _this = ele;
    if (m == 0) {
      ele.removeAttr('disabled');
      ele.val('获取验证码');
      m = 60;
      clearTimeout(timer);
    } else {
      ele.attr('disabled', true);
      ele.val("重新发送" + m + "s");
      m --;
      timer = setTimeout(function () {
        setTime(_this);
      },1000);
    }
  }
})
