var words = []
var good = []
var bad = []

document.addEventListener('DOMContentLoaded', function () {

  for (let w in data) 
    words.push(w)

  let word = words[Math.floor(Math.random() * words.length)]

  worddisplay.innerHTML = word

  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 38) {
      e.preventDefault()
      good.push(word)
      word = words[Math.floor(Math.random() * words.length)]
    }
    if (e.keyCode === 40) {
      e.preventDefault()
      bad.push(word)
      word = words[Math.floor(Math.random() * words.length)]
    }
    worddisplay.innerHTML = word
  })


  var hammertime = new Hammer(document.querySelector('html'))
  hammertime.on('swipeleft', function (ev) {
    bad.push(word)
    word = words[Math.floor(Math.random() * words.length)]
    worddisplay.innerHTML = word
  })

  hammertime.on('swiperight', function (ev) {
    good.push(word)
    word = words[Math.floor(Math.random() * words.length)]
    worddisplay.innerHTML = word
  })
})

function export_csv() {
  let rows = []
  rows.push('data:text/csv;charset=utf-8,Word,Interesting,POS')
  for (let word of good) {
    rows.push(word + ',' + '1,'+data[word])
  }
  for (let word of bad) {
    rows.push(word + ',' + '0,'+data[word])
  }
  let csv = rows.join("\n")
  var encodedUri = encodeURI(csv);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "interest_data.csv");
  document.body.appendChild(link);
  link.click()
}

