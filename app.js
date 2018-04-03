(function () {
  var randomizedNumber = function (length) {
    return Math.floor(Math.random() * length);
  }

  var Quote = {
    htmlEncode: function (str) {
      return str.replace(/&(r|l)dquo;/g, '&$1squo;')
                .replace(/\u201D/g, '&rsquo;')
                .replace(/\u201C/g, '&lsquo;');
    },

    random: function (data) {
      return data[randomizedNumber(data.length)];
    },

    injector: function (data) {
      var quote = this.random(data);
      var text = this.htmlEncode(quote.text);

      document.getElementsByClassName('quote__text')[0].innerHTML = '&ldquo;'.concat(text, '&rdquo;');
      document.getElementsByClassName('quote__article-title')[0].innerHTML = quote.post.title;
      document.getElementsByClassName('quote__article-url')[0].href = quote.post.url;
      document.getElementsByClassName('quote__article-url')[0].innerHTML = quote.post.url;
    }
  }

  fetch('http://tci-devsite.s3-website-us-east-1.amazonaws.com/api/v1/quotes.json').then(function (response) {
    if (response.status !== 200) {
      Quote.injector(window.fallbackData);
    }
    response.json().then(function (data) {
      Quote.injector(data);
    });
    document.getElementsByClassName('quote')[0].classList.add('quote--loaded');
  })
  .catch(function (err) {
    Quote.injector(window.fallbackData);
  });
})();
