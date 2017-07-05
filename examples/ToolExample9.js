// initalizing array used for cat image queue
var imageQueue = [];

// function for adding another cat gif onto the page
function addAnotherCat() {
    if (imageQueue.length === 0) {
        // if we're out of cat images, get more, then recurse
        getMoreImages(addAnotherCat);
    } else {
        // if we have more cat images
        // pop next cat image url out of array
        var url = imageQueue.pop();
        // create element for it
        $('<div><img class="img-thumbnail catgif" alt="a random cat gif" src="' + url + '"></img></div>')
            // append image element into the catGifContainer div
            .appendTo('#catGifContainer');
    }
}

// function for retreiving more cat images from The Cat API
// takes 1 parameter: a callback that is executed once the images are retrieved and proceesed into imageQueue
function getMoreImages(callback) {
    // grab the XML from The Cat API
    $.ajax({
        url: 'https://thecatapi.com/api/images/get',
        data: {
            format: 'xml',
            results_per_page: '20',
            type: 'gif',
            size: 'med'
        }
    }).done(function(data) {
        // grab the url elements out of the XML document
        var images = data.documentElement.getElementsByTagName('url');
        // images is a psudo-array, not a real array. using slide to make it a real array.
        images = Array.prototype.slice.call(images);
        // loop through all the url elements
        images.forEach(function(image) {
            // grab the url string and put it in imageQueue
            imageQueue.push(image.innerHTML);
        });
        // if a function was passed in the callback param, execute it now
        if (typeof callback === 'function') {
            callback();
        }
    });
}

// bootstrap by adding first cat gif onto page
addAnotherCat();
// call addAnotherCat function whenever someone clicks on the button
$('button#addCat').click(addAnotherCat);