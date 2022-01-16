/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// $(document).ready(function () {
//   console.log("hello");
// });

$(function() {

  $("form").on("submit", function (event) {
    event.preventDefault();

    $(".errorMessage").slideUp().text("");

    const charCount = $("textarea").val().length;
    const MAX_CHAR_LENGTH = 140;

    if (charCount > MAX_CHAR_LENGTH) {
      return $(".errorMessage").text("Your tweet is more than 140 characters").slideDown();
    }
    if (!$("textarea").val()) {
      return $(".errorMessage").text("Please tweet something.").slideDown();
    }

    const queryString = $(this).serialize();
    $.ajax("/tweets", { method: "POST", data: queryString })
      .then(function() {
        $("textarea").val("")
        $.ajax("/tweets", { method: "GET" })
          .then(function(tweets) {
            const newTweetData = tweets[tweets.length - 1];
            renderTweets([newTweetData]);
          });
      });
    });

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (tweets) {
      renderTweets(tweets);
    });
  };

  const renderTweets = function (tweets) {
    // tweets is a list of tweets
    // tweets -> loop thru it
    tweets.forEach(function (tweet) {
      let element = createTweetElement(tweet);
      $("#tweets-container").prepend(element);
    });
  };

  //escape function for safe user input
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweetData) {
    let $tweet = $(`
    <article class="tweet">
      <header class="article-header">
      <div class="name-avatar">
        <img src=${escape(tweetData.user.avatars)}/>
        <h2 class="name">${escape(tweetData.user.name)}</h2>
      </div>
        <h2 class="account">${escape(tweetData.user.handle)}</h2>
      </header>
      <div class="tweet-body">
        <p><b>
        ${escape(tweetData.content.text)}
        </b></p>
      </div>
      <footer class="article-footer">
        <h5>${escape(timeago.format(tweetData.time))}</h5>
        <div class="icon">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
        </footer>
    </article>
  `);
    return $tweet;
  };

  loadTweets();
});


//   const data = [
//     {
//       user: {
//         name: "Newton",
//         avatars: "https://i.imgur.com/73hZDYK.png",
//         handle: "@SirIsaac",
//       },
//       content: {
//         text: "If I have seen further it is by standing on the shoulders of giants",
//       },
//       created_at: 1461116232227,
//     },
//     {
//       user: {
//         name: "Descartes",
//         avatars: "https://i.imgur.com/nlhLi3I.png",
//         handle: "@rd",
//       },
//       content: {
//         text: "Je pense , donc je suis",
//       },
//       created_at: 1461113959088,
//     },
//   ];

//   renderTweets(data);
  
// const loadTweets = function () {
//   $.ajax({
//     url: "/tweets/",
//     method: "GET",
//   }).done(function ($tweet) {
//     renderTweets($tweet);
//   });
// };

// const time = timeago.format(tweet.created_at); 

