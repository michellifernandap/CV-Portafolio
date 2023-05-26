         const textEffect = document.getElementById('text-effect');
         const words = ['Designer', 'Web Developer', 'Freelancer', 'Photographer'];
         let currentWordIndex = 0;
         let letterIndex = 0;
         let isDeleting = false;
     
         function typeEffect() {
           const currentWord = words[currentWordIndex];
           const currentText = currentWord.slice(0, letterIndex + 1);
     
           textEffect.textContent = currentText;
     
           if (isDeleting) {
             letterIndex--;
           } else {
             letterIndex++;
           }
     
           if (letterIndex === currentWord.length + 1) {
             isDeleting = true;
             setTimeout(typeEffect, 2000);
           } else if (letterIndex === -1) {
             isDeleting = false;
             currentWordIndex++;
             if (currentWordIndex >= words.length) {
               currentWordIndex = 0; // Reiniciar el índice de la palabra actual
             }
             setTimeout(typeEffect, 100);
           } else {
             setTimeout(typeEffect, 100);
           }
         }
     
         typeEffect();


         // Skills
         $(document).ready(function() {
            $(window).scroll(function() {
              var windowBottom = $(this).scrollTop() + $(this).innerHeight();
              var threshold = $("#skill").offset().top + $("#skill").outerHeight();
      
              if (windowBottom >= threshold) {
                $(".progress-bar").each(function() {
                  var progressBarWidth = $(this).data("width");
                  $(this).animate({ width: progressBarWidth }, 1000);
                });
              }
            });
          });