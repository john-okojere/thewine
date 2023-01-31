$('#home').show();
$('#addwine').hide();
$('#shelf').hide();
$('#notification').hide();
$('#cart').hide();

$('#home-btn').click(function (e) {
    e.preventDefault();
    $('#home-btn').addClass('active');
    $('#shelf-btn').removeClass('active');
    $('#addwine-btn').removeClass('active');
    $('#notification-btn').removeClass('active');
    $('#notification').hide();

    $('#cart-btn').removeClass('active');
    $('#cart').hide();
    $('#home').show();
    $('#addwine').hide();
    $('#shelf').hide();
});

function shelf() {
    $('#home-btn').removeClass('active');
    $('#shelf-btn').addClass('active');
    $('#addwine-btn').removeClass('active');
    $('#notification-btn').removeClass('active');

    $('#cart-btn').removeClass('active');
    $('#cart').hide();
    $('#notification').hide();
    $('#home').hide();
    $('#addwine').hide();
    $('#shelf').show();
}

$('#shelf-btn').click(function shelf(e) {
    e.preventDefault();
    $('#home-btn').removeClass('active');
    $('#shelf-btn').addClass('active');
    $('#addwine-btn').removeClass('active');
    $('#notification-btn').removeClass('active');
    $('#notification').hide();
    $('#cart-btn').removeClass('active');
    $('#cart').hide();
    $('#home').hide();
    $('#addwine').hide();
    $('#shelf').show();
});


$('#addwine-btn').click(function (e) {
    e.preventDefault();
    $('#home-btn').removeClass('active');
    $('#shelf-btn').removeClass('active');
    $('#addwine-btn').addClass('active');
    $('#notification-btn').removeClass('active');
    $('#cart-btn').removeClass('active');
    $('#cart').hide();
    $('#notification').hide();
    $('#home').hide();
    $('#addwine').show();
    $('#shelf').hide();
});



$('#notification-btn').click(function (e) {
    e.preventDefault();
    $('#home-btn').removeClass('active');
    $('#shelf-btn').removeClass('active');
    $('#addwine-btn').removeClass('active');
    $('#notification-btn').addClass('active');
    $('#notification').show();
    $('#cart-btn').removeClass('active');
    $('#cart').hide();
    $('#home').hide();
    $('#addwine').hide();
    $('#shelf').hide();
});
$('#cart-btn').click(function (e) {
    e.preventDefault();
    $('#home-btn').removeClass('active');
    $('#shelf-btn').removeClass('active');
    $('#addwine-btn').removeClass('active');
    $('#notification-btn').removeClass('active');
    $('#notification').hide();
    $('#cart-btn').addClass('active');
    $('#cart').show();
    $('#home').hide();
    $('#addwine').hide();
    $('#shelf').hide();
});

const firebaseConfig = {
    apiKey: "AIzaSyBBkGVvAhYERnV9kHXMIlR1SCXyuKrI_GM",
    authDomain: "the-wine-7f58a.firebaseapp.com",
    databaseURL: "https://the-wine-7f58a-default-rtdb.firebaseio.com",
    projectId: "the-wine-7f58a",
    storageBucket: "the-wine-7f58a.appspot.com",
    messagingSenderId: "919777594037",
    appId: "1:919777594037:web:0862e58c35c95c45df4cfc"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);



$('#submitwine').click(function (event) {
    event.preventDefault()
    var link = $('[name="image"]').val()
    var name = $('[name="name"]').val()
    var price = $('[name="price"]').val()

    const wine = firebase.database().ref('Wines/').push({
        image: link,
        name: name,
        price: price,
    });
    $('[name="image"]').val('')
    $('[name="name"]').val('')
    $('[name="price"]').val('')
    $('[name="description"]').val('')
    firebase.database().ref('Wines/' + wine.key).on('value', function (snapshot) {
        var wine = snapshot.val();
        var wine_id = snapshot.key;
        firebase.database().ref('Notification/Shelf/' + wine_id).set({
            updated: "A new Wine Has been added to Shelf.",
            wine: wine
        })
    })

    shelf();
})

