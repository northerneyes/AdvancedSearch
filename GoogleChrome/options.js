$(function(){
  $('.checkbox').addClass('intend');

    function restore_options()
    {
      console.log("Options restored");

      var search_on_site_default = localStorage["search_on_site_default"] == undefined ? true : localStorage["search_on_site_default"];
      var show_exactly_phrase = localStorage['show_exactly_phrase'] == undefined ? true : localStorage["show_exactly_phrase"];
      var show_filesearch =     localStorage['show_filesearch'] == undefined ? true : localStorage["show_filesearch"];
      var show_relatedsearch =  localStorage['show_relatedsearch'] == undefined ? true : localStorage["show_relatedsearch"];

      $('#toogle_search_on_site').prop('checked', toBool(search_on_site_default));
      $('#toogle_show_exactly_phrase').prop('checked', toBool(show_exactly_phrase));
      $('#toogle_show_filesearch').prop('checked', toBool(show_filesearch));
      $('#toogle_show_relatedsearch').prop('checked', toBool(show_relatedsearch));

      //language
      $('#search_title').html(chrome.i18n.getMessage("search_title"));
      $('#toogle_search_on_site').next().html(chrome.i18n.getMessage("settings_search_on_site"));

      $('#appearance_title').html(chrome.i18n.getMessage("appearance_title"));
      $('#toogle_show_exactly_phrase').next().html(chrome.i18n.getMessage("settings_show_exactly_phrase"));
      $('#toogle_show_filesearch').next().html(chrome.i18n.getMessage("settings_show_filesearch"));
      $('#toogle_show_relatedsearch').next().html(chrome.i18n.getMessage("settings_show_related_search"));

     // $('#language_title').find('span').html(chrome.i18n.getMessage("language_title"));
     // $('#save').html(chrome.i18n.getMessage("settings_save_button"));
    }

  //Восстанавливаем значения из localStorage
 //Сохраняем опции
  function save_options()
  {
    //Search
    localStorage["search_on_site_default"] = $('#toogle_search_on_site').is(':checked');

    //Appearance
    localStorage['show_exactly_phrase'] = $('#toogle_show_exactly_phrase').is(':checked');
    localStorage['show_filesearch'] = $('#toogle_show_filesearch').is(':checked');
    localStorage['show_relatedsearch'] = $('#toogle_show_relatedsearch').is(':checked');

       // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = chrome.i18n.getMessage("settings_save_label");
    setTimeout(function() {
      status.innerHTML = "";
    }, 1750);
  }

    restore_options();
  $('#save').click(function(){
      save_options();
    });

});

