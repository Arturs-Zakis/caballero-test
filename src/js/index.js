const bannerVideo = document.querySelector('.banner__video');
const btnMute = document.querySelector('.btn-mute');


const muteHandler = () => {
  bannerVideo.muted = !bannerVideo.muted;
}

btnMute.addEventListener('click', () => muteHandler());



// lang toggle


const langToggle = document.querySelector('.nav-bar__lang-selector');

const langToggleHandler = (e) => {
  const subMenu = e.currentTarget.querySelector('.nav-bar__other-langs');
  subMenu.classList.add('active');
  if (subMenu.classList.contains('active')) {
    window.addEventListener('click', (e) => {
      console.log(e.target)
      if (!e.target.matches('.nav-bar__lang-selector *')) {
        subMenu.classList.remove('active');
      }
    })
  } else {
    window.removeEventListener('click', langToggleHandler)
  }




}

langToggle.addEventListener('click', langToggleHandler);


// hamburger and mobile menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector('.nav-bar');

// On click
hamburger.addEventListener("click", function () {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  navMenu.classList.toggle('active');
}
)

const menuItems = document.querySelectorAll('.nav-bar__menu');

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active');
  });
})