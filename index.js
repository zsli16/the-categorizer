const data = require('./demo.js')

class Categorizer {
  constructor(data) {
    this.categories = []
    this.data = data;
    this.comments = [];
  }

  getComments(data) {
    data.map(line => this.comments.push(line));
    console.log('comments in this data set: ', this.comments);
  }

  createABCsCategories(comments) {
    comments.map((comment) => {
      let firstletters = [];
      let words = comment.split(' ');
  
      /* create a collection of unique categories */
      for (let i = 0; i < words.length; i++) {
        let firstLetter = words[i].charAt(0).toLowerCase();
        firstletters.push(firstLetter);
      }
      let unique = new Set(firstletters);
      unique = [...unique]
  
      /* add the words that belong to the category to its array */
      let categories = {};
      for (let i = 0; i < unique.length; i++) {
        for (let j = 0; j < words.length; j++) {
          if (words[j].charAt(0).toLowerCase() === unique[i]) {
            if (!categories[unique[i]]) {
              categories[unique[i]] = [words[j]]
            } else {
              categories[unique[i]].push(words[j])
            }
          }
        }
      }
      this.categories.push(categories);
    });
    console.log('each comment categorized by first character of the word: ', this.categories)
  }

  getScoreByCategory(comment, category) {
    const selectedComment = this.comments.filter(storedComment => storedComment === comment)[0];
    if (selectedComment) {
      const totalCharacters = selectedComment.length;
      const index = this.comments.indexOf(selectedComment);
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


/* Create new Categorizer instance. Get the comments and create categories based on first character from the dataset */
const abcs = new Categorizer(data);
abcs.getComments(data);
abcs.createABCsCategories(abcs.comments);

/* should return 14.55% */
abcs.getScoreByCategory('Delightful =) Adore the use of gradient and background!', 'a'); 

/* should return 18.60% */
abcs.getScoreByCategory('Let me take a nap... great concept, anyway.', 'a'); 

/* should return 'That category does not exist for this comment */
abcs.getScoreByCategory('Delightful =) Adore the use of gradient and background!', 'p'); 

/* should return 'This comment is not found in the data set */
abcs.getScoreByCategory('Not a real comment', 'a');





