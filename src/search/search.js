$(document).ready(function() {
    var query = getUrlParameter('q');
    if (query) {
        $('#search').attr('value', query);
        populate_results([
            { 
                title: 'Dinosaurs - Wikipedia, the Free Encyclopedia', 
                url: 'https://en.wikipedia.org/wiki/Dinosaur',
                summary: 'Dinosaurs are a diverse group of reptiles '  +
                    'of the clade Dinosauria that first appeared during ' +
                    'the Triassic period. Although the exact origin and timing of the ...'
            },
            { 
                title: 'Dinosaurs - Pictures and Facts', 
                url: 'https://www.newdinosaurs.com/',
                summary: 'Listing 10000+ pictures of dinosaurs, ' +
                    'facts about them and other prehistoric animals, ' +
                    'bringing them closer to kids, their parents and teachers.'
            }
        ]);
        // $.get('http://localhost:2222/search', {'q': query}, function(data) {
        //     populate_results(data);
        //     var template = $("#template").clone();
        //     template.children(".header").html(;
        //     template.appendTo("#search-results");
        // });
    }
});

var populate_results = function (data) {
    for(var i=0; i<data.length; i++) {
        var item = data[i];
        var template = $("#template").clone();
        var $header = template.find(".header")
        $header.attr("href", item.url);
        $header.html(item.title);
        template.find(".extra").html(item.url);
        template.find(".description").html(item.summary);
        
        template.appendTo("#search-results");
    }
    $("#template").remove();
};

// thanks to 
// https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
