onload = function() {
	window.slide = new Slide();
}
function Slide() {
	var self;

	this.init = function() {
		self = this;
		self.values();
		/*self.clickButtonPrev();
		self.clickButtonNext();*/
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

				document.querySelector('.content-slideshow').innerHTML = '<img src"" />';
				document.querySelector('.content-slideshow img').setAttribute('src', urlComplete);
				document.querySelector('.content-thumbnails').innerHTML = '<ul></ul>';

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
					console.log(link)
				};

				var allThumbs = document.querySelectorAll('.content-thumbnails ul li a'),
					allThumbsArray = [];

				for (var i = 0; i < allThumbs.length; i++) {
					allThumbsArray.push(allThumbs[i]);
					allThumbs[i].addEventListener('click', function(e) {
						var url = this.getAttribute('href');
						document.querySelector('.content-slideshow img').setAttribute('src', url);
						e.preventDefault();
					})
				};
			}
		});
	}

	/*this.clickButtonPrev = function() {
		self.btnPrev.addEventListener('click', function() {
			if (self.itemAtual > 0) {
				document.querySelector('.content-slideshow img').setAttribute('src', url);
			}
		});
	}

	this.clickButtonNext = function() {
		self.btnNext.addEventListener('click', function() {
			if (self.itemAtual < self.itensLength -1) {
				++self.itemAtual;
				document.querySelector('.content-slideshow img').setAttribute('src', url);
			}
		});
	}*/

	this.init();
}

