import "./loading-screen.scss";

console.log("loading script");

const divElement = document.createElement('div');
divElement.classList.add('loading-screen');
divElement.id = "loading-screen";
divElement.innerHTML = `
<!-- écrans de chargement -->
    
        <section class="section-0" id="section-0">
            <span class="span-image">
                <!-- image -->
            </span>
            <h1></h1>
            <p>
            ParlonsPC, votre entreprise informatique à Montpellier <br><br>
            Chargement...
            </p>

            <span class="span-icon">
                <img src="assets/icons/facebook.svg" alt="icon Facebook">
                <img src="assets/icons/instagram.svg" alt="icon Instagram">
                <img src="assets/icons/linkedin.svg" alt="icon LinkedIn">
            </span>

        </section>
    
`
document.querySelector('html').appendChild(divElement)

window.addEventListener('load', event => {
    const loadingScreenElement = document.querySelector('div.loading-screen');

    loadingScreenElement.style.transition = "opacity 0.25s ease-out";
    loadingScreenElement.style.transform = "matrix3D()"
    loadingScreenElement.style.opacity = '0';

    // Retirez l'écran de chargement du DOM après une transition
    setTimeout(() => {
        loadingScreenElement.remove();
    }, 250);




});