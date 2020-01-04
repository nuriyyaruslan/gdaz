/*
=====================================================
                    =    main scripts starts   =
=====================================================
*/
$(document).ready(function(){
    $('.content-item table').click(function(){
        $(this).addClass('table-hidden');
        $(this).parent().find('.cnt').slideDown();
    })
    $('.close-btn').click(function(){
        $(this).parent('.cnt').slideUp();
        $(this).parents('.content-item').find('table').removeClass('table-hidden');
    })

    /* starts */
    var clickCount = $('.click_heart .click-count').text();
    $('.click_heart .heart').click(function(){
        clickCount = Number(clickCount) + 1;
        $('.click_heart .click-count').text(clickCount);
    })
    

    /* ends */





});