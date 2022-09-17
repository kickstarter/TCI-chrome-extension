async function fetchQuotes () {
  try {
    const response = await fetch('https://thecreativeindependent.com/api/v1/quotes.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Could not fetch quotes: ${error}. Using fallback quotes`)

    const response = await fetch('./fallback_quotes.json')
    return await response.json()
  }
}

function chooseRandom (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function fillQuote (quote) {
  const title = document.getElementById('quote__article-title')

  document.getElementById('quote__text').innerHTML = quote.text
  title.innerHTML = quote.post.title
  title.href = quote.post.url

  document.getElementById('quote').classList.remove('loading')
}

document.addEventListener('DOMContentLoaded', function () {
  fetchQuotes().then(quotes => {
    const quote = chooseRandom(quotes)
    fillQuote(quote)
  })
})
