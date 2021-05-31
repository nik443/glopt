$(document).ready(function(){
    // SLIDER
    $('.slider').slick({
        infinite: false,
        centerMode: true,
        slidesToShow: 3,
        touchMove: false,
        draggable: false,
        speed: 1000,
        responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
              }
            }
        ]
    });
    $('.slider').slick('slickGoTo', 2);

    $('.slider').on('afterChange', function(event, slick, currentSlide){
        let index = $('.slick-current').attr('data-slick-index');
        let nextB = $('.slick-next');
        let prevB = $('.slick-prev');
        let child = $('.slick-current').children('.slider__item__content');

        if (index == 1) prevB.css('display', 'none');
        else prevB.css('display', 'block');
        if (index == 3) nextB.css('display', 'none');
        else nextB.css('display', 'block');

        for (let i of $('.slider__item')){
            if ($(i).hasClass('slick-current')){
                $(child).animate({
                    'zoom': '1',
                    'opacity': '1'
                }, 500);
            }
            else{
                $(i).children('.slider__item__content').animate({
                    'zoom': '0.7',
                    'opacity': '0.3',
                }, 500);
            }
        }
    });

    //CARDS-INFO
    $(document).on('click', '.prices__link', function(e){
        $(e.target).closest('.prices__item').find('.prices__more').animate({
            'right': '0px'
        }, 500);
        $(e.target).closest('.prices__content').animate({
            'left': '-262px'
        }, 500);
    });

    $(document).on('click', '.prices__back', function(e){
        e.preventDefault();
        $(e.target).closest('.prices__more').animate({
            'right': '-262px'
        }, 500);
        $(e.target).closest('.prices__item').find('.prices__content').animate({
            'left': '0px'
        }, 500);
    });

    //VALIDATE FORMS
    $(document).on('focus', 'form', function(e){
        validateForms('.consultation form');
        validateForms('.questions form');
        validateForms('#modal__form__1');
        validateForms('#modal__form__2');
    })
    function validateForms(form){
        $(form).validate({
            rules:{
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 16 
                },
                phone: "required",
                email: { /* расширенные настройки */
                    required: true, /* обязательно к заполнению */
                    email: true /* обязательно введенное должно быть имейлом */
                }
            },
            messages: { /* сообщения об ошибках */
                name: {
                   required: "Это поле обязательное к заполнению",
                   minlength: jQuery.validator.format("Введите минимум {0} символа") /* минимальное кол-во символов указанное в rules>name (запись {0} трогать нельзя) */
                },
                phone: "Некорректный номер телефона",
                email: {
                    required: "Пожалуйста введите свою почту", /* поле пустое */
                    email: "Неправильно введен адрес почты" /* некорректный ввод почты */
                }
            }
        });
    };
    $(document).mouseup(function(e){ //Подсказки ошибок закрываются если кликннуть за их пределами
        let errors = $('label.error');
        if (!errors.is(e.target) && errors.has(e.target).length === 0){ 
            errors.hide({
                "duration": 1000
            });
        }
    })


        //Модальные окна 
    $(document).on('click', '.modal__close', function(e){
        $('.overlay, .modal__consultation, .modal__arrange').css('display', 'none');
    })
    $(document).on('click', '[data-modal=consultation]', function(e){
        $('.overlay, .modal__consultation').css('display', 'block');
    })
    
    $(document).on('click', '.arrange', function(e){
        e.preventDefault();
        let nameCard = $(e.target).closest('.prices__item').find('.prices__headercard').text();
        $('.modal__descr').text(nameCard);
        $('.overlay, .modal__arrange').css('display', 'block');
    })

    //Маска ввода телефона
    $('input[name=phone]').mask("+7(999) 999-9999");
})