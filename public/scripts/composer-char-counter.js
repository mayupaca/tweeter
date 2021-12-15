const tweetText = $("#tweet-text");
console.log(tweetText);

$(function() {
  const MAX_CHAR_LENGTH = 140;
  const tweetText = $("#tweet-text");
  tweetText.on('input', function() {
    const charCount = $(this).val().length;
    const charDisplay = MAX_CHAR_LENGTH - charCount;
    $('.tweet-counter .counter').text(charDisplay);
  });
});