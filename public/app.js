let btn=document.querySelector("#submit-post");
        let form=document.querySelector("form");
        form.addEventListener("input",()=>{
            let able=true;
            const user=form.querySelector("input[required]");
            const image=form.querySelector("#image-input");
            const content=form.querySelector("textarea");

            if(!(user.value&&content.value)||!(user.value&&image.value)){
                able=false;
                // btn.disabled=true;
            }

            // btn.disabled=false;
            btn.disabled = !able;
        })
        btn.addEventListener("click",()=>{
            console.log("clicked");
        })