$(function(){

  var buildHTML = function(message){
    if (message.content && message.image) {
      var html =
        `<div class="main-chat__message-list__message" data-message-id=` + message.id + `>` +
          `<div class="main-chat__message-list__message__top-box">` +
            `<p class="main-chat__message-list__message__top-box__user-name">` +
              message.user_name +
            `</p>` +
            `<p class="main-chat__message-list__message__top-box__date">` +
              message.created_at +
            `</p>` +
          `</div>` +
          `<div class="main-chat__message-list__message__text">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
          `</div>`
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>`
    } else if (message.content) {
      var html =
        `<div class="main-chat__message-list__message" data-message-id=` + message.id + `>` +
          `<div class="main-chat__message-list__message__top-box">` +
            `<p class="main-chat__message-list__message__top-box__user-name">` +
              message.user_name +
            `</p>` +
            `<p class="main-chat__message-list__message__top-box__date">` +
              message.created_at +
            `</p>` +
          `</div>` +
          `<div class="main-chat__message-list__message__text">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
          `</div>`
    } else if (message.image) {
      var html =
        `<div class="main-chat__message-list__message" data-message-id=` + message.id + `>` +
          `<div class="main-chat__message-list__message__top-box">` +
            `<p class="main-chat__message-list__message__top-box__user-name">` +
              message.user_name +
            `</p>` +
            `<p class="main-chat__message-list__message__top-box__date">` +
              message.created_at +
            `</p>` +
          `</div>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>`
    };
      return html;
  };

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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main-chat__message-list__message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      // dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
     //追加するHTMLの入れ物を作る
      var insertHTML = '';
     //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
     //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  };

});