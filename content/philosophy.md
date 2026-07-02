# Philosophy of Design

This version of my website is different from other websites I've developed. I
decided to create a good-looking professional website without the huge number of
dependencies created from using [Django](https://djangoproject.com), [Ruby on
Rails](https://rubyonrails.org), or even [Express](https://expressjs.com).

The most obvious difference is that this site does not have a backing database.
Content is produced in [markdown](https://commonmark.org) files and I encode
attributes directly into the filename. For example, the filename for a blog post
includes the blog title, the date created, the last updated date (if any), and
draft contents have `"-draft"` in the name.

> "Everything should be as simple as possible, but not simpler."

Is actually not what Einstein said, but it's pretty close.
