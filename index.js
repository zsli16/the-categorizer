const data = require('./demo.js')
var nlp = require('compromise');

class Categorizer {
  
  constructor() {
    this.categories = []
  }

  createABCsCategories(data) {
    data.map((comment) => {
      let firstletters = [];
      let words = comment.split(' ');
      let categories = {};
  
      /* create a collection of unique categories */
      for (let i = 0; i < words.length; i++) {
        let firstLetter = words[i].charAt(0).toLowerCase();
        if (!categories[firstLetter]) {
          categories[firstLetter] = words[i]
        } else {
          categories[firstLetter] = [categories[firstLetter], words[i]]
        }
      }
      this.categories.push(categories);
    });
    console.log('each comment categorized by first character of the word: ', this.categories)
  }
  
  getNLPcategories(data) {
    data.map(comment => {
      const nouns = nlp(comment).nouns().out('array');
      const verbs = nlp(comment).verbs().out('array');
      let newCategory = {
        'nouns': nouns,
        'verbs': verbs
      }
      this.categories.push(newCategory);
    })
    console.log('each comment categorized by verbs and noun phrases ', this.categories)
  }

  getScoreByCategory(comment, category) {
    const selectedComment = data.filter(storedComment => storedComment === comment)[0];
    if (selectedComment) {
      const totalCharacters = selectedComment.length;
      const index = data.indexOf(selectedComment);
      const categoriesForSelectedComment = this.categories[index];

      if (categoriesForSelectedComment[category]) {
        const wordsInCategory = categoriesForSelectedComment[category];
  
        let charInCategoryLength = 0;
        wordsInCategory.forEach(word => {
          charInCategoryLength += word.length;
        })
  
        console.log('score', ((charInCategoryLength/totalCharacters) * 100).toFixed(2) + '%');
      } else {
        console.log('That category does not exist for this comment')
      }
    } else {
      console.log('This comment is not found in the data set.')
    }
  }
}

/* Create new Categorizer instance and store the comments in an array */
const categorizer = new Categorizer(data);

/* Create categories by first letter of the word */
categorizer.createABCsCategories(data);

/* Create categories by parts of speech (nouns or verbs) */
categorizer.getNLPcategories(data);

// /* should return 14.55% */
categorizer.getScoreByCategory('Delightful =) Adore the use of gradient and background!', 'a'); 

// /* should return 18.60% */
categorizer.getScoreByCategory('Let me take a nap... great concept, anyway.', 'a'); 

// /* should return 'That category does not exist for this comment */
categorizer.getScoreByCategory('Delightful =) Adore the use of gradient and background!', 'p'); 

// /* should return 'This comment is not found in the data set */
categorizer.getScoreByCategory('Not a real comment', 'a');

// /* should return 41.82% */
categorizer.getScoreByCategory('Delightful =) Adore the use of gradient and background!', 'nouns'); 





