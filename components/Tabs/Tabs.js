// TabCard is responsible for changing the style of the individual cards from block to none
class TabCard {
  constructor(element) {
    // Use a jQuery selector to assign this.element to the DOM reference
    this.element = element;
  }
  selectCard() {
    // show the card
    this.element.style.display = "block";
  }
  deselectCard() {
    // hide the card
    this.element.style.display = "none";
  }
}

/*
TabLink is where most the magic happens
it's passed the element(contains data attribute and parent)
it sets the cards property on TabLink with getCards passing the data attribute
the cards property is mapped into new TabCards which essentially toggle display: block to none
a click event listener is added to activate selectTab
selectTab
  calls updateActive(this) which deselects the active tab and sets the active tab to the clicked tab aka "this"
  "this" has active-tab class added to it
  All cards are called with the selectCard() to turn on display:block
*/
class TabLink {
  constructor(element, parent) {
    // Use a jQuery selector to assign this.element to the DOM reference
    this.element = $(element);
    // assign this.parent to the parent parameter
    this.parent = parent;

    // Note that we are calling getCards() on Tabs (The parent of TabLink) and passing the data attribute: data-tab, no need to update this line of code.
    this.cards = this.parent.getCards(this.element.data("tab"));

    // Using jQuery, map over the array of cards.  In your callback function, create new instances of the TabCard class that contain a card reference. TabCard(card) as an example.
    this.cards = this.cards.map((index, card) => new TabCard(card));

    // You will need to create a click handler for the TabLink element that calls selectTab()
    this.element.click(() => {
      this.selectTab();
    });
  }

  selectTab() {
    // use this.parent to call the updateActive() method and pass the `this` keyword as a parameter
    this.parent.updateActive(this);
    // using a jQuery method, add a class to this.element named "active-tab"
    this.element.addClass("active-tab");
    // iterate over each card using the .each() method in jQuery. call the selectCard() method in your callback function
    this.cards.each((i, card) => {
      card.selectCard();
    });
  }

  deselectTab() {
    // use a jQuery method to remove the class "active-tab" from this.element
    this.element.removeClass("active-tab");
    // iterate over each card using the .each() method in jQuery. call the deselectCard() method in your callback function
    this.cards.each((i, card) => {
      card.deselectCard();
    });
  }
}

// Tabs Class is passed the $object, which is used to find all the ".tab" elements.
// The ".tab" elements are mapped onto TabLink
// Tab Class contains activeTab property and init which sets the active tab
// updateActive calls deselectTab from TabLink and sets activeTab to the passed element
// getCards returns cards that matches the corresponding data attribute of the data that was passed to it
class Tabs {
  constructor(element) {
    this.element = $(element);

    // Use jQuery to find all the nodes with class ".tab".  jQuery.find() returns a jQuery Object
    this.tabs = this.element.find(".tab");

    // jQuery map method came before JS map method and index is a required parameter
    // map all items in tabs and turn them into new TabLinks
    this.tabs = this.tabs.map((i, tab) => new TabLink(tab, this));

    // Set the initial active tab to the first tab in the list.
    this.activeTab = this.tabs[0];

    // call init
    this.init();
  }

  init() {
    // use activeTab to call the selectTab() method
    this.activeTab.selectTab();
  }

  updateActive(tabElement) {
    // use activeTab to call the deselectTab() method
    this.activeTab.deselectTab();
    // assign activeTab to tabElement
    this.activeTab = tabElement;
  }

  getCards(data) {
    // This method is meant to get all the cards from the HTML page.
    // If the data supplied is 'all' then all of the cards should be returned.
    // Otherwise, only cards matching the data attribute should be returned.
    let allCards = $(".card");
    if (data === "all") {
      return allCards;
    }
    return allCards.filter((i, card) => {
      return $(card).data("tab") === data;
    });
  }
}

// I am using jQuery to select the correct tabs component. Then initialize the Tabs class.
let tabs = $(".tabs");
tabs = new Tabs(tabs);
