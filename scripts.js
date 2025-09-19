$(document).ready(function() {
  // Load quotes
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    method: 'GET',
    success: function(data) {
      const carouselInner = $('#quotes-carousel');
      carouselInner.empty();
      
      data.forEach(function(quote, index) {
        const activeClass = index === 0 ? 'active' : '';
        const quoteHtml = `
          <div class="carousel-item ${activeClass}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img
                  src="${quote.pic_url}"
                  class="d-block align-self-center"
                  alt="Carousel Pic ${index + 1}"
                />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">${quote.text}</p>
                  <h4 class="text-white font-weight-bold">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>
        `;
        carouselInner.append(quoteHtml);
      });
    },
    error: function() {
      $('#quotes-carousel').html('<div class="text-center text-white">Error loading quotes</div>');
    }
  });

  // Generic Carousel Class
  class GenericCarousel {
    constructor(containerId, itemsPerView = 4) {
      this.container = $(containerId);
      this.track = this.container.find('.carousel-track');
      this.items = [];
      this.currentIndex = 0;
      this.itemsPerView = itemsPerView;
      this.itemWidth = 100 / this.itemsPerView;
      
      this.init();
    }
    
    init() {
      this.setupControls();
      this.updateTrack();
    }
    
    setupControls() {
      const prevBtn = this.container.find('.carousel-control-prev');
      const nextBtn = this.container.find('.carousel-control-next');
      
      prevBtn.on('click', () => this.prev());
      nextBtn.on('click', () => this.next());
    }
    
    setItems(items) {
      this.items = items;
      this.currentIndex = 0;
      this.renderItems();
      this.updateTrack();
    }
    
    renderItems() {
      this.track.empty();
      
      this.items.forEach((item, index) => {
        const itemHtml = `
          <div class="carousel-item" style="width: ${this.itemWidth}%">
            <div class="card">
              <img src="${item.thumbnail}" class="card-img-top" alt="Video thumbnail" />
              <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${item.title}</h5>
                <p class="card-text text-muted">${item.subtitle}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${item.author.pic}" alt="Creator" width="30px" class="rounded-circle" />
                  <h6 class="pl-3 m-0 main-color">${item.author.name}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    ${this.generateStars(item.stars)}
                  </div>
                  <span class="main-color">${item.duration}</span>
                </div>
              </div>
            </div>
          </div>
        `;
        this.track.append(itemHtml);
      });
    }
    
    generateStars(rating) {
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        const starType = i <= rating ? 'star_on' : 'star_off';
        stars += `<img src="images/${starType}.png" alt="star" width="15px" />`;
      }
      return stars;
    }
    
    updateTrack() {
      const translateX = -(this.currentIndex * this.itemWidth);
      this.track.css('transform', `translateX(${translateX}%)`);
    }
    
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateTrack();
      }
    }
    
    next() {
      const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
      if (this.currentIndex < maxIndex) {
        this.currentIndex++;
        this.updateTrack();
      }
    }
  }

  // Load popular tutorials
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    method: 'GET',
    success: function(data) {
      const carousel = new GenericCarousel('#popular-carousel', 4);
      carousel.setItems(data);
    },
    error: function() {
      $('#popular-track').html('<div class="text-center">Error loading tutorials</div>');
    }
  });
});
