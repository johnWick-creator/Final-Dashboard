$(document).ready(function() {
  let datatableCont

  $("#menu-onoff").click(function() {     //add the class to the clicked element
    $('.left-bar').toggleClass("showhide");
    $('.main-content').toggleClass("main-full");
    $('.left-bar').toggleClass("mob-menu");
  });

  $("#menu-onoff-mob").click(function() {
    $('.left-bar.mob-menu').toggleClass("mob-open");
    $('.sidebar-overlay').toggleClass("overlay-show");
  });

  $(".sidebar-overlay").click(function() {
    $('.left-bar.mob-menu').toggleClass("mob-open");
    $('.sidebar-overlay').toggleClass("overlay-show");
  });

  $(".toggle-left-menu").click(function() {
    $('.left-bar').toggleClass("small-left-bar");
    $('.main-content').toggleClass("big-content");
    $('.toggle-left-menu').toggleClass("active");
  });

  $(document).on('submit', 'form', async function(e) {
    e.preventDefault()
    let err = 0
    $(this).find('input,select,textarea').each(function() {
      if($(this).prop('required')) {
        let val = $(this).val()
        if(!val) {
          err++
          $(this).addClass('is-invalid')
          setTimeout(() => {
            $(this).removeClass('is-invalid')
          }, 3000)
        }
      }
    })
    if(err > 0) return
    let body = $(this).serializeObject()
    if($(this).find('button:last').attr('name')) {
      body[$(this).find('button:last').attr('name')] = 1
    }
    let action = $(this).attr('action')
    let method = $(this).attr('method')
    let onComplete = $(this).attr('onComplete')
    let before = $(this).attr('before')
    let appendGlobal = $(this).attr('appendglobal')
    let errHandler = $(this).attr('onErr')
    let errHandle = functions.globalAJaxErrorHandler
    if(errHandler && typeof functions[errHandler] == "function") {
      errHandle = functions[errHandler]
    }
    let beforeData = ''
    if(before && typeof functions[before] == "function") {
      console.log('Before function')
      beforeData = await functions[before](body)
      body.beforeData = beforeData
    }
    if(appendGlobal) {
      body.globalVars = globalVars
    }
    if(action && typeof functions[onComplete] == "function") {
      let apiUrl = action
      let ajaxBody = {
        url: apiUrl,
        method: method,
        data: body,
        success: functions[onComplete],
        error: errHandle
      }
      let encType = $(this).attr('enctype')
      if(encType && encType == "multipart/form-data") {
        body = new FormData($(this)[0])
        let button = $(this).find('button[type="submit"]')
        if(button) {
          if($(button).attr('type') == "submit" && $(button).attr('name')) {
            body.append($(button).attr('name'), 1);
          }
        }
        if(beforeData) {
          body.append('beforeData', JSON.stringify(beforeData));
        }
        if(appendGlobal) {
          body.append('beforeData', JSON.stringify(globalVars));
        }
        ajaxBody.data = body
        ajaxBody.contentType = false
        ajaxBody.processData = false
      }
      if($(this).attr('authenticated') === "true") {
        ajaxBody.headers = { "Authorization": $.cookie('token') }
      }
      console.log('running Ajaxs')
      console.log(ajaxBody)
      $.ajax(ajaxBody)
    }
  })

  $('.logout').click(function(e) {
    e.preventDefault()
    expireAllCookies('token', ['/', '/env-test-9743247/']);
    window.location.reload()
  });

  $("#applyFilters").click(function() {
    let errors = 0
    let apiCall = $(this).attr('apiCall')
    if(!apiCall) {
      showToast("No api call", "warning")
      return
    }
    let startDateInput = $("input[name='startDate']")
    let endDateInput = $("input[name='endDate']")
    if(!startDateInput || !endDateInput) {
      showToast("Inputs missing", "warning")
      return
    }
    let startDate = $(startDateInput).val()
    let endDate = $(endDateInput).val()
    if(!startDate) {
      $(startDateInput).addClass("is-invalid")
      setTimeout(() => {
        $(startDateInput).removeClass("is-invalid")
      }, 2000)
      errors++
    }
    if(!endDate) {
      $(endDateInput).addClass("is-invalid")
      setTimeout(() => {
        $(endDateInput).removeClass("is-invalid")
      }, 2000)
      errors++
    }
    if(errors == 0) {
      showLoadingS()
      let data = { startDate, endDate }
      data[apiCall] = 1
      $.ajax({
        url: "api.php",
        method: "POST",
        data,
        success: function(res) {
          if(res.success) {
            let table = $('.dataTable-container').DataTable()
            table.clear().draw()
            let surveys = res.surveys
            for(let i = 0; i < surveys.length; i++) {
              let survey = surveys[i]
              let srNo = i + 1
              let date = survey.datetime
              let name = survey.user_name
              if(!name) {
                name = "Anonyme"
              }
              let actionButton = "<td><a href='viewSurvey.php?id="+survey.id+"' class='btn btn-primary'>Voir</td>"
              let newArr = [srNo, date, name, actionButton]
              table.row.add(newArr).draw();
            }
            Swal.close()
          }
          else {
            showToast(res.message, "error")
          }
        }
      })
    }
  })

  function expireAllCookies(name, paths) {
    var expires = new Date(0).toUTCString();
    document.cookie = name + '=; expires=' + expires;
    for (var i = 0, l = paths.length; i < l; i++) {
        document.cookie = name + '=; path=' + paths[i] + '; expires=' + expires;
    }
  }



  //Toast
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })

  function showToast(title, icon, callback = null) {
    Toast.fire({
      icon: icon,
      title: title,
      didClose: () => { if(typeof callback == "function") callback() }
    })
  }

  function showLoadingS() {
    Swal.fire({
      html: "<i class='fa fa-circle-notch fa-spin' style='font-size: 2rem;'></i><h2 class='swal2-title' id='swal2-title' style='display: block;'>Loading</h2>",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false
    })
  }

  //Functions
  let functions = {
    showLoading: function() {
      showLoadingS()
    },
    showToast,
    testApiRes: function(res) {
      console.log(res)
    },
    defaultApiRes: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        window.location.reload()
      }
      else {
        showToast(res.message, 'error')
      }
    },
    defaultApiAndTryBackRes: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        if(typeof document.referrer !== undefined) {
          return window.location = document.referrer
        }
        window.location.reload()
      }
      else {
        showToast(res.message, 'error')
      }
    },
    addUserApiRes: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        var fullURL = window.location.href;
        return window.location = window.location + '/editUser.php?id='+res.id;
      }
      else {
        showToast(res.message, 'error')
      }
    },
    loginLoading: function() {
      $('#errField').removeClass('alert-danger')
      $('#errField').text('Loading...')
      $('#errField').fadeIn()
    },
    login: function(res) {
      if(res.success) {
        $('#errField').removeClass('alert-danger')
        $('#errField').addClass('alert-success')
        $('#errField').text(res.message)
        $('#errField').fadeIn()
        if(res.refreshToken) {
          $.cookie('refreshToken', res.refreshToken, { expires: 30, path: '/' });
        }
        functions.addToken(res.token)
      }
      else {
        $('#errField').removeClass('alert-success')
        $('#errField').addClass('alert-danger')
        $('#errField').text(res.message)
        $('#errField').fadeIn()
        Swal.close()
      }
    },
    userAdd: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        $('input, select').val('')
      }
      else {
        showToast(res.message, 'error')
      }
    },
    userChange: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        window.location.reload()
      }
      else {
        showToast(res.message, 'error')
      }
    },
  intervenantChange: function(res) {
    if(res.success) {
      showToast(res.message, 'success')
      window.location.reload()
      // window.location.href = '/intervenants.php'
    }
    else {
      showToast(res.message, 'error')
    }
  },
    eventChange: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        // window.location.reload()

      }
      else {
        showToast(res.message, 'error')
      }
    },
    loginErr: function(e) {
      let resp = e.responseJSON
      $('#errField').removeClass('alert-success')
      $('#errField').addClass('alert-danger')
      $('#errField').text(resp.message)
      $('#errField').fadeIn()
      Swal.close()
    },
    reset: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        functions.redirect('index.php');
      }
      else {
        showToast(res.message, 'error')
      }
    },
    forgot: function(res) {
      if(res.success) {
        $('#status').attr('class', 'alert')
        $('#status').addClass('alert-success')
        $('#status').text(res.message)
        $('#status').fadeIn()
        Swal.close()
      }
      else {
        $('#status').attr('class', 'alert')
        $('#status').addClass('alert-danger')
        $('#status').text(res.message)
        $('#status').fadeIn()
        Swal.close()
      }
    },
    resetErr: function(e) {
      let resp = e.responseJSON
      $('#status').attr('class', 'alert')
      $('#status').addClass('alert-danger')
      $('#status').text(resp.message)
      $('#status').fadeIn()
      Swal.close()
    },
    changeAvatar: function(res) {
      if(res.success) {
        showToast(res.message, 'success')
        window.location.reload()
      }
      else {
        showToast(res.message, 'error')
      }
    },
    permHandler: function(res) {
      if(res.success) {
        let permissions = res.permissions
        $('#permContainer').find('.perm').each(function() {
          let permName = $(this).attr('for')
          let name = $(this).attr('name')
          let toCheck = $(this).attr('toCheck')
          // Check if permission contains 2 type of data
          if(toCheck == "specs") {
            let specs = permissions.specs
            let count = specs.length
            for(let i = 0; i < count; i++) {
              let perm = specs[i]
              if(perm.name == name && perm.page == permName) {
                let serialized = perm.data
                if(typeof PHPUnserialize != undefined) {
                  let obj = PHPUnserialize.unserialize(serialized)
                  obj = JSON.stringify(obj)
                  obj = obj.replaceAll('"', "'")
                  if(!obj) {
                    obj = {}
                  }
                  $(this).attr('extra', obj)
                }
                break;
              }
            }
          }
          // Check if it is 1 type of data
          else if(toCheck == "types") {
            let types = permissions.types
            let count = types.length
            let permAllowed = false
            for(let i = 0; i < count; i++) {
              let perm = types[i]
              if(perm.permissionType == name && perm.page == permName) {
                $(this).prop('checked', true)
                permAllowed = true
                break;
              }
            }
            if(!permAllowed) {
              $(this).prop('checked', false)
            }
          }
        })
        showToast(res.message, 'success')
      }
      else {
        showToast(res.message, 'error')
      }
    },
    addToken: function(token) {
      $.cookie('token', token, { expires: 7, path: '/' });
      functions.redirect('dashboard.php')
    },
    redirect: function(url) {
      window.location.replace(url)
    },
    globalAJaxErrorHandler: function(e) {
      let resp = e.responseJSON
      if(resp) {
        showToast(resp.message, 'error')
      }
    },
    redirectOnSuccess: function(res, url) {
      if(res.success) {
        showToast(res.message, 'success')
        functions.redirect(url)
      }
      else {
        showToast(res.message, 'error')
      }
    }
  }

  if(typeof transferValues == "function") {
    transferValues(functions)
  }

  if($('.requiredCheckbox').length > 0){
    $('.requiredCheckbox').each(function(){
      var requiredCheckboxes = $(this).find(':checkbox[required]');

      requiredCheckboxes.change(function(){
        if($(this).is(':checked')) {

          $(this).closest('.requiredCheckbox').find('input[type="checkbox"]').each(function(){
              $(this).removeAttr('required');
            });
          }else{
            let error = true;
            $(this).closest('.requiredCheckbox').find('input[type="checkbox"]').each(function(){
              if($(this).is(':checked')){
                error = false
              }
            });
            if(error){
              $(this).closest('.requiredCheckbox').find('input[type="checkbox"]').each(function(){
                $(this).prop('required',true);
              });
            }
          }
        });
    });
  }

  datatableCont = $('.dataTable-container').DataTable({
    "pageLength": 50,
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.11.3/i18n/fr_fr.json"
    }
  });


  $("button[name='addUser']").click(function() {
    let symbolTest = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    let username = $("#username").val()
    let check = symbolTest.test(username)
    if(!check) {
      $("#username").removeClass("is-invalid")
      $(".usernameInvalid").hide()
      $("form").submit()
      return
    }
    else {
      $(".usernameInvalid").text("Please use characters and numbers, symbols are not allowed")
      $(".usernameInvalid").show()
      $("#username").addClass("is-invalid")
      return
    }
  })

  $("#username").keyup(function() {
    let symbolTest = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    let username = $("#username").val()
    let check = symbolTest.test(username)
    if(!check) {
      $("#username").removeClass("is-invalid")
      $(".usernameInvalid").hide()
      return
    }
    else {
      $(".usernameInvalid").text("Please use characters and numbers, symbols are not allowed")
      $(".usernameInvalid").show()
      $("#username").addClass("is-invalid")
      return
    }
  })

  $(".showPassword").click(function() {
    let icon = $(this).find("i")
    if($(icon).hasClass("fa-eye")) {
      $(icon).removeClass("fa-eye")
      $(icon).addClass("fa-eye-slash")
      $("#password").attr("type", "text")
    }
    else {
      $(icon).removeClass("fa-eye-slash")
      $(icon).addClass("fa-eye")
      $("#password").attr("type", "password")
    }
  })

  $(".generatePassword").click(function() {
    let passwordGenerated = generatePassword(20)
    $("#password").val(passwordGenerated)
    if($(".showPassword i").hasClass("fa-eye")) {
      $(".showPassword").trigger("click")
    }
  })

  function generatePassword(count) {
    const letter = "0123456789ABCDEFGHIJabcdefghijklmnopqrstuvwxyzKLMNOPQRSTUVWXYZ0123456789abcdefghiABCDEFGHIJKLMNOPQRST0123456789jklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i < count; i++) {
        const randomStringNumber = Math.floor(1 + Math.random() * (letter.length - 1));
        randomString += letter.substring(randomStringNumber, randomStringNumber + 1);
    }
    return randomString
  }

});
