# About The Task

You are given a data set containing a list of comments. For each comment, we want to know the score per category. These categories are dynamic (can be anything you choose and contain words that are assigned to the category). Scores are the amount of space the words take up in the comment.

**Example**:
"The quick brown fox jumps over the lazy dog"
For the following categories the results would be as follows:

```
A ["quick", "jump"] = 20.93%
B ["fox", "dog"] = 13.95%
C ["lazy", "slow"] = 9.3%
D ["brown", "back", "orange"] = 11.62%
```

**Inputs/Outputs**

Input: It should accept an array of comments and an object with categories.
Again, the content of the categories you can make yourself but in general they look like this:
```
{
  "category name": ["word A", "word  B"],
  "next category": [...]
}
```

Output: You can console.log the output per comment with the different scores per category

# About the Solution

The Categorizer can currently categorize words in each comment by the following:
1. Based on the first character of each word in the comment (ex: 'A' letter words - "apple, Adam, area").
2. Parts of speech (noun or verbal phrases)

The score is calculated based on the length of characters in each category as a percentage of the total length of all characters in the comment. 

To keep the object structure simple and adhering to the requirements of the task, calculating the score is a function of the Categorizer rather than an additional object property.

This class has been designed in this way so it can be extended with different types of categorizing functions. :)

## Getting Started
First, clone this repo using `git clone [url of this repo]`.

To use the natural language processing (NPL) library to parse parts of speech, run `npm install compromise` to install [Compromise](http://compromise.cool/)

Run `node index.js` which contains some default test functions. Feel free to change the functions with the ones you want to test (see 'Using the Categorizer' below).

### Using the Categorizer

This file contains a Categorizer function that is instantiated with the sample dataset exported from `demo.js.` 

`const abcs = new Categorizer(data);`

The Categorizer first needs to parse the comments from the dataset.

`abcs.getComments(data);`

Then, choose a categorizer function to create the categories:

Examples:

```
abcs.createABCsCategories(abcs.comments);
abcs.createNLPcategories(abcs.comments);
```

Then feel free to test and calculate the scores for different comments and categories in this dataset using the `getScoreByCategory` function. 

This function `getScoreByCategory` requires two parameters: a valid comment and a valid category.

Examples:

```
/* should return a score of 14.55% */
abcs.getScoreByCategory('Delightful =) Adore the use of gradient and background!', 'a'); 

/* should return a score of 41.82% */
abcs.getScoreByCategory('Delightful =) Adore the use of gradient and background!', 'nouns'); 

```




