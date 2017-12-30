$(document).ready(function() {
    var query = getUrlParameter('q');

    if (query) {
        query = query.replace(/\+/g, " ");

        $('#search').attr('value', query);
        $.get('http://localhost:8091/search', {'query': query}, function(data) {
            console.log(data);
            populate_results(data);
        })
        .fail(function() {
            $('#search-results').html('Error!');
        });
    }

    $('#search').keyup(function (event) {
        var query = $('#search').val();
        // Add a wildcard at the end of the query for partial-word matches
        // while the user types a query
        var lastChar = query.substring(-1);
        if (lastChar != " " && lastChar != "*") {
            query += "*";
        }

        $.get('http://localhost:8091/search', {'query': query}, function(data) {
            console.log(data);
            populate_results(data);
        })
        .fail(function() {
            $('#search-results').html('Error!');
        });
    });
});

var make_preview = function (text, max_length) {
    // Return an excerpt view of a string
    var preview = text.replace(/\n/g, " ").trim()

    if (preview.length > max_length) {
        preview = preview.substring(0, max_length-3).trim() + "..."
	}

    return preview
}

var populate_results = function (data) {
    if (data.length == 0) {
        $('#search-results').html('No results! :(');
    } else {
        $('#search-results').html('');
        for(var i = 0; i < data.length; i++) {
            var item = data[i];
            var template = $("#result-template").clone();
            template.attr("id", "");
            var $header = template.find(".header")
            $header.attr("href", 'localhost:8091/retrieve/' + item.path);
            $header.html(item.title);
            template.find(".extra").html(make_preview(item.url, 80));
            template.find(".description").html(item.body_text);

            template.appendTo("#search-results");
        }
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
