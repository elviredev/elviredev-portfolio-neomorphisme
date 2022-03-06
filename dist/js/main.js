// @ts-nocheck
/**
 * NAVIGATION MENU
 */

const hamburgerBtn = document.querySelector('.hamburger-btn')
const navMenu = document.querySelector('.nav-menu')
const closeNavBtn = document.querySelector('.nav-menu-close')
const fadeOutDiv = document.querySelector('.fade-out-effect')

hamburgerBtn.addEventListener('click', showNavMenu)
closeNavBtn.addEventListener('click', hideNavMenu)

function showNavMenu() {
  navMenu.classList.add('open')
  bodyScrollingToggle()
}

function hideNavMenu() {
  navMenu.classList.remove('open')
  fadeOutEffect()
  bodyScrollingToggle()
}

function fadeOutEffect() {
  fadeOutDiv.classList.add('active')
  setTimeout(() => {
    fadeOutDiv.classList.remove('active')
  }, 300)
}

// ATTACH AN EVENT HANDLER TO DOCUMENT
document.addEventListener('click', (e) => {
  // console.log(e.target)
  if (e.target.classList.contains('link-item')) {
    // console.log(e.target.hash)
    /* Make sure e.target.hash has a value before overridding default behavior*/
    if (e.target.hash !== '') {
      // Prevent default anchor click behavior
      e.preventDefault()
      const hash = e.target.hash

      // Desactivate existing active 'section'
      document.querySelector('.section.active').classList.add('hide')
      document.querySelector('.section.active').classList.remove('active')

      // Activate new 'section'
      document.querySelector(hash).classList.add('active')
      document.querySelector(hash).classList.remove('hide')

      // Desactivate existing active navigation menu 'link-item'
      navMenu
        .querySelector('.active')
        .classList.add('outer-shadow', 'hover-in-shadow')
      navMenu
        .querySelector('.active')
        .classList.remove('active', 'inner-shadow')

      // If clicked 'link-item' is contained within the navigation menu
      if (navMenu.classList.contains('open')) {
        // Activate new navigation menu 'link-item'
        e.target.classList.add('active', 'inner-shadow')
        e.target.classList.remove('outer-shadow', 'hover-in-shadow')

        // Hide navigation menu
        hideNavMenu()
        // console.log("clicked 'link-item' is contained within the menu")
      } else {
        // console.log("clicked 'link-item' is not contained within the menu")
        let navItems = navMenu.querySelectorAll('.link-item')

        navItems.forEach((item) => {
          if (hash === item.hash) {
            // Activate new navigation menu 'link-item'
            item.classList.add('active', 'inner-shadow')
            item.classList.remove('outer-shadow', 'hover-in-shadow')
          }
        })
        fadeOutEffect()
      }

      // Add hash (#) to URL
      window.location.hash = hash
    }
  }
})

/**
 * ABOUT SECTION TABS
 */

const aboutSection = document.querySelector('.about-section')
const tabsContainer = document.querySelector('.about-tabs')

tabsContainer.addEventListener('click', (e) => {
  // console.log(e.target)
  if (
    e.target.classList.contains('tab-item') &&
    !e.target.classList.contains('active')
  ) {
    const target = e.target.getAttribute('data-target')
    // console.log(target)

    // desactiver la class active du 'tab-item' qui la possède
    tabsContainer
      .querySelector('.active')
      .classList.remove('outer-shadow', 'active')
    // activer new 'tab-item'
    e.target.classList.add('active', 'outer-shadow')

    // desactiver la class active du 'tab-content' qui la possède
    aboutSection.querySelector('.tab-content.active').classList.remove('active')
    // activer new 'tab-content'
    aboutSection.querySelector(target).classList.add('active')
  }
})

function bodyScrollingToggle() {
  document.body.classList.toggle('hidden-scrolling')
}

/**
 * PORTFOLIO FILTER AND POPUP
 */

