// set setAttribute
// flex:1

const dragable_list = document.getElementById('draggable-list');
const btn = document.getElementById('check');

const rich = [
  'Elon Musk',
  'Bernard Arnault',
  'Jeff Bezos',
  'Bill Gates',
  'Larry Ellison',
  'Larry Page',
  ' Warren Buffett',
  'Sergey Brin',
  ' Steve Ballmer',
  'Mark Zuckerberg',
];

// Store listItems

listItems = [];

let dragStartIndex;

//inserting list items into DOM

createList();

function createList() {
  [...rich]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable = "true" >
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div> 
        `;

      listItems.push(listItem);
      dragable_list.appendChild(listItem);

      addEventListeners();
    });
}

function dragstart() {
  //   console.log('event st');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
  //   console.log('event e');
}

function dragLeave() {
  this.classList.remove('over');
  //   console.log('event leaver');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  this.classList.remove('over');

  dragEndIndex = +this.getAttribute('data-index');

  //   calling swap function
  swapItems(dragStartIndex, dragEndIndex);
}

// swap function
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// function to check order
function checkOrder() {
  listItems.forEach((listItem, Index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== rich[Index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggablbe = document.querySelectorAll('.draggable');
  const dragList = document.querySelectorAll('.draggable-list li');

  draggablbe.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragstart);
  });

  dragList.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

btn.addEventListener('click', checkOrder);
