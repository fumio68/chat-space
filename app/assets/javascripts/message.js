$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-chat__message-list__message" data-message-id=${message.id}>
          <div class="main-chat__message-list__message__top-box">
            <div class="main-chat__message-list__message__top-box__user-name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__message__top-box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="ain-chat__message-list__message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="main-chat__message-list__message" data-message-id=${message.id}>
          <div class="main-chat__message-list__message__top-box">
            <div class="main-chat__message-list__message__top-box__user-name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__message__top-box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-list__message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
    })
  });
});