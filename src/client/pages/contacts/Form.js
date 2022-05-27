

const Form=()=>{
    import('./app.js')
return(
<div class="container">
    <div class="content">
        <div class="left-side">
            <div class="address details">
                <i class="fas fa-map-marker-alt"></i>
                <div class="topic">Address</div>
                <div class="text-one">Minsk</div>
                <div class="text-two">Expobel, Dana Moll, Green City, Gallery</div>
            </div>
            <div class="phone details">
                <i class="fas fa-phone-alt"></i>
                <div class="topic">Phone number</div>
                <div class="text-one">+375292564221</div>
                <div class="text-two">+375295258365</div>
            </div>
            <div class="email details">
                <i class="fas fa-envelope"></i>
                <div class="topic">Email</div>
                <div class="text-one">support@site.com</div>
                <div class="text-two">admin@site.com</div>
            </div>
        </div>
        <div class="right-side">
            <div class="topic-text">Send us your message</div>
            <p>
                If you have any questions or cooperation offers:
                fill in the form below
            </p>
            <form  name='form' method="post" action='send_mail.php'>
                <div class="input-box">
                    <input
                        type="text"
                        placeholder="Your name"
                        name="name"
                        id="name"
                        data-reg="^[А-ЯЁ][а-яё]*$"
                    />
                    <label for="name">Сyrillic only</label>
                </div>
                <div class="input-box">
                    <input
                        type="text"
                        placeholder="Input email"
                        name="email"
                        id="email"
                        data-reg="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
                    />
                    <label for="email">Format: name@mail.ru</label>
                </div>
                <div class="input-box">
                    <input
                        type="text"
                        placeholder="Input phone number"
                        name="phone"
                        id="phone"
                        data-reg="^((\+7|7|8)+([0-9]){10})$"  /*change!!!!!!!!!!*/
                    />
                    <label for="phone">Format: 80290000000 or 803300000000</label>
                </div>
                <div class="input-box message-box">
                    <textarea placeholder="Message"  name="message"></textarea>
                </div>
                <div class="button">
                    <input type="submit" id="button" value="Send" onClick={"./send_mail.php"}/>
                </div>
            </form>
        </div>
    </div>
</div>
)

}

export default Form