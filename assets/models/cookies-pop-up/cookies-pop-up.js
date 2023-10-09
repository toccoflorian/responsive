import "./cookies-pop-up.scss";

console.log("cookie pop-up");

const createCookiesModalHTML = () => {
    const divContainerElement = document.createElement("div");
    divContainerElement.classList.add("cookies-container");

    const cookiesTitreContainerElement = document.createElement("div");
    cookiesTitreContainerElement.classList.add("titre")
    const spanIconElement = document.createElement("span");
    spanIconElement.classList.add("span-image");
    const pTitreElement = document.createElement("p");
    pTitreElement.classList.add("titre");
    pTitreElement.textContent = "Consentement aux cookies";
    cookiesTitreContainerElement.append(spanIconElement, pTitreElement);

    const cookiesTextElement = document.createElement("p");
    cookiesTextElement.textContent = `
    Pour offrir les meilleures expériences,
    nous itilisons des technologies telles que les cookies pour stocker et/ou 
    accéder aux informations des appareils.Le fait de consentir à ces technologies 
    nous permettra de traiter des données telles que le comportement de navigation 
    ou les ID uniques sur ce site.Le fait de ne pas consentir ou de retirer son 
    consentement peut avoir un effet négatif sur certaines caractéristiques et fonctions.
    `;

    const divButtonContainerElement = document.createElement("div");
    divButtonContainerElement.classList.add("button-container");
    const yesButtonElement = document.createElement("p");
    yesButtonElement.classList.add("yes-button");
    yesButtonElement.textContent = "Accepter"
    const noButtonElement = document.createElement("p");
    noButtonElement.classList.add("no-button");
    noButtonElement.textContent = "Refuser"
    divButtonContainerElement.append(noButtonElement, yesButtonElement);

    divContainerElement.append(cookiesTitreContainerElement, cookiesTextElement, divButtonContainerElement)

    // click sur le bouton accepter
    yesButtonElement.addEventListener("click", event => {
        localStorage.setItem("cookies-accepted", "true");
        document.querySelector(".cookies-container").style.display = "none";
    })

    // click sur le bouton refuser
    noButtonElement.addEventListener("click", event => {
        localStorage.setItem("cookies-accepted", "false");
        document.querySelector(".cookies-container").style.display = "none";
    })

    return divContainerElement;
}

document.addEventListener("DOMContentLoaded", event => {
    if (localStorage.getItem("cookies-accepted")) {

    } else {
        setTimeout(() => {
            document.querySelector(".content").append(createCookiesModalHTML());
        }, 10000);
    }

})