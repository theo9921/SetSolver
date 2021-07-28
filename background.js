function start(click) {
    const tiles = document.body.querySelectorAll(
      '.MuiPaper-root.MuiPaper-rounded>div[style^="position: absolute"]>div'
    )
  
    const visibleTiles = []
    const parsed = []
    tiles.forEach((t) => {
      // reset
      t.removeAttribute('highlight')
      // Not all tiles are visible
      if (isVisible(t)) {
        let p = parseTile(t)
        visibleTiles.push(t)
        parsed.push(p)
      }
    })
    console.log(parsed)
    const indicesToMark = getSet(parsed)
    for (let i of indicesToMark) {
      visibleTiles[i].setAttribute('highlight', '')
      if (click) {
        visibleTiles[i].click()
      }
    }
  }
  
  function isVisible(el) {
    return el.parentElement.style.visibility === 'visible'
  }
  
  function parseTile(el) {
    const number = el.childElementCount
    const symbol = el.firstChild.lastChild.getAttribute('href')
    const color = el.firstChild.lastChild.getAttribute('stroke')
    const fill =
      el.firstChild.firstChild.getAttribute('fill') === 'transparent'
        ? 'hollow'
        : el.firstChild.firstChild.getAttribute('mask')
    return { number, symbol, color, fill }
  }
  
  function getSet(tiles) {
    for (let a = 0; a < tiles.length - 2; a++) {
      for (let b = a + 1; b < tiles.length - 1; b++) {
        for (let c = b + 1; c < tiles.length; c++) {
          if (isSet(tiles[a], tiles[b], tiles[c])) {
            return [a, b, c]
          }
        }
      }
    }
    return []
  }
  
  function isSet(a, b, c) {
    return ['number', 'symbol', 'color', 'fill'].every((p) => {
      const result = isCategoryPassed([a, b, c], p)
      return result
    })
  }
  
  function isCategoryPassed(tiles, property) {
    let properties = tiles.map((t) => t[property])
    return isSame(properties) || isDifferent(properties)
  }
  
  function isSame(array) {
    return array.every((v) => v === array[0])
  }
  
  function isDifferent(array) {
    return new Set(array).size === array.length
  }
  alert("Get ready to destroy Adryana. Press SPACEBAR to highlight a set");
  document.body.addEventListener('keydown', function (event) {
    if (document.activeElement.tagName === 'INPUT') {
      // ignore if typing in chat
      return
    }
    if (event.keyCode == 32) {
      start()
    }
  })
  
  