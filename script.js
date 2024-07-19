$(document).ready(function() {
    // API key for accessing Pexels API
    var apikey = "5fhC6DvyyBisQH3xI0qYuBSJF6x0oJ32Pg5NUkwH7n8zaQ286lBXdgaD";
    var backgroundcount = 0;
    var authorcount = 0;
    let imagesData = [];
    let quotesData = [];

    // Copy initial quote to clipboard
    navigator.clipboard.writeText("The only true wisdom is in knowing you know nothing. - Socrates");

    // Fetch quotes and images
    quotesearch();
    imagesearch();

    // Event handler for generating a new quote
    $("#newquote").click(function(event) {
        event.preventDefault();

        // Randomly select a quote and background image
        const quoterandomizer = Math.floor(Math.random() * quotesData.length);
        const backgroundrandomizer = Math.floor(Math.random() * imagesData.length);

        // Animate the quote text change
        $('.textbox').animate({ opacity: 0 }, 500, function() {
            $(this).animate({ opacity: 1 }, 500);
            $('#text').html(quotesData[quoterandomizer].quote);
        });

        // Animate the author text change
        $('.author').animate({ opacity: 0 }, 500, function() {
            $(this).animate({ opacity: 1 }, 500);
            $('#author').html("- " + quotesData[quoterandomizer].source);
        });

        // Update tweet button with new quote
        $('#tweet-quote').attr(
            'href',
            'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
            encodeURIComponent('"' + quotesData[quoterandomizer].quote + '" ' + quotesData[quoterandomizer].source)
        );

        // Event handler for copying the quote to clipboard
        $("#copy-quote").click(function(event) {
            event.preventDefault();
            console.log("copy");
            navigator.clipboard.writeText(quotesData[quoterandomizer].quote + " - " + quotesData[quoterandomizer].source);
        });

        // Change background image and set new color property
        $("body").css("background-image", "url(" + imagesData[backgroundrandomizer].src.original + ")");
        $(":root").get(0).style.setProperty("--coloruse", imagesData[backgroundrandomizer].avg_color);
    });

    // Function to fetch images from Pexels API
    function imagesearch() {
        return $.ajax({
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", apikey);
            },
            url: "https://api.pexels.com/v1/search?query=nature&per_page=80",
            success: function(data) {
                imagesData = data.photos;
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    // Function to fetch quotes from Philosophy Quotes API
    function quotesearch() {
        return $.ajax({
            method: 'GET',
            url: "https://philosophy-quotes-api.glitch.me/quotes",
            success: function(data) {
                quotesData = data;
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});
