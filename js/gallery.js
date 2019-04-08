// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	if (mCurrentIndex >= mImages.length) {
		mCurrentIndex = 0;
	}
	console.log(mCurrentIndex);

	$(" div.photoHolder > img").attr('src', mImages[mCurrentIndex].imgPath);
	$(" p.location").text("Location: " + mImages[mCurrentIndex].imgLocation);
	$(" p.description").text("description: " + mImages[mCurrentIndex].description);
	$(" p.date").text("Date: " + mImages[mCurrentIndex].date);

	mCurrentIndex++;

	console.log('swap photo');
}


var mCurrentIndex = 0;
	var mUrl = 'images.json';
	var mRequest = new XMLHttpRequest();
	var mImages = [];
	var mJson;
    var $_GET = getQueryParams(document.location.search);


if($_GET["json"] == undefined) {
    mUrl = "images.json";
} else{
    mUrl = $_GET["json"];
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}





mRequest.onreadystatechange = function () {
	if (mRequest.readyState == 4 && mRequest.status == 200){
		try{
			mJson = JSON.parse(mRequest.responseText);
			console.log(mJson);

			for(var i = 0; i < mJson.images.length; i++){
				mImages.push(new GalleryImage(
					mJson.images[i].date,
					mJson.images[i].description,
					mJson.images[i].imgLocation,
					mJson.images[i].imgPath
					)
				);
			}
		}catch (e) {
			console.log(e.message);
		}
	}
}


mRequest.open("GET", mUrl, true);
mRequest.send();


function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	

	$('.details').eq(0).hide();

	$(".moreIndicator").click(function(){
		$( "img.rot90" ).toggleClass("rot270",1);
		$(".details").slideToggle(1000);
	});

	$("#nextPhoto").click(function(){
		swapPhoto();
	});

	$("#prevPhoto").click(function(){
		mCurrentIndex -= 2;

		if (mCurrentIndex < 0){
			mCurrentIndex = mImages.length -1;
			swapPhoto();
		} else{
			swapPhoto()
		}

		console.log(mCurrentIndex);
	});
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgLocation,description,date,imgPath) {

	this.imgLocation =  imgLocation;
	this.description =  description;
	this.date =  date;
	this.imgPath =  imgPath;

}