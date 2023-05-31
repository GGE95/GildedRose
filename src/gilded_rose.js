class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      switch (true) {
        case item.name.startsWith('Conjured'):
          this.updateConjuredItem(item);
          break;
        case item.name === 'Aged Brie':
          this.updateAgedBrie(item);
          break;
        case item.name === 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstagePass(item);
          break;
        case item.name === 'Sulfuras, Hand of Ragnaros':
          // 'Sulfuras' est un objet légendaire et ne change jamais
          break;
        default:
          this.updateNormalItem(item);
          break;
      }
    }
    return this.items;
  }

  updateNormalItem(item) {
    item.sellIn--;
    if (item.quality > 0) {
      item.quality--;
      if (item.sellIn < 0) {
        item.quality--;
      }
    }
  }

  updateConjuredItem(item) {
    item.sellIn--;
    if (item.quality > 0) {
      item.quality -= 2;
      if (item.sellIn < 0) {
        item.quality -= 2;
      }
    }
    item.quality = Math.max(item.quality, 0);
  }

  updateAgedBrie(item) {
    item.sellIn--;
    if (item.quality < 50) {
      item.quality++;
      if (item.sellIn < 0) {
        item.quality++;
      }
    }
  }

  updateBackstagePass(item) {
    item.sellIn--;
    if (item.quality < 50) {
      item.quality++;
      if (item.sellIn < 10) {
        item.quality++;
      }
      if (item.sellIn < 5) {
        item.quality++;
      }
      if (item.sellIn < 0) {
        item.quality = 0;
      }
    }
  }
}


module.exports = {
  Item,
  Shop
}
