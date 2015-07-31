$(function() {
    $( "#map-container" ).resizable({
    	ghost: true,
    	handles: "e",
    	stop: function( event, ui ) {}
    }).height(
    	$( window ).height() - 50
    );
});

$( window ).resize( function() {
	$( "#map-container" ).css(
		"width", "40%"
	).height(
		$( window ).height() - 50
	).resizable( "option", "maxWidth", $( "#map-container" ).height() );
	$( "#main-container" ).width( "width", "60%" );
});

$( "#map-container" ).on( "resizestop", function( event, ui ) {
	var map_min_w = Math.round(
		parseInt( $( this ).css( "min-width" ) ) * $( document ).width() / 100
	);
	var diff = ui.size.width - ui.originalSize.width;
	if (ui.size.width < map_min_w)
		diff = map_min_w - ui.originalSize.width
	var main_cont = $( "#main-container" );
	var main_min_w = parseInt( main_cont.css( "min-width" ) );
	var body_w = parseInt( $( document.body ).css( "width" ) );
	var win_w = $( window ).width()
	if ( diff < 0 ) { //Zoom out
		if ( body_w > win_w ) {
			var temp = body_w + diff;
			if ( temp >= win_w ) {
				$( document.body ).css( "width", ( temp ) + "px" );
				return;
			} else {
				$( document.body ).css( "width", ( win_w ) + "px" );
				diff = temp - win_w;
			}
		}
		main_cont.width( main_cont.width() - diff );
	} else if ( diff > 0 ) { //Zoom in
		if ( main_cont.width() > main_min_w ) {
			var temp = main_cont.width() - diff;
			if ( temp >= main_min_w ) {
				main_cont.width( temp );
				return
			} else {
				main_cont.width( main_min_w );
				diff = main_min_w - temp;
			}
		}
		$( document.body ).css( "width", ( body_w + diff ) + "px" );
	}
});