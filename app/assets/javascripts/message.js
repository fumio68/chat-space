$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-chat__message-list__message" data-message-id=${message.id}>
          <div class="main-chat__message-list__message__top-box">
            <p class="main-chat__message-list__message__top-box__user-name">
              ${message.user_name}
            </p>
            <p class="main-chat__message-list__message__top-box__date">
              ${message.created_at}
            </p>
          </div>
          <div class="main-chat__message-list__message__text">
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
            <p class="main-chat__message-list__message__top-box__user-name">
              ${message.user_name}
            </p>
            <p class="main-chat__message-list__message__top-box__date">
              ${message.created_at}
            </p>
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
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })

    .always(function() {
      $(".main-chat__form__box__submit-btn").removeAttr("disabled");
    })
  })
});