const filterContainer = document.querySelector('.portfolio-filter')
const portfolioItemsContainer = document.querySelector('.portfolio-items')
const portfolioItems = document.querySelectorAll('.portfolio-item')
const popup = document.querySelector('.portfolio-popup')
const prevBtn = popup.querySelector('.pp-prev')
const nextBtn = popup.querySelector('.pp-next')
const closeBtn = popup.querySelector('.pp-close')
const projectDetailsContainer = popup.querySelector('.pp-details')
const projectDetailsBtn = popup.querySelector('.pp-project-details-btn')

let itemIndex, slideIndex, screenshots

/* FILTER PORTFOLIO ITEMS */
filterContainer.addEventListener('click', (e) => {
  // console.log(e.target)
  if (
    e.target.classList.contains('filter-item') &&
    !e.target.classList.contains('active')
  ) {
    // DESACTIVATE EXISTING CLASS ACTIVE 'FILTER-ITEM'
    filterContainer
      .querySelector('.active')
      .classList.remove('outer-shadow', 'active')
    // ACTIVATE NEW 'FILTER-ITEM'
    e.target.classList.add('active', 'outer-shadow')

    // data-target : 'all' 'web-application' etc
    const target = e.target.getAttribute('data-target')

    portfolioItems.forEach((item) => {
      // console.log(item.getAttribute('data-category'))
      if (target === item.getAttribute('data-category') || target === 'all') {
        item.classList.remove('hide')
        item.classList.add('show')
      } else {
        item.classList.remove('show')
        item.classList.add('hide')
      }
    })
  }
})

portfolioItemsContainer.addEventListener('click', (e) => {
  // console.log(e.target.closest('.portfolio-item-inner'))
  // la méthode closest() renvoie l'ancêtre le plus proche de l'elt courant
  if (e.target.closest('.portfolio-item-inner')) {
    const portfolioItem = e.target.closest(
      '.portfolio-item-inner'
    ).parentElement
    // console.log(portfolioItem)
    // GET THE PORTFOLIO INDEX
    itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
      portfolioItem
    )
    // console.log(itemIndex)
    screenshots = portfolioItems[itemIndex]
      .querySelector('.portfolio-item-img img')
      .getAttribute('data-screenshots')
    // console.log(screenshots)

    // CONVERT SCREENSHOTS INTO ARRAY
    screenshots = screenshots.split(',')
    // console.log(screenshots)
    if (screenshots.length === 1) {
      prevBtn.style.display = 'none'
      nextBtn.style.display = 'none'
    } else {
      prevBtn.style.display = 'block'
      nextBtn.style.display = 'block'
    }
    slideIndex = 0
    popupToggle()
    popupSlideShow()
    popupDetails()
  }
})

closeBtn.addEventListener('click', () => {
  popupToggle()
  if (projectDetailsContainer.classList.contains('active')) {
    popupDetailsToggle()
  }
})

function popupToggle() {
  popup.classList.toggle('open')
  bodyScrollingToggle()
}

function popupSlideShow() {
  const imgSrc = screenshots[slideIndex]
  // console.log('imgSrc:', imgSrc)
  const popupImg = popup.querySelector('.pp-img')
  // console.log('popupImg:', popupImg)

  /* ACTIVATE LOADER UNTIL THE popupImg LOADED */
  popup.querySelector('.pp-loader').classList.add('active')
  popupImg.src = imgSrc
  popupImg.onload = () => {
    // DESACTIVATE LOADER AFTER popupImg LOADED
    popup.querySelector('.pp-loader').classList.remove('active')
  }

  popup.querySelector('.pp-counter').innerHTML =
    slideIndex + 1 + ' of ' + screenshots.length
}

// NEXT SLIDE
nextBtn.addEventListener('click', () => {
  if (slideIndex === screenshots.length - 1) {
    slideIndex = 0
  } else {
    slideIndex++
  }
  popupSlideShow()
  // console.log('slideIndex:', slideIndex)
})

// PREV SLIDE
prevBtn.addEventListener('click', () => {
  if (slideIndex === 0) {
    slideIndex = screenshots.length - 1
  } else {
    slideIndex--
  }
  popupSlideShow()
  // console.log('slideIndex:', slideIndex)
})

