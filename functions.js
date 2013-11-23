onload = function() {
	window.slide = new Slide();
}
function Slide() {
	var self;

	this.init = function() {
		self = this;
		self.values();
		self.clickButtonPrev();
		self.clickButtonNext();
	}

	this.values = function() {
		self.list = document.querySelector('.content-slideshow ul');
		self.item = document.querySelector('.content-slideshow ul li');
		self.itensLength = document.querySelectorAll('.content-slideshow ul li').length;
			
		self.itemWidth = self.item.offsetWidth;
		self.list.style.width = (self.itensLength * self.itemWidth) + 'px';
		self.btnPrev = document.querySelector('.arrow.prev');
		self.btnNext = document.querySelector('.arrow.next');
		self.itemAtual = 0;

		$.ajax({
			url: 'http://www.flickr.com/services/rest/',
			dataType: 'JSONP',
			data: {
				method: 'flickr.people.getPhotos',
				api_key: '42f8d9b0b14f40b5e5d265659d34c5a1',
				user_id: '32596304%40N08',
				format: 'JSONP',
				api_sig: '0e8fed83c9f6ae5deaa6117122aabe55'
			},
			success: function(response){
				console.log('oi');
			}
		});
	}

	this.clickButtonPrev = function() {
		self.btnPrev.addEventListener('click', function() {
			if (self.itemAtual > 0) {
				--self.itemAtual;
				self.list.style.marginLeft = -(self.itemAtual * self.itemWidth)  + 'px';
			}
		});
	}

	this.clickButtonNext = function() {
		self.btnNext.addEventListener('click', function() {
			if (self.itemAtual < self.itensLength -1) {
				++self.itemAtual;
				self.list.style.marginLeft = -(self.itemAtual * self.itemWidth)  + 'px';
			}
		});
	}

	this.init();
}

