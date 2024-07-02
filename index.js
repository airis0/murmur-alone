//配列
var tubuyaki = [];

//ローカルストレージ読み込み
var get_tubuyaki = localStorage.getItem('tubuyaki');

//ローカルストレージの中身がある時のみ配列を再現
if( get_tubuyaki != null){
  tubuyaki = JSON.parse(get_tubuyaki);
}

function tubuyaki_refresh(){

  //全削除
  $('.talk').empty();

  var append_list="";
  //todoリスト更新
  for ( var i = 0; i < tubuyaki.length; i++ ) {

    append_list += "<div class='talk_left'><p>"+tubuyaki[i]+"</p><button id='"+i+"' class='delete-btn'"+">×</button></div>";

  }

  $('.talk').html(append_list);

}


function tubuyaki_focus(){
  //var test = "#"+(tubuyaki.length-1);
  //location.href = test;
  $('#text_area').focus();
}


tubuyaki_refresh();
tubuyaki_focus();


//保存
function tubuyaki_save(){
  //ローカルストレージ保存
  var set_tubuyaki = JSON.stringify(tubuyaki);
  localStorage.setItem('tubuyaki', set_tubuyaki);
}



//削除
$(document).on('click', '.delete-btn', function(){

  var target_no=parseFloat($(this).attr('id'));

  var delete_confirm = window.confirm( tubuyaki[target_no] + "\n\n上記の内容を削除します。\nよろしいですか？");
      
  if(delete_confirm == true){
    tubuyaki.splice( target_no , 1 );
    alert("削除しました。");

    tubuyaki_save();
    tubuyaki_refresh();
    tubuyaki_focus();
    }

})
  


//投稿
$("#post_btn").on('click',function(){
  //テキストエリアの中身取得
  var tubuyaki_text = $('textarea[name="text_area"]').val();

  if( !tubuyaki_text.match(/\S/g) ){
    
    //何も入力されていない(空白の場合)  
    alert("テキストを入力してから「つぶやき」ボタンを押して下さい。");
  
  }else{
    
    //何かしら入力されている場合
    
    //配列に追加。
    tubuyaki.push(tubuyaki_text);

    tubuyaki_save();
    tubuyaki_refresh();
    tubuyaki_focus();

    //テキストエリアを初期化。
    $('textarea[name="text_area"]').val("");

  }
    
})


//localStorage.clear();
