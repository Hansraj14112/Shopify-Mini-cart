
function success(){
  $.ajax({
    url: "/cart",
    type: 'GET',
    dataType: 'html',
    success: function(response) {
      $('.cart_data').html('');
      var result = $(response).find('.cart_data').html();
      $('.cart_data').html(result);
      var item_count = $(response).find('.cart_count').html();          
      $('.cart_count').text(item_count);
      $('.cart_data').css('right','0');
      $('.cart_data').css('transition','1s all');
    }
  });


}

$(document).ready(function(){
  $(".icon-cart-empty").click(function(){
    //alert("Hello");
    $(".cart_data.fetch_data").removeClass('hide');
  });  
});
$(document).ready(function(){
  $(".header__icon").click(function(){
    $(".cart_data.fetch_data").removeAttr('style');
    $(".cart_data.fetch_data").removeClass('hide');
  });  
});

$(document).on('click','.plus_udpate_clas',function(){
  var v_qty = $(this).parents('.update_cart').find(".quantity").val();
  v_qty++;
  $(this).parents('.update_cart').find(".quantity").val(v_qty);
  var id = $(this).attr('variant_id');
  $.post('/cart/update.js',"updates["+id+"]="+v_qty,)

         setTimeout(function(){
    jQuery.getJSON('/cart.js', function(cart) {
      console.log(cart);
      // now have access to Shopify cart object
      var amount = (cart.total_price/100);
      var new_amount = amount.toFixed(2);
      $('.updatess').html('Total :$'+ new_amount + ' USD');
    });
  },200);
});     

$(document).on('click','.minus_udpate_clas',function(){
  var v_qty = $(this).parents('.update_cart').find(".quantity").val();

  v_qty--;

  $(this).parents('.update_cart').find(".quantity").val(v_qty);
  if(v_qty == '0'){
    $(this).parents('li').find('.right.remove').trigger('click');
  }
  var id = $(this).attr('variant_id');
  $.post('/cart/update.js',"updates["+id+"]="+v_qty,) 
         setTimeout(function(){
    jQuery.getJSON('/cart.js', function(cart) {
      console.log(cart);
      // now have access to Shopify cart object
      var amount = (cart.total_price/100);
      var new_amount = amount.toFixed(2);
      $('.updatess').html('Total :$'+ new_amount + ' USD');
    });
  },200);
});



// close function here 
$(document).on("click",".cart_close",function(e) {
  $(".cart_data.fetch_data").addClass('hide');
  $('.cart_data').css('right','-500px');
  $('.cart_data').css('transition','1s all');
  $('body').removeClass('extrass');
  $('.overlays').hide();
})



// ************************************MinI Cart*******************************************
$(document).ready(function(){
  $('.product-form__submit').click(function(e){
    e.preventDefault();
    //alert("Hello");
    var newid = $('.select__select option:selected').attr('id');
    //alert(newid);
    var qty = parseInt(1);
    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      cache:false,
      data : {
        id: newid,
        quantity: qty
      },
      dataType: "html",
      success: function (data) {
        success();

        $('.overlays').show();
        //$('.overlays').show();
        jQuery.getJSON('/cart.js', function(cart) {
          var cart_total_item = cart.item_count;
          $('.cart_count').html(cart_total_item);
        });

      },

    });
    setTimeout(function(){ 
      jQuery.getJSON('/cart.js', function(cart) {
        var count =cart.item_count;
        $("span .cart_count").text(cart.item_count);
        alert(count);
      } );
    }, 3000); 
    $(".cart_data.fetch_data").removeClass('hide');
  });

$('.site-nav__link--cart').click(function(e){
    e.preventDefault();
    $('.cart_data').css('right','0');
    $('.cart_data').removeClass('extras');
    $('.overlays').show();
    $('body').addClass('extrass');
  });
});

$(document).on("click","a.right.remove",function(e) {
  e.preventDefault();
  removeItem( $(this) );
 
});
// attach this function to the event handler
function removeItem(remove) {
  var productId = parseInt($('.remove').attr('data-id'));
  // ajax post to update cart
  $.ajax({
    type: "POST",
    url: "/cart/change.js",
    dataType: "json",
    data: 'quantity=0&id=' + productId,
    async: false
  }).done(function(data, textStatus, jqXHR) {
//     ***********************Get Data***********************
    $.ajax({
      url: '/cart',
      success: function(data) {
        $('.cart_data').html('');
        var cart1 = $(data).find('.cart_data').html();
        $('.cart_data').html(cart1);
        $('.cart_close').click(function(){
          //           $('.mini_cart').css('right','-500px');
          $('.cart_data').addClass('extras');
          $('.overlays').hide();
        })

        setTimeout(function(){ 
          jQuery.getJSON('/cart.js', function(cart) {
            var count =cart.item_count;
            $("span .cart_count").text(cart.item_count);
            alert(count);
          } );
        }, 3000);
}
    });  
  //     ***********************Get Data***********************
 });
}

