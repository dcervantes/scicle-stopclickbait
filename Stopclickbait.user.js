// ==UserScript==
// @name        Stopclickbait
// @namespace   clickbait
// @include     *
// @version     1
// @grant       none
// @require       https://algorithmia.com/v1/clients/js/algorithmia-0.2.0.js
// ==/UserScript==


jQuery(document).ready(function() {

    jQuery( "body" ).prepend( "<menu type='context' id='mymenu'><menuitem id='changeclickbait' label='Change Clickbait Headline'></menuitem></menu>" );

    jQuery("a, h1, h2, h3").contextmenu(function() {
        jQuery('#clickbait_target').removeAttr('id');
        jQuery(this).find( "a" ).attr('contextmenu','mymenu');
        jQuery(this).find( "a" ).attr('id','clickbait_target');
    });


    jQuery("#changeclickbait").click(function(){
        var clickbait_target = jQuery('#clickbait_target');
        var link = clickbait_target.prop("href");
        var input = [link, 7];
        // Change XXXXXXXXXXXX with your API Key
        Algorithmia.client("XXXXXXXXXXXX")
           .algo("algo://nlp/SummarizeURL/0.1.4")
           .pipe(input)
           .then(function(output) {
                var clickbait_target = jQuery('#clickbait_target');
                var res = output.result.split(".");
                clickbait_target.text(res[5]);
                clickbait_target.removeAttr('id');
           });
    });
});


		


