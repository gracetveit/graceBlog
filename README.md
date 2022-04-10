# graceBlog

## Description

A simple Blog app written with NextJS and Prisma

[Link to site](https://graceblog.herokuapp.com/)

## API

### Blogs

Blogs are organized in the following format:

```json
{
  "title": "Blog Title",
  "createdAt": "20222022-04-10T19:31:23.350Z",
  "updatedAt": "2022-04-10T19:31:23.350Z",
  "content": "Lorem Ipsum...",
  "slug": "blog-title"
}
```

- `GET:/api/blogs`
  Returns a list of all blogs
- `GET:/api/blogs/[date]/[slug]`
  Returns a single blog item

## License

The content of this project itself is licensed under the
[Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/)
Unported license, and the underlying source code used to format and display that content is licensed under the
[MIT](https://choosealicense.com/licenses/mit/)
license.

<!-- ---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## Features

If your project has a lot of features, list them here.

## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here. -->
