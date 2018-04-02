$(document).ready(function() {
    var activeButton;
    var activeText = '';
    
    $('body').on('click','.gif-button', function() {
        //Removes button
        const that = $(this);
        if (that.attr('class').includes('bg-danger')) {
            if(that.text() === activeText) {
                //console.log('Removing active button');
                $('#gif-gifs .row').empty();
                $('#help').css('visibility', 'visible');
            }
            that.remove();
            var textToDelete = that.text();
            var arr = (JSON.parse(window.sessionStorage.topics)).filter(function(topic) {
                return topic !== textToDelete;
            });
            window.sessionStorage.topics = JSON.stringify(arr);
            updateButtonBadge();
        } else {

        //Renders the GIF page
        var queryText = that.text();
        queryText = queryText.trim();
        queryText = queryText.replace(' ', '+');
        //console.log(queryText);
        const queryURL = `https://api.giphy.com/v1/gifs/search?q=${queryText}&api_key=1J5qzsdvlKkaRytoNtQL0GuD38BGTQM3&limit=10`;
        //console.log(queryURL);
        if (!(that.attr('class').includes('active'))) {
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            //console.log(response);
            $('#gif-gifs .row').empty();
            response.data.forEach(function(element) {
                $('#gif-gifs .row').append(`
                <div class="card col-xs-11 col-md-5">
                    <img class="card-img-top gif" src="${element.images.fixed_width.url}" alt="${element.title}" data-still="${element.images.fixed_width_still.url}" data-animated="${element.images.fixed_width.url}" data-state="animated">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">Rating: ${element.rating}</p>
                    </div>
                </div>
                `);
            });
            $('#help').css('visibility', 'hidden');
        });
        //Changes button to active
        if(typeof activeButton !== 'undefined') {
            activeButton.attr('class', 'dropdown-item gif-button');
        }
        that.attr('class', 'dropdown-item gif-button active');
        activeButton = that;
        activeText = that.text();
       

        //Clicking active button twice turns it off
        } else {
            that.attr('class', 'dropdown-item gif-button');
            $('#gif-gifs .row').empty();
            $('#help').css('visibility', 'visible');
            activeText = '';

        }


        }
    }); 

    $('body').on('click', '#add-submit', function(event) {
        event.preventDefault();
        //console.log($('#add-text'));
        var arr = JSON.parse(window.sessionStorage.topics);
        arr.push($('#add-text').val());
        window.sessionStorage.topics = JSON.stringify(arr);
        renderButtons();
        updateButtonBadge();
        $('#add-text').val(''); 
       
    });

    $('body').on('click', '#edit-buttons', function(event) {
        event.preventDefault();
        if ($(this).attr('class').includes('active')) {
            //console.log('Active text is ' + activeText);
            $('.gif-button').attr('class', function(val) {
                //console.log($(this));
                return ($(this).text() === activeText) ? 'dropdown-item gif-button active' : 'dropdown-item gif-button';
            });
            $(this).text('Edit buttons');
            $(this).attr('class', 'dropdown-item');
            //console.log('typeof $(".gif-button") ' + $('.gif-button'));
        } else {
        //console.log('Click button to remove');
        //console.log($(this));
        $(this).attr('class', 'dropdown-item active');
        $('body').find('.gif-button').attr('class', 'dropdown-item gif-button bg-danger text-white');
        $(this).text('Cancel');
        }
    });

    $('body').on('click', '.gif', function(event) {
        event.preventDefault();
        //console.log('Clicked ' + $(this).attr('alt'));
        var state = $(this).attr('data-state');
        if (state === 'animated') {
            $(this).attr('src', `${$(this).attr('data-still')}`);
            $(this).attr('data-state', 'still');
        } else if (state === 'still') {
            $(this).attr('src', `${$(this).attr('data-animated')}`);
            $(this).attr('data-state', 'animated');
        }
    });

    //Renders buttons in the 'Topics' dropdown menu
    function renderButtons() {
        //console.log(topics);
        //console.log(typeof window.sessionStorage.topics);
        if (typeof window.sessionStorage.topics === 'undefined') { 
            window.sessionStorage.clear();
            window.sessionStorage.topics = JSON.stringify(['Superman', 'Batman', 'Wonder Woman', 'Teen Titans']);
        }
        $('#gif-buttons').empty();
        (JSON.parse(window.sessionStorage.topics)).forEach(function(topic) {
            $('#gif-buttons').append(`<button class="dropdown-item gif-button" type="button">${topic}</button>`);
        }); 
        $('#gif-buttons').append('<div class="dropdown-divider"></div>');
        $('#gif-buttons').append('<button class="dropdown-item" id="edit-buttons" type="button">Edit buttons</button>');

    }

    function updateButtonBadge() {
        var arr = JSON.parse(window.sessionStorage.topics);
        //console.log('updateButtonBadge JSON parse ' + arr);
        $('.topic-number').text(`${arr.length}`);
    }

     renderButtons();
     updateButtonBadge(); 
    
});