function popupDetails() {
  // IF portfolio-item-details NOT EXIST
  if (!portfolioItems[itemIndex].querySelector('.portfolio-item-details')) {
    projectDetailsBtn.style.display = 'none'
    return /* END FUNCTION EXECUTION */
  }
  projectDetailsBtn.style.display = 'block'

  // GET THE PROJECT DETAILS
  const details = portfolioItems[itemIndex].querySelector(
    '.portfolio-item-details'
  ).innerHTML
  // SET THE PROJECT DETAILS
  popup.querySelector('.pp-project-details').innerHTML = details

  // GET THE PROJECT TITLE
  const title = portfolioItems[itemIndex].querySelector(
    '.portfolio-item-title'
  ).innerHTML
  // SET THE PROJECT TITLE
  popup.querySelector('.pp-title h2').innerHTML = title

  // GET THE PROJECT CATEGORY
  const category = portfolioItems[itemIndex].getAttribute('data-category')
  // SET THE PROJECT CATEGORY
  popup.querySelector('.pp-project-category').innerHTML = category
    .split('-')
    .join(' ')
}

projectDetailsBtn.addEventListener('click', () => {
  popupDetailsToggle()
})

function popupDetailsToggle() {
  if (projectDetailsContainer.classList.contains('active')) {
    projectDetailsBtn.querySelector('i').classList.remove('fa-minus')
    projectDetailsBtn.querySelector('i').classList.add('fa-plus')
    projectDetailsContainer.classList.remove('active')
    projectDetailsContainer.style.maxHeight = 0 + 'px'
  } else {
    projectDetailsBtn.querySelector('i').classList.remove('fa-plus')
    projectDetailsBtn.querySelector('i').classList.add('fa-minus')
    projectDetailsContainer.classList.add('active')
    projectDetailsContainer.style.maxHeight =
      projectDetailsContainer.scrollHeight + 'px'
    popup.scrollTo(0, projectDetailsContainer.offsetTop)
  }
}

/**
 * TESTIMONIAL SLIDER
 */

const sliderContainer = document.querySelector('.testi-slider-container')
const slides = sliderContainer.querySelectorAll('.testi-item')
const slideWidth = sliderContainer.offsetWidth
const prevBtnTesti = document.querySelector('.testi-slider-nav .prev')
const nextBtnTesti = document.querySelector('.testi-slider-nav .next')
const activeSlide = sliderContainer.querySelector('.testi-item.active')
let slideIndexTesti = Array.from(activeSlide.parentElement.children).indexOf(
  activeSlide
)
// console.log(slideIndexTesti)

// SET WIDTH OF ALL SLIDES
slides.forEach((slide) => {
  slide.style.width = slideWidth + 'px'
})

// SET WIDTH OF sliderContainer
sliderContainer.style.width = slideWidth * slides.length + 'px'

nextBtnTesti.addEventListener('click', () => {
  if (slideIndexTesti === slides.length - 1) {
    slideIndexTesti = 0
  } else {
    slideIndexTesti++
  }

  slider()
})

prevBtnTesti.addEventListener('click', () => {
  if (slideIndexTesti === 0) {
    slideIndexTesti = slides.length - 1
  } else {
    slideIndexTesti--
  }

  slider()
})

function slider() {
  // DESACTIVATE EXISTING ACTIVE SLIDE
  sliderContainer.querySelector('.testi-item.active').classList.remove('active')
  // ACTIVATE NEW SLIDE
  slides[slideIndexTesti].classList.add('active')

  sliderContainer.style.marginLeft = -(slideWidth * slideIndexTesti) + 'px'
}

slider()

/**
 * HIDE ALL SECTION EXCEPT active
 */

const sections = document.querySelectorAll('.section')
sections.forEach((section) => {
  if (!section.classList.contains('active')) {
    section.classList.add('hide')
  }
})

/**
 * PRELOADER
 */
const preloader = document.querySelector('.preloader')
window.addEventListener('load', () => {
  preloader.classList.add('fade-out')

  setTimeout(() => {
    preloader.style.display = 'none'
  }, 600)
})
