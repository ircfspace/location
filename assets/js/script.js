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

window.addEventListener('load', function() {
    fetch('https://api.github.com/repos/yebekhe/TVC/contents/subscriptions/location/normal')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let locationPaths = data.filter(item => !item.path.includes("XX"));
            locationPaths = locationPaths.map(item => item.name);
            let html = '';
            locationPaths.forEach(function(element) {
                html += '<a href="" data-loc="'+element.toLowerCase()+'">';
                html += '<div class="slide">';
                html += '<img src="./assets/img/flags/'+element.toLowerCase()+'.svg?v1.1" alt="'+element+'" />';
                html += '<p dir="auto">'+element+'</p>';
                html += '</div>';
                html += '</a>';
            });
            $('#countryLoc').html(html);
        })
        .catch(error => {
            let defList = '<a href="" data-loc="ir"><div class="slide"><img src="./assets/img/flags/ir.svg?v2" alt="IR" /><p dir="auto">ایران</p></div></a><a href="" data-loc="ae"><div class="slide"><img src="./assets/img/flags/ae.svg" alt="AE" /><p dir="auto">امارات</p></div></a><a href="" data-loc="at"><div class="slide"><img src="./assets/img/flags/at.svg" alt="AT" /><p dir="auto">اتریش</p></div></a><a href="" data-loc="us"><div class="slide"><img src="./assets/img/flags/us.svg" alt="US" /><p dir="auto">امریکا</p></div></a><a href="" data-loc="gb"><div class="slide"><img src="./assets/img/flags/gb.svg" alt="GB" /><p dir="auto">انگلیس</p></div></a><a href="" data-loc="ie"><div class="slide"><img src="./assets/img/flags/ie.svg" alt="IE" /><p dir="auto">ایرلند</p></div></a><a href="" data-loc="id"><div class="slide"><img src="./assets/img/flags/id.svg" alt="ID" /><p dir="auto">اندونزی</p></div></a><a href="" data-loc="il"><div class="slide"><img src="./assets/img/flags/il.svg" alt="IL" /><p dir="auto">اسرائیل</p></div></a><a href="" data-loc="za"><div class="slide"><img src="./assets/img/flags/za.svg" alt="ZA" /><p dir="auto">آفریقا</p></div></a><a href="" data-loc="de"><div class="slide"><img src="./assets/img/flags/de.svg" alt="DE" /><p dir="auto">آلمان</p></div></a><a href="" data-loc="bh"><div class="slide"><img src="./assets/img/flags/bh.svg" alt="BH" /><p dir="auto">بحرین</p></div></a><a href="" data-loc="tr"><div class="slide"><img src="./assets/img/flags/tr.svg" alt="TR" /><p dir="auto">ترکیه</p></div></a><a href="" data-loc="cz"><div class="slide"><img src="./assets/img/flags/cz.svg" alt="CZ" /><p dir="auto">جمهوری چک</p></div></a><a href="" data-loc="cn"><div class="slide"><img src="./assets/img/flags/cn.svg" alt="CN" /><p dir="auto">چین</p></div></a><a href="" data-loc="ru"><div class="slide"><img src="./assets/img/flags/ru.svg" alt="RU" /><p dir="auto">روسیه</p></div></a><a href="" data-loc="jp"><div class="slide"><img src="./assets/img/flags/jp.svg" alt="JP" /><p dir="auto">ژاپن</p></div></a><a href="" data-loc="ch"><div class="slide"><img src="./assets/img/flags/ch.svg" alt="CH" /><p dir="auto">سوئیس</p></div></a><a href="" data-loc="se"><div class="slide"><img src="./assets/img/flags/se.svg" alt="SE" /><p dir="auto">سوئد</p></div></a><a href="" data-loc="sg"><div class="slide"><img src="./assets/img/flags/sg.svg" alt="SG" /><p dir="auto">سنگاپور</p></div></a><a href="" data-loc="fi"><div class="slide"><img src="./assets/img/flags/fi.svg" alt="FI" /><p dir="auto">فنلاند</p></div></a><a href="" data-loc="fr"><div class="slide"><img src="./assets/img/flags/fr.svg" alt="FR" /><p dir="auto">فرانسه</p></div></a><a href="" data-loc="ca"><div class="slide"><img src="./assets/img/flags/ca.svg" alt="CA" /><p dir="auto">کانادا</p></div></a><a href="" data-loc="cr"><div class="slide"><img src="./assets/img/flags/cr.svg" alt="CR" /><p dir="auto">کاستاریکا</p></div></a><a href="" data-loc="pl"><div class="slide"><img src="./assets/img/flags/pl.svg" alt="PL" /><p dir="auto">لهستان</p></div></a><a href="" data-loc="hk"><div class="slide"><img src="./assets/img/flags/hk.svg" alt="HK" /><p dir="auto">هنگ کنگ</p></div></a><a href="" data-loc="nl"><div class="slide"><img src="./assets/img/flags/nl.svg" alt="NL" /><p dir="auto">هلند</p></div></a><a href="" data-loc="in"><div class="slide"><img src="./assets/img/flags/in.svg" alt="IN" /><p dir="auto">هند</p></div></a>';
            $('#countryLoc').html(defList);
        });
});