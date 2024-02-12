---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Creating a simple blog architecture

The blog posts in our example will be stored as local markdown files in our application's directory (not fetched from an external data source), so we'll need to read the data from the file system.

In this section, we'll go through the steps of creating a blog that reads markdown data from the file system.
Creating the markdown files

First, create a new top-level directory called posts (this is not the same as pages/posts) in your root folder. Inside posts, create two files: pre-rendering.md and ssg-ssr.md.

Now, copy the following code to posts/pre-rendering.md:

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
