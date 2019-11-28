$(document).ready(function() {
  $("#scenarios").on('change', fillInScenarioDefault);
  $("#custom-scenarios-list").on('change', fillInScenarioCustom);
  $("#send").click(makeRequest);
  $("#btn-save-auth").click(saveAuth);
  $("#btn-save-sceanrio").click(saveScenario);
  $("#switch-scenario").click(swtichScenarios);

  ams_url = localStorage.getItem('url') || ams_url;

  $('#auth-token').val(localStorage.getItem('auth-token'));
  $('#ams-url').val(ams_url);

  var alerList = $.parseJSON(localStorage.getItem('alert-list')) || [];
  updateScenarioDropdown();

  

  alerList.map(function(alert) {
    addAlert(alert);
  });
});

function swtichScenarios() {
  ($(this).find('span').text() === 'Custom') ? $(this).find('span').text('Default') : $(this).find('span').text('Custom');
  $('.scenario-list-container').toggleClass('hide');
}

function saveAuth() {
  ams_url = $('#ams-url').val();
  localStorage.setItem('auth-token', $('#auth-token').val());
  localStorage.setItem('url', ams_url);
  // localStorage.setItem('account-id', $('#account-id').val());
}

function saveScenario() {
  var scenarioName = $('#scenario-name').val();
  if(scenarioName.length) {
    var customScenarios = $.parseJSON(localStorage.getItem('custom-scenarios')) || {};
    if(customScenarios[scenarioName] === undefined) {
      customScenarios[scenarioName] = $.parseJSON(prepareData());
      localStorage.setItem('custom-scenarios', JSON.stringify(customScenarios));
      $('#scenario-name').val('');
      updateScenarioDropdown();
    }
  }
}

function updateScenarioDropdown() {
  custom_loaded_scenarios = $.parseJSON(localStorage.getItem('custom-scenarios')) || {};
  var scenario;
  $("#custom-scenarios-list option[value]").remove();
  for(scenario in custom_loaded_scenarios) {
    var option = $('<option />').val(scenario);
    $(option).text(scenario);
    $("#custom-scenarios-list").append(option);
  }
}

function fillInScenarioDefault() {
  var curr_scenario = SCENARIOS[this.value];

  for(var property in curr_scenario) {
    $('#' + property).val(curr_scenario[property]);
  }
}

function fillInScenarioCustom() {
  var curr_scenario = custom_loaded_scenarios[this.value];

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
    "url": ams_url,
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
  $('#resp-severity').text(title);

  if(message)
    $('#resp-severity-message').text(message);
  else 
    $('#resp-severity-message').text('');

  setTimeout(function() {
    $('#result').removeClass().addClass("soft-hide");
  }, 8000);
}

function addAlert(data) {
  data = $.parseJSON(data);
  var dispData = ['hostname', 'resource', 'severity', 'alert_group_key'];
  var li = $('<li />').addClass('card ' + data.severity);

  var renderVal = function(idKey) { 
    return ('<b>' + data[idKey] + '</b>');
  }

  dispData.map(function(key) {
    li.append($('<div />').html(key + ' : ' + renderVal(key)));
  });

  $('#alert-list').prepend(li);
}