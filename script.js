$(document).ready(function() {
    var apikey = "5fhC6DvyyBisQH3xI0qYuBSJF6x0oJ32Pg5NUkwH7n8zaQ286lBXdgaD";
    var imagesData = [];
    var quotesData = [];

    navigator.clipboard.writeText("The only true wisdom is in knowing you know nothing. - Socrates");

    quotesearch();
    imagesearch();

    $("#newquote").click(function(event) {
        event.preventDefault();
        const quoterandomizer = Math.floor(Math.random() * quotesData.length);
        const backgroundrandomizer = Math.floor(Math.random() * imagesData.length);

        $('.textbox').animate({ opacity: 0 }, 500, function() {
            $(this).animate({ opacity: 1 }, 500);
            $('#text').html(quotesData[quoterandomizer].quote);
        });

        $('.author').animate({ opacity: 0 }, 500, function() {
            $(this).animate({ opacity: 1 }, 500);
            $('#author').html("- " + quotesData[quoterandomizer].source);
        });

        $('#tweet-quote').attr(
            'href',
            'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
            encodeURIComponent('"' + quotesData[quoterandomizer].quote + '" ' + quotesData[quoterandomizer].source)
        );

        $("#copy-quote").off("click").on("click", function(event) {
            event.preventDefault();
            navigator.clipboard.writeText(quotesData[quoterandomizer].quote + " - " + quotesData[quoterandomizer].source);
        });

        $("body").css("background-image", "url(" + imagesData[backgroundrandomizer].src.original + ")");
        $(":root").get(0).style.setProperty("--coloruse", imagesData[backgroundrandomizer].avg_color);
    });

    function imagesearch() {
        return $.ajax({
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", apikey);
            },
            url: "https://api.pexels.com/v1/search?query=nature&per_page=50",
            success: function(data) {
                imagesData = data.photos;
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

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
