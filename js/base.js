$(document).ready(function() {
  $("#scenarios").on('change', fillInScenario);
  $("#send").click(makeRequest);
  $("#btn-save-auth").click(saveAuth);

  $('#auth-token').val(localStorage.getItem('auth-token'));
  // $('#account-id').val(localStorage.getItem('account-id'));

  var alerList = $.parseJSON(localStorage.getItem('alert-list')) || [];

  alerList.map(function(alert) {
    addAlert(alert);
  });
});

function saveAuth() {
  localStorage.setItem('auth-token', $('#auth-token').val());
  // localStorage.setItem('account-id', $('#account-id').val());
}

function fillInScenario() {
  var curr_scenario = SCENARIOS[this.value];

  for(var property in curr_scenario) {
    $('#' + property).val(curr_scenario[property]);
  }
}

function prepareData() {
  var resultData = {};
  $(".container input, .container select").each(function() {
    resultData[this.id] = this.value;
  });
  resultData.occured_at = new Date().toISOString();

  return JSON.stringify(resultData);
}

function makeRequest() {
  var options = {
    "async": true,
    "crossDomain": true,
    "url": "https://alerts.freshgame.com/events",
    "method": "POST",
    "headers": {
      "Authorization": localStorage.getItem('auth-token'),
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      // "account-id": localStorage.getItem('account-id')
    },
    "processData": false,
    "data": prepareData(),
    "success": displaySuccess,
    "error": displayError
  }
  
  $.ajax(options);
}

function displaySuccess() {
  $('#result').removeClass().addClass("success");
  displayResponse("Created");

  var curr_list = $.parseJSON(localStorage.getItem('alert-list')) || [];
  curr_list.push(prepareData());
  if(curr_list.length > 50)
    curr_list.shift();
  localStorage.setItem('alert-list', JSON.stringify(curr_list));

  addAlert(prepareData());
}

function displayError(resp){
  console.log(resp);
  $('#result').removeClass().addClass("error");
  displayResponse(resp.statusText, (resp.responseJSON)?resp.responseJSON.errors:'');
}

function displayResponse(title, message) {
  $('#resp-status').text(title);

  if(message)
    $('#resp-status-message').text(message);
  else 
    $('#resp-status-message').text('');

  setTimeout(function() {
    $('#result').removeClass().addClass("soft-hide");
  }, 8000);
}

function addAlert(data) {
  data = $.parseJSON(data);
  var dispData = ['hostname', 'resource', 'status', 'alert_group_key'];
  var li = $('<li />').addClass('card ' + data.status);

  var renderVal = function(idKey) { 
    return ('<b>' + data[idKey] + '</b>');
  }

  dispData.map(function(key) {
    li.append($('<div />').html(key + ' : ' + renderVal(key)));
  });

  $('#alert-list').prepend(li);
}