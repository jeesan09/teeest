var Page = (function() {

    var $container = $( '#container' ),
        $bookBlock = $( '#bb-bookblock' ),
        $items = $bookBlock.children(),
        itemsCount = $items.length,
        current = 0,
        bb = $( '#bb-bookblock' ).bookblock( {
            speed : 800,
            perspective : 2000,
            shadowSides	: 0.8,
            shadowFlip	: 0.4,
            onEndFlip : function(old, page, isLimit) {

                current = page;
                // update TOC current
                updateTOC();
                // updateNavigation
                updateNavigation( isLimit );
                // initialize jScrollPane on the content div for the new item
                setJSP( 'init' );
                // destroy jScrollPane on the content div for the old item
                setJSP( 'destroy', old );

            }
        } ),
        $navNext = $( '#bb-nav-next' ),
        $testButton = $( '#test-button' ),
        $navPrev = $( '#bb-nav-prev' ).hide(),
        $menuItems = $container.find( 'ul.menu-toc > li' ),
        $tblcontents = $( '#tblcontents' ),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        supportTransitions = Modernizr.csstransitions;

    function init() {

        // initialize jScrollPane on the content div of the first item
        setJSP( 'init' );
        initEvents();

    }
    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '37') {
            nextNo--;
            if(nextNo < minItem){
                nextNo = minItem;
            }
            $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('hide');
            stickyNoteCurrent = nextNo;
            if(stickyNotesInfo[stickyNoteCurrent] === null || stickyNotesInfo[stickyNoteCurrent] === undefined){
                $.PostItAll.new({
                    onCreated: function(id){
                        stickyNotesInfo[stickyNoteCurrent] = {
                            itemNo : nextNo,
                            stickyId : id
                        };
                        localStorage.setItem("stickyNotesInfo", JSON.stringify(stickyNotesInfo));
                    }
                });
            }
            else{
                $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('show');
            }
            $('#ajax-loader').fadeIn();
            var nextItem = '#item' + nextNo;
            var nextPage = 'item' + nextNo + '.html';
            var html = $(nextItem).html();
            bb.prev();
            if(html == ''){
                $.ajax({
                    url: nextPage,
                    method:'get',
                    success:function (response) {
                        $('#ajax-loader').fadeOut();
                        $(nextItem).html(response);
                        $("#jumpPageNo").val(''); //clear the user input field
                        addHistory(nextNo);
                    }
                });
            }
            else{
                $('#ajax-loader').fadeOut();
            }
        }
        else if (e.keyCode == '39') {
            nextNo++;
            if(nextNo > maxItem){
                nextNo = maxItem;
            }
            $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('hide');
            stickyNoteCurrent = nextNo;
            if(stickyNotesInfo[stickyNoteCurrent] === null || stickyNotesInfo[stickyNoteCurrent] === undefined){
                $.PostItAll.new({
                    onCreated: function(id){
                        stickyNotesInfo[stickyNoteCurrent] = {
                            itemNo : nextNo,
                            stickyId : id
                        };
                        localStorage.setItem("stickyNotesInfo", JSON.stringify(stickyNotesInfo));
                    }
                });
            }
            else{
                $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('show');
            }
            $('#ajax-loader').fadeIn();
            var nextItem = '#item' + nextNo;
            var nextPage = 'item' + nextNo + '.html';
            var html = $(nextItem).html();
            bb.next();
            if(html == ''){
                $.ajax({
                    url: nextPage,
                    method:'get',
                    success:function (response) {
                        $('#ajax-loader').fadeOut();
                        $(nextItem).html(response);
                        $("#jumpPageNo").val(''); //clear the user input field
                        addHistory(nextNo);
                    }
                });
            }
            else{
                $('#ajax-loader').fadeOut();
            }
        }

    }
    function initEvents() {


        // add navigation events
        $navNext.on( 'click', function() {
            nextNo++;
            if(nextNo > maxItem){
                nextNo = maxItem;
            }
            $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('hide');
            stickyNoteCurrent = nextNo;
            if(stickyNotesInfo[stickyNoteCurrent] === null || stickyNotesInfo[stickyNoteCurrent] === undefined){
                $.PostItAll.new({
                    onCreated: function(id){
                        stickyNotesInfo[stickyNoteCurrent] = {
                            itemNo : nextNo,
                            stickyId : id
                        };
                        localStorage.setItem("stickyNotesInfo", JSON.stringify(stickyNotesInfo));
                    }
                });
            }
            else{
                $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('show');
            }
			/*Page Load Section */
            $('#ajax-loader').fadeIn();
            var nextItem = '#item' + nextNo;
            var nextPage = 'item' + nextNo + '.html';
            var html = $(nextItem).html();
            bb.next();
            if(html == ''){
                $.ajax({
                    url: nextPage,
                    method:'get',
                    success:function (response) {
                        $('#ajax-loader').fadeOut();
                        $(nextItem).html(response);
                        $("#jumpPageNo").val(''); //clear the user input field
                        addHistory(nextNo);
                    }
                });
			}
			else{
                $('#ajax-loader').fadeOut();
			}
            return false;
        } );

        $navPrev.on( 'click', function() {
            nextNo--;
            if(nextNo < minItem){
                nextNo = minItem;
            }
            $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('hide');
            stickyNoteCurrent = nextNo;
            if(stickyNotesInfo[stickyNoteCurrent] === null || stickyNotesInfo[stickyNoteCurrent] === undefined){
                $.PostItAll.new({
                    onCreated: function(id){
                        stickyNotesInfo[stickyNoteCurrent] = {
                            itemNo : nextNo,
                            stickyId : id
                        };
                        localStorage.setItem("stickyNotesInfo", JSON.stringify(stickyNotesInfo));
                    }
                });
            }
            else{
                $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('show');
            }
            $('#ajax-loader').fadeIn();
            var nextItem = '#item' + nextNo;
            var nextPage = 'item' + nextNo + '.html';
            var html = $(nextItem).html();
            bb.prev();
            if(html == ''){
                $.ajax({
                    url: nextPage,
                    method:'get',
                    success:function (response) {
                        $('#ajax-loader').fadeOut();
                        $(nextItem).html(response);
                        $("#jumpPageNo").val(''); //clear the user input field
                        addHistory(nextNo);
                    }
                });
            }
            else{
                $('#ajax-loader').fadeOut();
            }
            return false;
        } );





        $testButton.on( 'click', function() {
            var jumpPageNo = $('#jumpPageNo').val();
            nextNo = jumpPageNo;
            if(nextNo < minItem){
                nextNo = minItem;
            }
            $('#ajax-loader').fadeIn();
            var nextItem = '#item' + nextNo;
            var nextPage = 'item' + nextNo + '.html';
            var html = $(nextItem).html();
            bb.jump(nextNo);
            if(html == ''){
                $.ajax({
                    url: nextPage,
                    method:'get',
                    success:function (response) {
                        $('#ajax-loader').fadeOut();
                        $(nextItem).html(response);
                        addHistory(nextNo);

                    }
                });
            }
            else{
                $('#ajax-loader').fadeOut();
            }
            return false;
        } );






        // add swipe events
        $items.on( {
            'swipeleft'		: function( event ) {

                if( $container.data( 'opened' ) ) {
                    return false;
                }
                nextNo++;
                if(nextNo > maxItem){
                    nextNo = maxItem;
                }
                $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('hide');
                stickyNoteCurrent = nextNo;
                if(stickyNotesInfo[stickyNoteCurrent] === null || stickyNotesInfo[stickyNoteCurrent] === undefined){
                    $.PostItAll.new({
                        onCreated: function(id){
                            stickyNotesInfo[stickyNoteCurrent] = {
                                itemNo : nextNo,
                                stickyId : id
                            };
                            localStorage.setItem("stickyNotesInfo", JSON.stringify(stickyNotesInfo));
                        }
                    });
                }
                else{
                    $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('show');
                }
                $('#ajax-loader').fadeIn();
                var nextItem = '#item' + nextNo;
                var nextPage = 'item' + nextNo + '.html';
                var html = $(nextItem).html();
                bb.next();
                if(html == ''){
                    $.ajax({
                        url: nextPage,
                        method:'get',
                        success:function (response) {
                            $('#ajax-loader').fadeOut();
                            $(nextItem).html(response);
                        }
                    });
                }
                else{
                    $('#ajax-loader').fadeOut();
                }
                return false;
            },
            'swiperight'	: function( event ) {
                if( $container.data( 'opened' ) ) {
                    return false;
                }
                nextNo--;
                if(nextNo < minItem){
                    nextNo = minItem;
                }
                $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('hide');
                stickyNoteCurrent = nextNo;
                if(stickyNotesInfo[stickyNoteCurrent] === null || stickyNotesInfo[stickyNoteCurrent] === undefined){
                    $.PostItAll.new({
                        onCreated: function(id){
                            stickyNotesInfo[stickyNoteCurrent] = {
                                itemNo : nextNo,
                                stickyId : id
                            };
                            localStorage.setItem("stickyNotesInfo", JSON.stringify(stickyNotesInfo));
                        }
                    });
                }
                else{
                    $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('show');
                }
                $('#ajax-loader').fadeIn();
                var nextItem = '#item' + nextNo;
                var nextPage = 'item' + nextNo + '.html';
                var html = $(nextItem).html();
                bb.prev();
                if(html == ''){
                    $.ajax({
                        url: nextPage,
                        method:'get',
                        success:function (response) {
                            $('#ajax-loader').fadeOut();
                            $(nextItem).html(response);
                        }
                    });
                }
                else{
                    $('#ajax-loader').fadeOut();
                }
                return false;
            }
        } );

        // show table of contents
        $tblcontents.on( 'click', toggleTOC );

        // click a menu item
        $menuItems.on( 'click', function() {
            var $el = $( this ),
                idx = $el.children('a:first').attr('item-no'),
                jump = function() {
                    nextNo = idx;
                    $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('hide');
                    stickyNoteCurrent = nextNo;
                    if(stickyNotesInfo[stickyNoteCurrent] === null || stickyNotesInfo[stickyNoteCurrent] === undefined){
                        $.PostItAll.new({
                            onCreated: function(id){
                                stickyNotesInfo[stickyNoteCurrent] = {
                                    itemNo : nextNo,
                                    stickyId : id
                                };
                                localStorage.setItem("stickyNotesInfo", JSON.stringify(stickyNotesInfo));
                            }
                        });
                    }
                    else{
                        $(stickyNotesInfo[stickyNoteCurrent].stickyId).postitall('show');
                    }
                    $('#ajax-loader').fadeIn();
                    var nextItem = '#item' + nextNo;
                    var nextPage = 'item' + nextNo + '.html';
                    var html = $(nextItem).html();
                    bb.jump(nextNo);
                    if(html == ''){
                        $.ajax({
                            url: nextPage,
                            method:'get',
                            success:function (response) {
                                $('#ajax-loader').fadeOut();
                                $(nextItem).html(response);
                            }
                        });
                    }
                    else{
                        $('#ajax-loader').fadeOut();
                    }

                };



            current !== idx ? closeTOC( jump ) : closeTOC();

            return false;

        } );

        // reinit jScrollPane on window resize
        $( window ).on( 'debouncedresize', function() {
            // reinitialise jScrollPane on the content div
            setJSP( 'reinit' );
        } );

    }

    function setJSP( action, idx ) {

        var idx = idx === undefined ? current : idx,
            $content = $items.eq( idx ).children( 'div.content' ),
            apiJSP = $content.data( 'jsp' );

        if( action === 'init' && apiJSP === undefined ) {
            $content.jScrollPane({verticalGutter : 0, hideFocus : true });
        }
        else if( action === 'reinit' && apiJSP !== undefined ) {
            apiJSP.reinitialise();
        }
        else if( action === 'destroy' && apiJSP !== undefined ) {
            apiJSP.destroy();
        }

    }

    function updateTOC() {
        $menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
    }

    function updateNavigation( isLastPage ) {

        if( current === 0 ) {
            $navNext.show();
            $navPrev.hide();
        }
        else if( isLastPage ) {
            $navNext.hide();
            $navPrev.show();
        }
        else {
            $navNext.show();
            $navPrev.show();
        }

    }

    function toggleTOC() {
        var opened = $container.data( 'opened' );
        opened ? closeTOC() : openTOC();
    }

    function openTOC() {
        $navNext.hide();
        $navPrev.hide();
        $container.addClass( 'slideRight' ).data( 'opened', true );
    }

    function closeTOC( callback ) {

        updateNavigation( current === itemsCount - 1 );
        $container.removeClass( 'slideRight' ).data( 'opened', false );
        if( callback ) {
            if( supportTransitions ) {
                $container.on( transEndEventName, function() {
                    $( this ).off( transEndEventName );
                    callback.call();
                } );
            }
            else {
                callback.call();
            }
        }

    }



    function addHistory(pageNo) {

        if(navigator.onLine)
        {
            var chapterName = getChapterNameByPageNo(pageNo);
            if(chapterName != '')
            {
                $.ajax({  
                    type: "POST",  
                    url: "http://localhost:8000/api/save-user-information",  
                    data: {
                        'user_id': "user_id", 
                        'page_no': pageNo, 
                        'chapter_name': chapterName, 
                        'topic_name': "topic_name"
                    },  
                    success: function(response) {  
                        console.log(response); 
                    }  
                }); 
            }
        }
        // Parse any JSON previously stored in allEntries
        var found = false;
        var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
        if(existingEntries == null) existingEntries = [];

        for(var i = 0; i < existingEntries.length; i++) {
            if (existingEntries[i].pageNo == pageNo) {
                found = true;
                break;
            }
        }

        if(!found)
        {
            //console.log("first functon ok");
            var chapterName = getChapterNameByPageNo(pageNo);
            if(chapterName != '')
            {
                var entry = {
                    "pageNo": parseInt(pageNo),
                    "chapterName": chapterName
                };
                localStorage.setItem("entry", JSON.stringify(entry));
                // Save allEntries back to local storage
                existingEntries.push(entry);
                localStorage.setItem("allEntries", JSON.stringify(existingEntries));
            }
            
        }
        console.log(pageNo);
        console.log(JSON.parse(localStorage.getItem("allEntries")));
    };


    function getChapterNameByPageNo(pageNo)
    {
        //console.log("second functon ok");
        var chapterName = '';
        for(var i = 0; i < data.length; i++) {
            if (pageNo > parseInt(data[i].start) && pageNo < parseInt(data[i].end)) {
                chapterName = data[i].name;
            }
        }

        return chapterName;
    }



    return { init : init };

})();