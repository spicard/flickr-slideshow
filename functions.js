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

		this.marginSlide = function() {
			var itemWidth = document.querySelector('.content-slideshow ul li').offsetWidth;
			document.querySelector('.content-slideshow ul').style.marginLeft = -(itemWidth * self.currentItem) + 'px';
		}

		this.classActive = function(response) {
			var allThumbs = document.querySelectorAll('.content-thumbnails ul li'),
				allThumbsArray = [];

			for (var j = 0; j < allThumbs.length; j++) {
				allThumbsArray.push(allThumbs[j]);

				allThumbsArray[j].removeAttribute('class');
			};
			allThumbsArray[self.currentItem].setAttribute('class', 'active');
		}

		this.clickButtonPrev = function(response) {
			self.btnPrev.addEventListener('click', function() {
				if (self.currentItem > 0) {
					var element = document.querySelector('.content-thumbnails ul li.active'),
						parent = element.parentElement,
						siblings = parent.childNodes;

					--self.currentItem;
					self.marginSlide();
					self.classActive();

					if (element == siblings[0]) {
						parent.removeAttribute('class');
						parent.previousSibling.setAttribute('class', 'active');
					}
				}
			});
		}

		this.clickButtonNext = function(response) {
			self.btnNext.addEventListener('click', function() {
				if (self.currentItem < self.quantItens - 1) {
					var element = document.querySelector('.content-thumbnails ul li.active'),
						parent = element.parentElement,
						siblings = parent.childNodes;

					++self.currentItem;
					self.marginSlide();
					self.classActive();

					if (element == siblings[siblings.length - 1]) {
						parent.removeAttribute('class');
						parent.nextSibling.setAttribute('class', 'active');
					}
				}
			});
		}

		this.clickThumb = function(response) {
			var allThumbs = document.querySelectorAll('.content-thumbnails ul li'),
				allThumbsArray = [];

			for (var i = 0; i < allThumbs.length; i++) {
				allThumbsArray.push(allThumbs[i]);
				allThumbs[i].addEventListener('click', function(e) {
					var siblings = this.parentNode.childNodes;
					allSiblingsArray = [];

					for (var j = 0; j < allThumbs.length; j++) {
						allSiblingsArray.push(siblings[j]);

						if (allSiblingsArray[j] == this) {
							self.currentItem = this.dataset.number;
							self.marginSlide();
						};
						self.classActive();
					};
					window.scroll($('.content-slideshow'),0);
				})
			};
		}

		this.slideshow = function() {
			var item = document.createElement('li');
			document.querySelector('.content-slideshow ul').appendChild(item);
			item.innerHTML = '<img src="' + this.url + this.medium + '" />';
			item.setAttribute('id', this.photo.id);
			document.querySelector('.content-slideshow ul').style.width = 640 * this.quantItens + 'px';
		}
		this.thumbnails = function(ul, i) {
			var	item = document.createElement('li');
			ul.appendChild(item);
			item.innerHTML = '<img src="' + this.url + self.small + '" />';
			item.setAttribute('id', this.photo.id);
			item.setAttribute('data-number', i);
			item.setAttribute('data-number', i);
			self.firstList.setAttribute('class', 'active');
			self.firstList.firstElementChild.setAttribute('class', 'active');
		}

		this.paginationThumbs =  function() {
			var lists = document.querySelectorAll('.content-thumbnails ul');
			document.querySelector('.pagination').innerHTML = '<ul></ul>';

			this.changeTab = function() {
				link.addEventListener('click', function(e) {
					var target = this.getAttribute('href'),
						siblings = document.querySelector(target).parentElement.childNodes;

					for (var b = 0; b < siblings.length; b++) {
						siblings[b].removeAttribute('class');
					};

					document.querySelector(target).setAttribute('class', 'active');
					e.preventDefault;
				})
			}

			for (var a = 0; a < lists.length; a++) {
				var	item = document.createElement('li'),
					link = document.createElement('a');

				document.querySelector('.pagination ul').appendChild(item);
				item.appendChild(link);
				link.innerHTML = a + 1 + '';
				link.setAttribute('href', lists[a].dataset.name);
				this.changeTab();
			};
		}

		this.render = function(response) {
			this.quantItens = response.photos.photo.length;

			var content = document.querySelector('.content-thumbnails'), 
				ul;

			document.querySelector('.content-slideshow').innerHTML = '<ul></ul>';

			for (var i = 0; i < this.quantItens; i++) {
				
				if (i % 14 == 0) {
					ul = document.createElement('ul');
					content.appendChild(ul)
					ul.setAttribute('data-name', '#list' + i);
					ul.setAttribute('id', 'list' + i);
				}

				self.firstList = content.children[0];

				this.photo = response.photos.photo[i];
				this.farmId = this.photo.farm;
				this.serverId = this.photo.server;
				this.address = this.photo.id;
				this.secret = this.photo.secret;
				this.small = '_s.jpg'
				this.medium = '_z.jpg'
				this.url = 'http://farm' + this.farmId + '.staticflickr.com/' + this.serverId+ '/' + this.address + '_' + this.secret;
				this.slideshow();
				this.thumbnails(ul, i);
			};
			
			this.clickButtonPrev();
			this.clickButtonNext();
			this.clickThumb();
			this.paginationThumbs();
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