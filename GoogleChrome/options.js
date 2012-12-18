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
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
      status.innerHTML = "";
    }, 1750);
  }

    restore_options();
  $('#save').click(function(){
      save_options();
    });

});

