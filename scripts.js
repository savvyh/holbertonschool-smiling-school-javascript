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
});
