$(document).ready(function() {
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

  function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<img src="images/star_on.png" alt="star" width="15px" />';
      } else {
        stars += '<img src="images/star_off.png" alt="star" width="15px" />';
      }
    }
    return stars;
  }

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
              <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.src='images/thumbnail_1.jpg';" />
              <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${item.title || 'Untitled'}</h5>
                <p class="card-text text-muted">${item['sub-title'] || 'No description'}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${item.author_pic_url || 'images/profile_1.jpg'}" alt="Creator" width="30px" class="rounded-circle" onerror="this.src='images/profile_1.jpg';" />
                  <h6 class="pl-3 m-0 main-color">${item.author || 'Unknown'}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating">
                    ${this.generateStars(item.star || 0)}
                  </div>
                  <span class="main-color">${item.duration || '0 min'}</span>
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

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    method: 'GET',
    success: function(data) {
        if (data && data.length > 0) {
          // Remplacer le carousel par une grille simple
          let html = '<div class="row">';
          data.forEach((item, index) => {
            html += `
              <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div class="card">
                  <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.src='images/thumbnail_1.jpg';" />
                  <div class="card-img-overlay text-center">
                    <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${item.title || 'Untitled'}</h5>
                    <p class="card-text text-muted">${item['sub-title'] || 'No description'}</p>
                    <div class="creator d-flex align-items-center">
                      <img src="${item.author_pic_url || 'images/profile_1.jpg'}" alt="Creator" width="30px" class="rounded-circle" onerror="this.src='images/profile_1.jpg';" />
                      <h6 class="pl-3 m-0 main-color">${item.author || 'Unknown'}</h6>
                    </div>
                    <div class="info pt-3 d-flex justify-content-between">
                      <div class="rating">
                        ${generateStars(item.star || 0)}
                      </div>
                      <span class="main-color">${item.duration || '0 min'}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          });
          html += '</div>';
          
          $('#popular-track').html(html);
      } else {
        $('#popular-track').html('<div class="text-center">No popular tutorials found</div>');
      }
    },
    error: function(xhr, status, error) {
      $('#popular-track').html('<div class="text-center">Error loading tutorials</div>');
    }
  });

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/latest-videos',
    method: 'GET',
    success: function(data) {
      const carousel = new GenericCarousel('#latest-carousel', 4);
      carousel.setItems(data);
    },
    error: function() {
      $('#latest-track').html('<div class="text-center">Error loading latest videos</div>');
    }
  });

  // Courses page functionality
  let currentFilters = {
    q: '',
    topic: '',
    sort: 'most_popular'
  };

  function loadCourses() {
    const container = $('#courses-container');
    const videoCount = $('#video-count');
    
    container.html('<div class="loader"></div>');
    videoCount.text('Loading...');

    const params = new URLSearchParams();
    if (currentFilters.q) params.append('q', currentFilters.q);
    if (currentFilters.topic) params.append('topic', currentFilters.topic);
    if (currentFilters.sort) params.append('sort', currentFilters.sort);

    $.ajax({
      url: `https://smileschool-api.hbtn.info/courses?${params.toString()}`,
      method: 'GET',
      success: function(data) {
        console.log('Courses API Response:', data);
        container.empty();
        
        if (data.courses && data.courses.length > 0) {
          videoCount.text(`${data.courses.length} videos`);
          
          data.courses.forEach(function(course) {
            console.log('Course data:', course);
            const courseHtml = `
              <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
                <div class="card">
                  <img src="${course.thumbnail || 'images/thumbnail_1.jpg'}" class="card-img-top" alt="Video thumbnail" />
                  <div class="card-img-overlay text-center">
                    <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${course.title || 'Untitled'}</h5>
                    <p class="card-text text-muted">${course.subtitle || 'No description'}</p>
                    <div class="creator d-flex align-items-center">
                      <img src="${course.author?.pic || 'images/profile_1.jpg'}" alt="Creator" width="30px" class="rounded-circle" />
                      <h6 class="pl-3 m-0 main-color">${course.author?.name || 'Unknown'}</h6>
                    </div>
                    <div class="info pt-3 d-flex justify-content-between">
                      <div class="rating">
                        ${generateStars(course.stars || 0)}
                      </div>
                      <span class="main-color">${course.duration || '0 min'}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
            container.append(courseHtml);
          });
        } else {
          videoCount.text('0 videos');
          container.html('<div class="col-12 text-center">No courses found</div>');
        }
      },
      error: function(xhr, status, error) {
        console.log('API Error:', error);
        container.html('<div class="text-center">Error loading courses</div>');
        videoCount.text('Error');
      }
    });
  }


  function loadFilters() {
    // Simple fallback options
    const topicMenu = $('#topic-menu');
    topicMenu.empty();
    topicMenu.append('<a class="dropdown-item" href="#" data-topic="">All topics</a>');
    topicMenu.append('<a class="dropdown-item" href="#" data-topic="beginner">Beginner</a>');
    topicMenu.append('<a class="dropdown-item" href="#" data-topic="intermediate">Intermediate</a>');
    topicMenu.append('<a class="dropdown-item" href="#" data-topic="advanced">Advanced</a>');

    const sortMenu = $('#sort-menu');
    sortMenu.empty();
    sortMenu.append('<a class="dropdown-item" href="#" data-sort="most_popular">Most Popular</a>');
    sortMenu.append('<a class="dropdown-item" href="#" data-sort="most_recent">Most Recent</a>');
    sortMenu.append('<a class="dropdown-item" href="#" data-sort="most_viewed">Most Viewed</a>');

    // Load initial courses
    loadCourses();
  }

  // Event handlers for courses page
  let searchTimeout;
  $(document).on('input', '#search-input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function() {
      currentFilters.q = $('#search-input').val();
      loadCourses();
    }, 500);
  });

  $(document).on('click', '#topic-menu .dropdown-item', function(e) {
    e.preventDefault();
    const topic = $(this).data('topic');
    currentFilters.topic = topic;
    $('#topic-selected').text($(this).text());
    loadCourses();
  });

  $(document).on('click', '#sort-menu .dropdown-item', function(e) {
    e.preventDefault();
    const sort = $(this).data('sort');
    currentFilters.sort = sort;
    $('#sort-selected').text($(this).text());
    loadCourses();
  });

  // Load filters and courses if on courses page
  if (window.location.pathname.includes('courses.html')) {
    // Test API first
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/courses',
      method: 'GET',
      success: function(data) {
        console.log('API Test Response:', data);
        console.log('Data structure:', Object.keys(data));
        if (data.courses) {
          console.log('First course:', data.courses[0]);
        }
      },
      error: function(xhr, status, error) {
        console.log('API Test Error:', error);
      }
    });
    
    loadFilters();
  }
});
