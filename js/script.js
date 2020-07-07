//  http://157.230.17.132:3017/todos/

$(document).ready(function() {

  getAllItemsSaved();

  // Evento al click dell Bottone Aggiungu
  $('#add-item').click(getNewItem);



});

// FUNCTIONS
// Chiamata Ajax GET dell'API per stampare le attività salvate
// nel server
function getAllItemsSaved() {
  $('#todo-list').html('');

  $.ajax(
    {
      url: 'http://157.230.17.132:3017/todos/',
      method: 'GET',
      success: function(dataResponse) {

        // Utilizzo Handlebars per copiare il template della li
        var source = $('#list-item-template').html();
        var template = Handlebars.compile(source);

        // Avvio un ciclo for per leggere tutti gli oggetti presetni nell'API
        for (var i = 0; i < dataResponse.length; i++) {
          var singleItem = dataResponse[i];

          // Compilo il template
          var context = {
            text: singleItem.text,
            id: singleItem.id,
          };
          var html = template(context);

          // Appendo il template compilato alla lista su html
          $('#todo-list').append(html);
        }
      },
      error: function(richiesta, stato, errore) {
        alert('Attenzione, si è verificato un errore: ' + errore);
      }
    }
  );
};


function getNewItem() {
  var newItem = $('#write-item').val();

  if(newItem.length > 0) {
    $.ajax(
      {
        url: 'http://157.230.17.132:3017/todos/',
        method: 'POST',
        data: {
          text: newItem,
        },
        success: function() {
          getAllItemsSaved();
        },
        error: function() {
          alert("Non sono riuscito ad aggiungere l'attività da te inserita");
        }
      }
    );
  } else {
    alert('Inserisci una attività');
  }


  $('#write-item').val('');
}
