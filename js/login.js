/*  
  苏宁易购移动端注册验证
  @param error_username  校验账户是否有错
  @param error_password  校验密码是否有错 
*/

$(function(){

  var show = true; 
  $('.icon-eye-close').click(function(){
    var password = document.querySelector('#password');
    if (show) {
       password.type = "password";
       show = false;
    } else {
       password.type = "text";
       show = true;
    }
  
  });
  /* 默认选项  */
  var error_username = false;
  var error_password = false;

  /* 用户名 */
  $('#username').blur(function(){
     check_uername();
  }) 

  $('#username').focus(function(){
    $('.error_tip').hide();
  })

  function check_uername() {
    var val = $('#username').val();
    /* 电话格式/邮箱格式验证  */
    var phone = /^\w{5,20}$/i;
    var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (val.length == 0) {
      $('.error_tip').html('用户名不能为空').show();
      error_username = true;
      return;
    }

    if (phone.test(val) || email.test(val)) {
      error_username = false;
    }  else {
      error_username = true;
      $('.error_tip').html('用户名是包含数字,字母,下划线,@的5到20位字符').show();
    }
  }


  /* 密码 */
  $('#password').blur(function(){
     check_password();
  }) 

  $('#password').focus(function(){
    $('.error_tip').hide();
  })

  
  function check_password() {
    var val = $('#password').val();
    var reg = /^[a-zA-Z0-9@\$\*\.\!\?]{6,16}$/;
    if (val.length == 0) {
      $('.error_tip').html('密码不能为空').show();
      error_username = true;
      return;
    }

    if (reg.test(val)) {
      error_username = false;
    }  else {
      error_username = true;
      $('.error_tip').html('密码是包含数字、字母,还包含@$.!?的6到16位字符').show();
    }
  }

  /* 发送ajax请求到后台验证是否存在账户 */
  $('.login-button').tap(function(){
      check_uername();
      check_password();
      if (error_username == false && error_password == false) {
        $.ajax({
          url: 'http://localhost:3000/login',
          type: 'POST',
          data: {
            username: $('#username').val(),
            password: $('#password').val()
          },
          success: function(res){
            if (res == "登录成功!") {
              sessionStorage.setItem("username",$("#username").val());
              setTimeout(function(){
                window.location.href="member.html";
              },500);
            } else {
                $('.error_tip').html('亲,还没账户吧,去注册一个 ^_^').show().css('color','#f60');
            }
          },
          error: function(error) {
            alert(error);
          }
        }) 
      } else {
        return;
      }
  })  
})