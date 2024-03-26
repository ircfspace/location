$(document).on('click', '#copyFromQR, #copyUrl', function (e) {
    e.preventDefault();
    const input = document.getElementById('subUrl');
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    $("#qrModal").modal('hide');
    alert('آدرس در کلیپ‌بورد کپی شد.');
});

let source = 'yebekhe/TVC';
$(document).on('click', 'a[data-loc]', function (e) {
    e.preventDefault();
    let location = $(this).data('loc');
    let title = location.toUpperCase();
    $('#countryLoc a').removeClass('active');
    $(this).addClass('active');
    let config = 'https://raw.githubusercontent.com/'+source+'/main/subscriptions/location/normal/'+title;
    $('#qrcode img').attr('src', "https://quickchart.io/qr/?size=300x200&light=ffffff&text="+encodeURIComponent(config));
    $('#qrModal h4').html('QRCode ('+title+')');
    $('#qrcode input').val(config);
    $("#qrModal").modal('show');
});

$('#qrModal').on('hidden.bs.modal', function () {
    $('#countryLoc a').removeClass('active');
});