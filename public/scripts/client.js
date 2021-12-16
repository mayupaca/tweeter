/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// $(document).ready(function () {
//   console.log("hello");
// });
$(function () {
  const renderTweets = function (tweets) {
    // tweets is a list of tweets
    // tweets -> loop thru it
    tweets.forEach(function (tweet) {
      // data.username -> tweet === data
      let element = createTweetElement(tweet);
      $("#tweets-container").prepend(element);
    });
  };

  const createTweetElement = function (tweetData) {
    let $tweet = $(`
  <article class="tweet">
    <header class="article-header">
      <h2 class="name">${tweetData.user.name}</h2>
      <h2 class="account">${tweetData.user.name}</h2>
    </header>
    <div class="tweet-body">
      <p><b>
       ${tweetData.content.text}
      </b></p>
    </div>
    <footer class="article-footer">
      <h5>${timeago.format(tweetData.created_at)}</h5>
      <div class="icon">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
      </footer>
  </article>`);
    return $tweet;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});