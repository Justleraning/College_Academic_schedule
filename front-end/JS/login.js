        // Smooth transition to the dashboard
        document.getElementById("loginForm").onsubmit = function() {
            document.body.style.transition = "background-color 0.5s ease";
            document.body.style.backgroundColor = "#e0f7fa";
            console.log("Form submitted") 
             setTimeout(function() {
              // Redirect to dashboard after a brief transition
                 window.location.href = "dashboard.html"; 
             }, 2000); 
            
            
            
            return false; 
        };


