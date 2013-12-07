onload = function() {
	window.slide = new Slide();
}
function Slide() {
	var self;

	this.init = function() {
		self = this;
		self.values();
		self.ajax()
	}

	this.values = function() {
		self.btnPrev = document.querySelector('.arrow.prev');
		self.btnNext = document.querySelector('.arrow.next');
		self.currentItem = 0;

		this.clickButtonPrev = function(response) {
			self.btnPrev.addEventListener('click', function() {
				if (self.currentItem > 0) {
					--self.currentItem;
					document.querySelector('.content-slideshow ul').style.marginLeft = -(640 * self.currentItem) + 'px';
				}
			});
		}

		this.clickButtonNext = function(response) {
			self.btnNext.addEventListener('click', function() {
				if (self.currentItem < self.quantItens) {
					++self.currentItem;
					document.querySelector('.content-slideshow ul').style.marginLeft = -(640 * self.currentItem) + 'px';
				}
			});
		}

		this.clickThumb = function(response) {
			var allThumbs = document.querySelectorAll('.content-thumbnails ul li'),
				allThumbsArray = [];

			allThumbs[0].setAttribute('class', 'active');

			for (var i = 0; i < allThumbs.length; i++) {
				allThumbsArray.push(allThumbs[i]);
				allThumbs[i].addEventListener('click', function(e) {
					this.setAttribute('class', 'active');
					var siblings = this.parentNode.childNodes;
					allSiblingsArray = [];

					for (var i = 0; i < allThumbs.length; i++) {
						allSiblingsArray.push(siblings[i]);

						if (allSiblingsArray[i] !== this) {
							allSiblingsArray[i].removeAttribute('class');
						}
					};
					var itemWidth = document.querySelector('.content-slideshow ul li').offsetWidth;
					document.querySelector('.content-slideshow ul').marginLeft = -(i * itemWidth) + 'px';
					window.scroll($('.content-slideshow'),0);
				})
			};
		}

		this.slideshow = function() {
			//var itemWidth = document.querySelector('.content-slideshow ul li').offsetWidth,
				item = document.createElement('li');
			document.querySelector('.content-slideshow ul').appendChild(item);
			item.innerHTML = '<img src="' + this.url + this.medium + '" />';
			document.querySelector('.content-slideshow ul').style.width = 640 * this.quantItens + 'px';
		}
		this.thumbnails = function() {
			var	item = document.createElement('li');
			document.querySelector('.content-thumbnails ul').appendChild(item);
			item.innerHTML = '<img src="' + this.url + self.small + '" />';
		}

		this.render = function(response) {
			this.quantItens = response.photos.photo.length;

			document.querySelector('.content-slideshow').innerHTML = '<ul></ul>';
			document.querySelector('.content-thumbnails').innerHTML = '<ul></ul>';

			for (var i = 0; i < this.quantItens; i++) {
				this.photo = response.photos.photo[i];
				this.farmId = this.photo.farm;
				this.serverId = this.photo.server;
				this.address = this.photo.id;
				this.secret = this.photo.secret;
				this.small = '_s.jpg'
				this.medium = '_z.jpg'
				this.url = 'http://farm' + this.farmId + '.staticflickr.com/' + this.serverId+ '/' + this.address + '_' + this.secret;
				this.slideshow();
				this.thumbnails();
			};
			this.clickButtonPrev();
			this.clickButtonNext();
			this.clickThumb();
		}

		this.ajax = function() {
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
					self.render(response);
				}
			});
		}
	}
	this.init();
}