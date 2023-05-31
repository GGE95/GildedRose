const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  // Règle 1: Tester si la qualité des articles normaux diminue de 1 chaque jour
it("should decrease quality by 1 for normal items", function() {
  const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(19);
});

// Règle 2: Tester si la qualité diminue deux fois plus vite une fois la date de vente dépassée
it("should decrease quality twice as fast when sellIn date has passed", function() {
  const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(18);
});

// Règle 3: Tester si la qualité de "Aged Brie" augmente avec le temps
it("should increase quality of 'Aged Brie' as time passes", function() {
  const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(1);
});

// Règle 4: Tester si la qualité des articles ne dépasse jamais 50
it("should never increase quality above 50", function() {
  const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(50);
});

// Règle 5: Tester si la qualité de 'Sulfuras' ne change pas
it("should not alter quality of 'Sulfuras'", function() {
  const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(80);
});

// Règle 6: Tester si 'Backstage passes' augmente en qualité à l'approche de la date du concert
it("should increase quality by 3 when there are 5 days or less left (Backstage passes)", function() {
  const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(23);
});

// Règle 7: Tester si la qualité de 'Backstage passes' tombe à 0 après le concert
it("should drop quality to 0 after the concert (Backstage passes)", function() {
  const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(0);
});

// Règle 8: Tester si les articles 'Conjured' voient leur qualité se dégrader deux fois plus vite
it("should decrease quality twice as fast for 'Conjured' items", function() {
  const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(4);
});

// Règle 9: Tester si la qualité des articles n'est jamais négative
it("should never decrease quality below 0", function() {
  const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 0)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(0);
});


});

