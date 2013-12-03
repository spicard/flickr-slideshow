onload = function() {
	window.slide = new Slide();
}
function Slide() {
	var self;

	this.init = function() {
		self = this;
		self.values();
	}

	this.values = function() {
		self.btnPrev = document.querySelector('.arrow.prev');
		self.btnNext = document.querySelector('.arrow.next');

		$.ajax({
			url: 'http://www.flickr.com/services/rest',
			dataType: 'JSONP',
			jsonp: 'jsoncallback',
			data: {
				method: 'flickr.photos.search',
				api_key: 'df6f4b524cf35757c57c6f7418e11d01',
				user_id: '26982917@N02',
				format: 'json',
			},
			success: function(response){
				var quantItens = response.photos.photo.length;
				var firstItem = response.photos.photo[0];
				var farmId = firstItem.farm;
				var serverId = firstItem.server;
				var id = firstItem.id;
				var secret = firstItem.secret;
				var small = '_s.jpg';
				var medium = '_z.jpg';
				var url = 'http://farm' + farmId + '.staticflickr.com/' + serverId+ '/' + id+ '_' + secret;
				var urlComplete = url + medium;

				document.querySelector('.content-slideshow').innerHTML = '<ul></ul>';
				document.querySelector('.content-thumbnails').innerHTML = '<ul></ul>';

				for (var i = 0; i < quantItens; i++) {
					var item = document.createElement('li');
					var photo = response.photos.photo[i];
					var farmId = photo.farm;
					var serverId = photo.server;
					var id = photo.id;
					var secret = photo.secret;
					var url = 'http://farm' + farmId + '.staticflickr.com/' + serverId+ '/' + id+ '_' + secret;
					var currentItem = 0;

					document.querySelector('.content-slideshow ul').appendChild(item);
					item.innerHTML = '<img src="' + url + medium + '" />';
				};
				var itemWidth = document.querySelector('.content-slideshow ul li').offsetWidth;
				document.querySelector('.content-slideshow ul').style.width = itemWidth * quantItens + 'px';

				this.clickButtonPrev = function() {
					var itemWidth = document.querySelector('.content-slideshow ul li').offsetWidth;
					self.btnPrev.addEventListener('click', function() {
						if (currentItem > 0) {
							--currentItem;
							document.querySelector('.content-slideshow ul').style.marginLeft = -(itemWidth * currentItem) + 'px';
						}
					});
				}

				this.clickButtonNext = function() {
					var itemWidth = document.querySelector('.content-slideshow ul li').offsetWidth;
					self.btnNext.addEventListener('click', function() {
						if (currentItem < quantItens) {
							++currentItem;
							document.querySelector('.content-slideshow ul').style.marginLeft = -(itemWidth * currentItem) + 'px';
						}
					});
				}

				for (var i = 0; i < quantItens; i++) {
					var item = document.createElement('li');
					var link = document.createElement('a');
					var photo = response.photos.photo[i];
					var farmId = photo.farm;
					var serverId = photo.server;
					var id = photo.id;
					var secret = photo.secret;
					var url = 'http://farm' + farmId + '.staticflickr.com/' + serverId+ '/' + id+ '_' + secret;

					document.querySelector('.content-thumbnails ul').appendChild(item);
					item.appendChild(link);
					link.setAttribute('href', url + medium);
					link.innerHTML = '<img src="' + url + small + '" />';
				};

				var allThumbs = document.querySelectorAll('.content-thumbnails ul li'),
					allThumbsArray = [];

				allThumbs[0].setAttribute('class', 'active');

				for (var i = 0; i < allThumbs.length; i++) {
					allThumbsArray.push(allThumbs[i]);
					allThumbs[i].addEventListener('click', function(e) {
						var itemWidth = document.querySelector('.content-slideshow ul li').offsetWidth;
						console.log(allThumbs.indexOff(0));
						document.querySelector('.content-slideshow ul').marginLeft = -(i * itemWidth) + 'px';
						window.scroll($('.content-slideshow'),0);

						this.setAttribute('class', 'active');
						var siblings = this.parentNode.childNodes;
						allSiblingsArray = [];

						for (var i = 0; i < allThumbs.length; i++) {
							allSiblingsArray.push(siblings[i]);

							if (allSiblingsArray[i] !== this) {
								allSiblingsArray[i].removeAttribute('class');
							}
						};
						e.preventDefault();
					})
				};
				this.clickButtonPrev();
				this.clickButtonNext();
			}
		});
	}

	this.init();
}