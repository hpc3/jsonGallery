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
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}


var mCurrentIndex = 0;
	var mUrl = 'images.json';
	var mRequest = new XMLHttpRequest();
	var mImages = [];
	var mJson;

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


var mImages = [];
var mJson;





//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
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