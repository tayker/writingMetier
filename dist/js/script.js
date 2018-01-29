window.onload = function(){
    var accordeon = {
        init: function(){
            let accordeons = document.querySelectorAll('.faq__item');

            accordeons.forEach(function(item){
                item.addEventListener('click', accordeon.click);
            });
        },
        click: function(e){
            this.classList.toggle('active');
        }
    }
    var adaptiveMenu = {
        init: function(){
            let btn = document.getElementById('navBtn');
            
            btn.addEventListener('click', adaptiveMenu.click);
        },
        click: function(){
            let menu = document.getElementById('adaptiveMenu');
            
            menu.classList.toggle('active');
            this.classList.toggle('active');
        }
    }
    var parallax = {
        init: function(){
            window.addEventListener('scroll', parallax.scroll);
        },
        scroll: function(){
            let service = document.getElementById('service');
            
            let ytrans = window.pageYOffset;

            service.style.bottom = ytrans - 800 + 'px';
            
            if(ytrans >= 600){
                service.style.bottom = -200 + 'px';
            }
            
            let mainBgText = document.getElementById('mainBgText');
            
            mainBgText.style.top = ytrans + 50 + 'px';
            if(ytrans >= 350){
                mainBgText.style.top = 400 + 'px';
            }
            
            let offerBgText = document.getElementById('offerBgText');
            
            offerBgText.style.top = (ytrans/4) + 50 + 'px';
            offerBgText.style.opacity = 1 - (ytrans/1200);
            
            let processFrame = document.getElementById('processFrame');
            if(processFrame.getBoundingClientRect().top > 40 ){
                processFrame.style.bottom = ytrans - 2000 + 'px';
            }
            
            let guaranteesBgText = document.getElementById('guaranteesBgText');
            
            if(ytrans <= 2050 && ytrans >= 1600){
                guaranteesBgText.style.top = ytrans - 1530 + 'px';
                guaranteesBgText.style.opacity = 1 - ((ytrans - 1530)/500);
                console.log(guaranteesBgText.style.opacity)
            }
        }
    }
    
    var formOrder = {
        form: null,
        
        init: function(){
            this.form = document.getElementById('formOrder');
            
            this.form.addEventListener('submit', formOrder.submit);
            formOrder.change();
        },
        submit: function(e){
            e.preventDefault();
            formOrder.calculate();
        },
        calculate: function(){
            let count = 0;
            let types = document.getElementById('formOrderSelect').value;
            let pages = document.getElementById('formOrderPages').value;
            let education = document.querySelectorAll('[name="education"]');
            let deadline = document.querySelectorAll('[name="deadline"]');
            let priceMultiply = document.querySelectorAll('[name="priceMultiply"]');
            let price = document.getElementById('totalPrice');
            let educationValue = 0;
            let deadlineValue = 0;
            let priceMultiplyValue = 0;
            let penis = null;
            
            education.forEach(function(item){
                if(item.checked){
                    educationValue = item.value;

                }
            });
            
            deadline.forEach(function(item, index){
                if(item.checked){
                    deadlineValue = item.value;
                    priceMultiply[index].checked = true;

                }
            });
            
            
            priceMultiply.forEach(function(item, index){
                if(item.checked){
                    priceMultiplyValue = item.value;
                    deadline[index].checked = true;
                }
                
            });
            
            count = '$' + (+priceMultiplyValue + +deadlineValue + +pages + +educationValue + +types);
            price.innerHTML = count;
            
        },
        change: function(){
            
            let inputs = document.querySelectorAll('input');
            
            inputs.forEach(function(item){
                item.onchange = function(){
                    
                    formOrder.calculate();
                }
                
            });
        }
    }
    accordeon.init();
    adaptiveMenu.init();
    parallax.init();
    formOrder.init();

}