firebase.database().ref("Notification/Cart/").on('value', function (data) {
    var noOfNotice = data.numChildren() 
    console.log(noOfNotice)
    $('#notupdatecart').empty();
    $('#notupdatecart').append(`Cart (${noOfNotice})`);
    if (noOfNotice > 0 ) {
        document.getElementById('notupdatecart').style.color = 'red';
        
    }
 $('#notifiCart').empty()
    data.forEach(element => {
        $('#notifiCart').prepend(
            `
            <div class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                <div class="d-flex w-100 align-items-center justify-content-between">
                    <div class="col-8 mb-1 "> <span class="mb-1">${element.val().updated}</span> - ${element.val().wine.name}</div>
                    <small>₦${element.val().wine.price}</small>
                   <div>
                   <span><a href="#" onclick="deletecartnote('${element.key}')" class="text-dark" ><i class="fa fa-trash-alt" ></i></a></span>
                   </div> 
                </div>
            </div>
            `
        );

    });
});

firebase.database().ref("Notification/Shelf/").on('value', function (data) {
    var noOfNotice = data.numChildren() 
    console.log(noOfNotice)
    $('#notupdateshelf').empty();
    $('#notupdateshelf').append(`Shelf (${noOfNotice})`);
    if (noOfNotice > 0) {
        document.getElementById('notupdateshelf').style.color = 'red';
    }
    $('#notifiShelf').empty()
    data.forEach(element => {
    $('#notifiShelf').prepend(
            `
            <div class="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
                <div class="d-flex w-100 align-items-center justify-content-between">
                    <div class="col-8 mb-1 "> <span class="mb-1">${element.val().updated}</span> - ${element.val().wine.name}</div>
                        <small>₦${element.val().wine.price}</small>
                       <div>
                       <span><a href="#" onclick="deleteshelfnote('${element.key}')" class="text-dark" ><i class="fa fa-trash-alt" ></i></a></span>
                       </div> 
                        </div>
                </div>
            </div>
            `
        );

    });
});


function deletecart(id) {
    firebase.database().ref('Cart/'+ id).set({
        null:null
    })
}

function deletecartnote(id) {
    firebase.database().ref('Notification/Cart/'+ id).set({
        null:null
    })
}
function deleteshelfnote(id) {
    firebase.database().ref('Notification/Shelf/'+ id).set({
        null:null
    })
}


var cart = false
firebase.database().ref("Wines/").on('value', function (data) {
    data.forEach(element => {
        $('#shelf-list').prepend(
            `
        <div class="col">
            <div class="card shadow-sm">
                <div class=" product-image bd-placeholder-img card-img-top"
                    style="background-image:url(${element.val().image})">
                </div>
                <div class="card-body">
                    <h5>${element.val().name}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group mt-3">
                            <a href="#" id="${element.key}" onclick="addCart('${element.key}')" type="button" class="btn btn-sm btn-outline-secondary"><i
                                    class="fa fa-plus"></i> Cart</a>
                        </div>
                        <small class="mx-2 text-muted">₦${element.val().price}</small>
                    </div>
                </div>
            </div>
        
        </div>
        `
        );
         firebase.database().ref("Cart/" + element.key).on('value', function (datas) {
                if(datas.val()){
                    cart = true
                   $(`#${element.key}`).addClass('disabled')
        }else{
                    cart = false
                }
        });
    })
});

function addCart(key) {
    firebase.database().ref('Wines/' + key).on('value', function (snapshot) {
        var wine = snapshot.val();
        var wine_id = snapshot.key;
        firebase.database().ref('Cart/' + key).set({
            amount: 1,
            wine: wine
        })
        firebase.database().ref('Notification/Cart/' + wine_id).set({
            updated: "A new Wine Has been to Cart",
            wine: wine
        })
    })



   
    shelf();
}



firebase.database().ref("Cart/").on('value', function (data) {
    $('#cart-list').empty()

    data.forEach(element => {
        firebase.database().ref('Wines/' + element.key).on('value', function (snapshot) {
            var wine = snapshot.val();
            $('#cart-list').prepend(
                `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div>
                                <img src="${wine.image}"
                                    class="img-fluid rounded-3"
                                    alt="Shopping item" style="width: 65px;">
                            </div>
                            <div class="ms-3">
                                <h5>${wine.name}</h5>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <div style="width: 50px;">
                            </div>
                            <div style="width: 80px;">
                                <h5 class="mb-0">₦${wine.price}</h5>
                            </div>
                            <div>
                            <span><a href="#" onclick="deletecart('${element.key}')" class="text-dark" ><i class="fa fa-trash-alt" ></i></a></span>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            `
            );
        })
    })
}); 