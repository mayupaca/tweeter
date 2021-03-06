const tweetText = $("#tweet-text");
console.log(tweetText);

$(function() {
  const MAX_CHAR_LENGTH = 140;
  const tweetText = $("#tweet-text");
  tweetText.on('input', function() {
    const charCount = $(this).val().length;
    const charDisplay = MAX_CHAR_LENGTH - charCount;
    $(".new-tweet-button .counter").text(charDisplay);
    
    if (charDisplay < 0) {
      $(this).parent().find(".counter").text(charDisplay)
      .css("color", "red");
    } else {
      $(this).parent().find(".counter").text(charDisplay)
      .css("color", "#545149");
    }
    
  });
});