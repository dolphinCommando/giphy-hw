$(document).ready(function() {
    var topics = ['Terminator', 'Jurassic Park'];
    var activeTopic = ''
    
    $('body').on('click','.gif-button', function() {
        if ($(this).attr('class').includes('bg-danger')) {
            $(this).remove();
            updateButtonBadge();
        } else {

        //api key 1J5qzsdvlKkaRytoNtQL0GuD38BGTQM3
        var queryText = $(this).text();
        queryText = queryText.trim();
        queryText = queryText.replace(' ', '+');
        //console.log(queryText);
        const queryURL = `https://api.giphy.com/v1/gifs/search?q=${queryText}&api_key=1J5qzsdvlKkaRytoNtQL0GuD38BGTQM3&limit=10`;
        console.log(queryURL);
        if (!($(this).attr('class').includes('active'))) {
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            $('#gif-gifs .row').empty();
            response.data.forEach(function(element) {
                $('#gif-gifs .row').append(`
                <div class="card col-6">
                    <img class="card-img-top" src="${element.images.fixed_width.url}" alt="${element.title}">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">Rating: ${element.rating}</p>
                    </div>
                </div>
                `);
            });
        });
        
        $(this).attr('class', 'dropdown-item gif-button active');

        } else {
            $(this).attr('class', 'dropdown-item gif-button');
            $('#gif-gifs .row').empty();

        }
        }
    }); 

    $('body').on('click', '#add-submit', function(event) {
        event.preventDefault();
        console.log($('#add-text'));
        topics.push($('#add-text').val());
        renderButtons();
        updateButtonBadge();
         $('#add-text').val(''); 
       
    });

    $('body').on('click', '#edit-buttons', function(event) {
        event.preventDefault();
        if ($(this).attr('class').includes('active')) {
            $('body').find('.gif-button').attr('class', 'dropdown-item gif-button');
            $(this).text('Edit buttons');
            $(this).attr('class', 'dropdown-item');

        } else {
        console.log('Click button to remove');
        $(this).attr('class', 'dropdown-item active');
        $('body').find('.gif-button').attr('class', 'dropdown-item gif-button bg-danger text-white');
        $(this).text('Cancel');
        }
    });

    function renderButtons() {
        console.log(topics);
        $('#gif-buttons').empty();
        topics.forEach(function(topic) {
            $('#gif-buttons').append(`<button class="dropdown-item gif-button" type="button">${topic}</button>`);
        }); 
        $('#gif-buttons').append('<div class="dropdown-divider"></div>');
        $('#gif-buttons').append('<button class="dropdown-item" id="edit-buttons" type="button">Edit buttons</button>');

    }

    function updateButtonBadge() {
        $('.topic-number').text(`${topics.length}`);
    }


     renderButtons();
     updateButtonBadge(); 


    



    
});