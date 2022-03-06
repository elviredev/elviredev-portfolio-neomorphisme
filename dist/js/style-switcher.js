/**
 * TOGGLE STYLE SWITCHER
 */

const styleWitcher = document.querySelector('.style-switcher')
const styleSwitcherToggler = document.querySelector('.style-switcher-toggler')

styleSwitcherToggler.addEventListener('click', () => {
  styleWitcher.classList.toggle('open')
})

// HIDE 'style-switcher' ON SCROLL
window.addEventListener('scroll', () => {
  if (styleWitcher.classList.contains('open')) {
    styleWitcher.classList.remove('open')
  }
})

/**
 * COLORS THEMES (LOCAL STORAGE)
 */

const alternateStyles = document.querySelectorAll('.alternate-style')

function setActiveStyle(color) {
  // console.log(color)
  localStorage.setItem('color', color)
  changeColor()
  // console.log(localStorage.getItem('color'))
}

function changeColor() {
  alternateStyles.forEach((style) => {
    if (localStorage.getItem('color') === style.getAttribute('title')) {
      style.removeAttribute('disabled')
    } else {
      style.setAttribute('disabled', 'true')
    }
  })
}

// CHECK IF COLOR KEY EXIST
if (localStorage.getItem('color') !== null) {
  changeColor()
}

/**
 * THEME LIGHT AND DARK MODE (LOCAL STORAGE)
 */

const dayNight = document.querySelector('.day-night')

dayNight.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }
  updateIcon()
})

function themeMode() {
  // CHECK IF THEME KEY EXIST
  if (localStorage.getItem('theme') !== null) {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }
  updateIcon()
}
themeMode()

function updateIcon() {
  if (document.body.classList.contains('dark')) {
    dayNight.querySelector('i').classList.remove('fa-moon')
    dayNight.querySelector('i').classList.add('fa-sun')
  } else {
    dayNight.querySelector('i').classList.remove('fa-sun')
    dayNight.querySelector('i').classList.add('fa-moon')
  }
}
