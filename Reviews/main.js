const reviews = [
    {
        id: 1,
        name: "susan smith",
        job: "web developer",
        img:
            "D:\\LearnJavaScript\\jsProjectsFreeCodeCamp\\Reviews\\person-1.jpeg",
        text:
            "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry"
    },
    {
        id: 2,
        name: "Fatma Sliti",
        job: "web developer Intern",
        img:
            "D:\\LearnJavaScript\\jsProjectsFreeCodeCamp\\Reviews\\Fatouma.png",
        text:
            " Fatma Sliti I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry"
    },
    {
        id: 3,
        name: "safia benzima",
        job: "Intern",
        img:
            "D:\\LearnJavaScript\\jsProjectsFreeCodeCamp\\Reviews\\img.jpg",
        text:
            "aaaaaa I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry"
    },
    {
        id: 4,
        name: "susan smith",
        job: "peter jones",
        img:
            "D:\\LearnJavaScript\\jsProjectsFreeCodeCamp\\Reviews\\fatma'sPhoto.png",
        text:
            "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry"
    },
]




//select items

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

//set starting item

let currentItem = 0;

//load initial item
window.addEventListener("DOMContentLoaded", function () {
    showPerson();
});

function showPerson() {
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

// show next person

nextBtn.addEventListener("click", function () {
    currentItem++;
    if(currentItem > reviews.length - 1) {
        currentItem = 0;
    }
    showPerson();
});

//show prev person

prevBtn.addEventListener("click", function () {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson()
})


// randomBtn.addEventListener('click', function () {
//     currentItem = getRandomNumber();
//     showPerson();
// })

// function getRandomNumber() {
//     return Math.floor(Math.random() * reviews.length);
// }


//shorter method
randomBtn.addEventListener('click', function () {
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson();
})



