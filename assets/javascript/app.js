$(document).ready(function() {
    $('body').on('click','.gif-button', function() {
        //api key 1J5qzsdvlKkaRytoNtQL0GuD38BGTQM3
        var queryText = $(this).text();
        queryText = queryText.trim();
        queryText = queryText.replace(' ', '+');
        //console.log(queryText);
        const queryURL = `https://api.giphy.com/v1/gifs/search?q=${queryText}&api_key=1J5qzsdvlKkaRytoNtQL0GuD38BGTQM3&limit=10`;
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            $('#gif-gifs .row').empty();
            response.data.forEach(function(element) {
                $('#gif-gifs .row').append(`<img src="${element.images.fixed_width.url}" alt="${element.title}">`);
            });
        });
    }); 

    
});